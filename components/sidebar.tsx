"use client"

interface AppType {
  id: string
  name: string
  basePrice: number
}

interface SidebarProps {
  appTypes: AppType[]
  selectedAppType: string | null
  onSelectAppType: (id: string) => void
}

export default function Sidebar({ appTypes, selectedAppType, onSelectAppType }: SidebarProps) {
  return (
    <aside className="w-80 space-y-4">
      {/* Select Type */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <label className="block text-sm text-slate-300 mb-2">Select web app type</label>
        <select
          className="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          onChange={(e) => onSelectAppType(e.target.value)}
          value={selectedAppType || ""}
        >
          <option value="">-- choose app type --</option>
          {appTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} (₹{type.basePrice.toLocaleString("en-IN")})
            </option>
          ))}
        </select>
        <p className="text-xs text-slate-400 mt-3">Excl GST</p>
      </div>

      {/* Source Quotes */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <p className="text-xs text-slate-400">Source your uploaded quotes list.</p>
      </div>

      {/* Quick Search */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <label className="block text-sm text-slate-300 mb-2">Quick search</label>
        <input
          type="text"
          placeholder="Search app types or features..."
          className="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm border border-slate-600 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Available Types */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <p className="text-xs text-slate-400 mb-3">Available types (click to preview)</p>
        <p className="text-xs text-slate-500 mb-2">Base: ₹1,50,000</p>
        <div className="space-y-3">
          {appTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectAppType(type.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedAppType === type.id
                  ? "bg-cyan-400/20 border border-cyan-400 text-cyan-400"
                  : "text-cyan-400 hover:bg-slate-700/50"
              }`}
            >
              <div className="font-medium">{type.name}</div>
              <div className="text-xs text-slate-400">Base: ₹{type.basePrice.toLocaleString("en-IN")}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
