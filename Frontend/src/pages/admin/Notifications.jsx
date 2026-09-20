import { useState } from 'react';
import { useSync } from '../../context/SyncContext';

export default function Notifications() {
  const { notifications, sendBroadcastNotification, markNotificationRead, clearNotifications } = useSync();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    sendBroadcastNotification(title, message);
    setTitle('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">System Notifications Center</h2>
          <p className="text-xs text-slate-400 mt-1">Broadcast real-time push alerts to user portals and admin interfaces.</p>
        </div>

        <button
          onClick={clearNotifications}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition border border-slate-700"
        >
          Clear History
        </button>
      </div>

      {/* Broadcast Creator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white">Broadcast New Live Alert</h3>
        <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1 uppercase">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weather Advisory or Special Promotion"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-400 font-bold mb-1 uppercase">Notification Message</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message body to be broadcast across all user browser tabs..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
              />
              <button type="submit" className="btn-accent py-3 px-6 text-xs font-bold shrink-0">
                📢 Transmit Alert
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-5 rounded-3xl border text-xs cursor-pointer transition flex items-center justify-between gap-4 ${
              n.read
                ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                : 'bg-slate-900/90 border-primary-500/30 text-white shadow-lg shadow-primary-950/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">🔔</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-teal-300">{n.title}</h4>
                  {!n.read && (
                    <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      UNREAD
                    </span>
                  )}
                </div>
                <p className="mt-1 leading-relaxed">{n.message}</p>
                <div className="mt-1.5 text-[10px] text-slate-500 font-mono">
                  {new Date(n.timestamp || Date.now()).toLocaleString()}
                </div>
              </div>
            </div>

            {!n.read && (
              <span className="text-xs text-teal-400 font-bold hover:underline shrink-0">Mark Read</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
