import { motion, AnimatePresence } from 'framer-motion';
import { useSync } from '../../context/SyncContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useSync();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100 shadow-emerald-900/20'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/30 text-amber-100 shadow-amber-900/20'
                : 'bg-slate-900/90 border-primary-500/30 text-slate-100 shadow-primary-950/30'
            }`}
          >
            <div className="text-xl shrink-0 mt-0.5">
              {toast.type === 'success' ? '✨' : toast.type === 'warning' ? '⚡' : '🔔'}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition p-1 shrink-0 rounded-lg hover:bg-white/10"
              aria-label="Close toast"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
