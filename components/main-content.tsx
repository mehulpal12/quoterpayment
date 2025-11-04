"use client"

import { useState } from "react"
import EMICalculator from "./emicalculator"

interface AppType {
  id: string
  name: string
  basePrice: number
}

interface Feature {
  id: string
  name: string
  price: number
}

interface Calculations {
  basePrice: number
  featuresCost: number
  subtotal: number
  discount: number
  total: number
}

interface MainContentProps {
  appTypes: AppType[]
  features: Feature[]
  selectedAppType: string | null
  selectedFeatures: string[]
  onToggleFeature: (id: string) => void
  calculations: Calculations
  discountPercent: number
  discountApplied: boolean
  emiCalculator?: any
  onApplyDiscount: () => void
}

export default function MainContent({
  appTypes,
  features,
  selectedAppType,
  selectedFeatures,
  onToggleFeature,
  calculations,
  discountPercent,
  discountApplied,
  onApplyDiscount,
  emiCalculator
}: MainContentProps) {
  const [showEmi, setShowEmi] = useState(false)
  const appType = appTypes.find((t) => t.id === selectedAppType)
      const takeScreenshot = async () => {
        const response = await fetch(`/api/screenshot?url=${encodeURIComponent(window.location.href)}`);
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        // Use imageUrl to display or download the screenshot
    };

  return (
    <div className="flex-1 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">— Select an app type —</h2>
          <p className="text-slate-400 text-sm">Features & base price will populate here</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs mb-1">Base price</p>
          <p className="text-2xl font-bold text-cyan-400">₹{calculations.basePrice.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Included Features */}
      {!selectedAppType ? (
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 text-center">
          <p className="text-slate-400">No app selected.</p>
        </div>
      ) : (
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-2">Included Features</h3>
          <p className="text-slate-400 text-sm">
            {appType?.name} comes with all essential features for your business needs.
          </p>
        </div>
      )}

      {/* Add-ons */}
      <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-white font-semibold">Add-ons</h3>
            <p className="text-slate-400 text-sm">Pick optional features (each adds to base price)</p>
          </div>
          <button className="text-cyan-400 text-sm hover:text-cyan-300">Tap to add</button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature) => (
            <label
              key={feature.id}
              className="flex items-start gap-3 cursor-pointer hover:bg-slate-700/30 p-3 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature.id)}
                onChange={() => onToggleFeature(feature.id)}
                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 cursor-pointer accent-cyan-400"
              />
              <div>
                <div className="text-white text-sm font-medium">{feature.name}</div>
                <div className="text-cyan-400 text-sm">₹{feature.price.toLocaleString("en-IN")}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
            {showEmi && (
        <div className="">
          <EMICalculator calculations={calculations} />
        
        </div>
      )}

      {/* Calculations */}
      <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 space-y-3">
        <div className="flex justify-between text-slate-400">
          <span>Subtotal (excl. GST)</span>
          <span>₹{calculations.subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Discount</span>
          <span>- ₹{calculations.discount.toLocaleString("en-IN")}</span>
        </div>
        <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-semibold text-lg">
          <span>Total (excl. GST)</span>
          <span className="text-cyan-400">₹{calculations.total.toLocaleString("en-IN")}</span>
        </div>
        <p className="text-xs text-slate-500 mt-4">Note: GST not included. Final invoice will include GST.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          type="button"
          onClick={onApplyDiscount}
          disabled={discountApplied}
          className={`font-semibold px-6 py-3 rounded-lg transition-colors ${
            discountApplied
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-cyan-400 hover:bg-cyan-500 text-slate-900"
          }`}
        >
          {discountApplied ? "BNI / Referral 10% Applied ✓" : "Apply BNI / Referral 10%"}
        </button>

        <button
          className={`border px-6 py-3 rounded-lg transition-colors ${
            showEmi ? "bg-cyan-500 text-slate-900" : "border-slate-600 hover:border-slate-500 text-white"
          }`}
          onClick={() => setShowEmi((s) => !s)}
        >
          {showEmi ? "Hide EMI Options" : "Show EMI Options"}
        </button>

        <button className="border border-slate-600 hover:border-slate-500 text-white px-6 py-3 rounded-lg transition-colors" onClick={takeScreenshot}>
          Download Quote Snapshot
        </button>
        <button className="border border-slate-600 hover:border-slate-500 text-white px-6 py-3 rounded-lg transition-colors">
          Copy Quote
        </button>
      </div>

      {/* EMI Modal */}


      {/* EMI Details */}
      <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 text-xs text-slate-400">
        <p>
          <span className="text-cyan-400 font-semibold">BNI/referral discount</span> is a single 10% discount applied to
          subtotal (excl. GST). EMI is a convenience option (finance provider needed).
        </p>
      </div>
    </div>
  )
}
