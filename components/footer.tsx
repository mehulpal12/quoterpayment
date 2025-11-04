export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm mt-8">
      {/* Purple Banner */}
      <div className="bg-gradient-to-r from-purple-600/80 to-purple-700/80 text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>Shared with</span>
          <span className="font-semibold">Tinyhost</span>
        </div>
        <button className="border border-white/50 hover:border-white px-4 py-1 rounded text-sm transition-colors">
          Upload for free
        </button>
      </div>

      {/* Bottom Footer */}
      <div className="px-6 py-4 text-center text-slate-500 text-sm">
        <p>Built By The RD Group Of Industries</p>
      </div>
    </footer>
  )
}
