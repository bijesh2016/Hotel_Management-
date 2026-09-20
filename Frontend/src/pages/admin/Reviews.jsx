import { useSync } from '../../context/SyncContext';

export default function Reviews() {
  const { reviews } = useSync();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white font-display">Guest Ratings & Reviews</h2>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
              LIVE FEED 🟢
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Live customer feedback submitted from hotel detail and booking pages.</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-extrabold text-amber-400">4.9 ★</div>
          <div className="text-xs text-slate-400">{reviews.length} Total Reviews</div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {'★'.repeat(r.rating || 5)}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{r.date || 'Today'}</span>
            </div>

            <p className="text-sm text-slate-300 italic leading-relaxed">&ldquo;{r.comment}&rdquo;</p>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-white">{r.user_name}</span>
              <span className="text-teal-400 font-medium">{r.hotel_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
