import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Calculations {
  basePrice: number
  featuresCost: number
  subtotal: number
  discount: number
  total: number
}

const EMICalculator = ({calculations}: {calculations: Calculations}) => {
  const [loanAmount, setLoanAmount] = useState<string>(calculations.total.toString());
  const [interestRate, setInterestRate] = useState<string>("12");
  const [tenure, setTenure] = useState<string>("6");
  const [emi, setEmi] = useState<number>(0);
  
 useEffect(() => {
    setLoanAmount(calculations.total.toString());
  }, [calculations.total]);
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 12 / 100 || 0;
    const time = parseInt(tenure) || 0;

    if (principal > 0 && time > 0) {
      if (rate > 0) {
        const emiValue =
          (principal * rate * Math.pow(1 + rate, time)) /
          (Math.pow(1 + rate, time) - 1);
        setEmi(Math.round(emiValue));
      } else {
        // No interest case
        setEmi(Math.round(principal / time));
      }
    } else {
      setEmi(0);
    }
  };

  const totalAmount = emi * parseInt(tenure);
  const totalInterest = totalAmount - parseFloat(loanAmount);

  return (
    <div className=" w-full  p-4 border rounded-lg  ">
      <div className=" max-w-2xl ">

        <Card className="p-3 ">
          <div className="space-y-4 flex flex-col justify-between md:flex-row md:items-end md:space-x-6 md:space-y-0">
            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="text-sm text-muted-foreground">
                Loan Amount (₹)
              </Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="bg-input border-border text-foreground text-lg"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tenure" className="text-sm text-muted-foreground">
                  Tenure
                </Label>
              </div>
              <Select value={tenure} onValueChange={setTenure}>
                <SelectTrigger className="bg-input border-border text-foreground text-lg">
                  <SelectValue placeholder="Select tenure" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="9">9 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="48">48 months</SelectItem>
                  <SelectItem value="60">60 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6 border-t border-border space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">EMI options available</p>
              <h2 className="text-2xl font-semibold text-foreground">
                Sample EMI {parseFloat(interestRate) === 0 && "(no interest shown)"}
              </h2>
              <p className="text-xl text-foreground mt-2">
                ₹ {emi.toLocaleString("en-IN")} / month × {tenure} months (est.)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EMICalculator;
