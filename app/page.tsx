"use client"

import { useState, useMemo } from "react"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import Footer from "@/components/footer"
import EMICalculator from "@/components/emicalculator"
import Image from "next/image"

export default function Home() {
  const [selectedAppType, setSelectedAppType] = useState<string | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  // start with no discount; apply when user clicks the button
  const [discountPercent, setDiscountPercent] = useState(0)
  const [discountApplied, setDiscountApplied] = useState(false)

  const applyDiscount = () => {
    if (discountApplied) return // no-op if already applied
    setDiscountPercent(10)
    setDiscountApplied(true)
  }

  const appTypes = [
    { id: "doc-signing", name: "Document Signing Systems", basePrice: 65000 },
    { id: "lms", name: "LMS (Learning Management Systems)", basePrice: 175000 },
    { id: "fitness", name: "Fitness Training Apps", basePrice: 95000 },
    { id: "real-estate", name: "Real Estate Management Platform", basePrice: 150000 },
  ]

  const features = [
    { id: "blogging", name: "Blogging System", price: 3000 },
    { id: "portfolio", name: "Portfolio Publishing System", price: 5000 },
    { id: "booking", name: "Booking System", price: 15000 },
    { id: "email-sms", name: "Automatic Email / SMS Sending", price: 10000 },
    { id: "chat", name: "Chat System", price: 10000 },
    { id: "payment-tracking", name: "Payment Tracking", price: 5000 },
    { id: "expense-tracking", name: "Expense Tracking", price: 5000 },
    { id: "followups", name: "Automatic Follow-ups", price: 10000 },
    { id: "custom-api", name: "Custom API Integration", price: 10000 },
    { id: "barcode", name: "Barcode / QR Code Integration", price: 8000 },
    { id: "financial", name: "Financial Reports (Auto-generate)", price: 10000 },
    { id: "tax", name: "Tax Management (GST, TDS)", price: 15000 },
    { id: "payment-gateway", name: "Payment Gateway", price: 10000 },
    { id: "related-products", name: "Related / Recommended Products", price: 10000 },
    { id: "courier", name: "Courier Integration", price: 7000 },
    { id: "marketing", name: "Marketing Tools Integration", price: 2000 },
    { id: "android", name: "Android Mobile App", price: 10000 },
    { id: "ios", name: "iOS Mobile App", price: 25000 },
    { id: "ai-drafting", name: "Smart Drafting Using AI", price: 125000 },
  ]

  const calculations = useMemo(() => {
    const appType = appTypes.find((t) => t.id === selectedAppType)
    const basePrice = appType?.basePrice || 0
    const featuresCost = selectedFeatures.reduce((sum, featureId) => {
      const feature = features.find((f) => f.id === featureId)
      return sum + (feature?.price || 0)
    }, 0)
    const subtotal = basePrice + featuresCost
    const discount = Math.round(subtotal * (discountPercent / 100))
    const total = subtotal - discount

    return {
      basePrice,
      featuresCost,
      subtotal,
      discount,
      total,
    }
  }, [selectedAppType, selectedFeatures, discountPercent])

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    )
  }

  return (
    <div className="min-h-screen w-[75vw] mx-auto mt-5 p-4 border rounded-lg  container bg-[#09080b]">
      {/* Header */}
      <header className="border-[#09080b]  backdrop-blur-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-cyan-400 font-bold text-xl ">
             <Image src="/RD.png" alt="" width={60} height={60} className="rounded-lg" />
            </div>
            <div>
              <h1 className="text-slate-200 text-lg font-semibold mx-3">Welcome Back!</h1>
              <p className="text-slate-500 text-sm mx-2">
                Pick the web app type, choose features/add-ons, view pricing (excl. GST), EMI options and 10%
                BNI/referral discount available.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex gap-6 p-2 max-w-7xl mx-auto">
        <Sidebar appTypes={appTypes} selectedAppType={selectedAppType} onSelectAppType={setSelectedAppType} />
        <MainContent
          appTypes={appTypes}
          features={features}
          selectedAppType={selectedAppType}
          selectedFeatures={selectedFeatures}
          onToggleFeature={toggleFeature}
          calculations={calculations}
          discountPercent={discountPercent}
          discountApplied={discountApplied}
          onApplyDiscount={applyDiscount}
          emiCalculator={EMICalculator}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
