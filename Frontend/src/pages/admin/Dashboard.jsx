import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSync } from '../../context/SyncContext';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { syncStats, bookings, reviews, notifications, updateBookingStatus, sendBroadcastNotification } = useSync();

  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    setIsBroadcasting(true);
    sendBroadcastNotification(broadcastTitle, broadcastMessage);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setIsBroadcasting(false);
  };

  const statCards = [
    {
      key: 'revenue',
      label: 'Gross Revenue',
      value: `$${syncStats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
      link: '/admin/payments',
      sub: 'Real-time booking revenue'
    },
    {
      key: 'activeBookings',
      label: 'Active Stays & Pending',
      value: syncStats.activeBookingsCount,
      icon: '📅',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      link: '/admin/bookings',
      sub: `${syncStats.totalBookings} total lifetime reservations`
    },
    {
      key: 'hotels',
      label: 'Managed Properties',
      value: syncStats.totalHotels,
      icon: '🏨',
      color: 'from-primary-500/20 to-indigo-500/10 border-primary-500/30 text-teal-300',
      link: '/admin/hotels',
      sub: `${syncStats.totalRooms} rooms available`
    },
    {
      key: 'reviews',
      label: 'Guest Reviews',
      value: reviews.length,
      icon: '⭐',
      color: 'from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400',
      link: '/admin/reviews',
      sub: 'Avg 4.9 Star Rating'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Sync Engine Connected
            </div>
            <h2 className="text-3xl font-extrabold text-white font-display">
              Welcome back, {user?.full_name || 'Admin'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Live operational monitoring for Nepal Hotels & Luxury Resorts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/bookings" className="btn-accent py-2.5 px-5 text-xs font-bold shadow-lg shadow-accent-500/20">
              ⚡ Manage Reservations ({syncStats.activeBookingsCount})
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              to={card.link}
              className={`block rounded-3xl p-6 bg-gradient-to-br ${card.color} backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-600`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-white tracking-tight">{card.value}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{card.sub}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center text-2xl shadow-inner">
                  {card.icon}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Grid Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Live Reservations Queue */}
        <div className="lg:col-span-2 bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Live Bookings Queue</h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time status updates broadcast directly across User & Admin portals.</p>
            </div>
            <Link to="/admin/bookings" className="text-xs font-bold text-teal-400 hover:underline">
              View All ({bookings.length}) →
            </Link>
          </div>

          <div className="space-y-4">
            {bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-slate-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-950 border border-primary-500/30 text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
                    RES
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{b.user_name}</span>
                      <span className="text-xs text-slate-500 font-mono">({b.id})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{b.hotel_name} • <span className="text-teal-300">{b.room_type}</span></p>
                    <p className="text-[11px] text-slate-500 mt-1">📅 {b.check_in} to {b.check_out} (${b.total_amount})</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === 'Confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : b.status === 'Cancelled'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {b.status}
                  </span>

                  {b.status === 'Pending' && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'Confirmed', 'Paid')}
                      className="px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-emerald-400 transition"
                    >
                      ✓ Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Broadcast System Alerts */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Broadcast System Alert</h3>
            <p className="text-xs text-slate-400 mt-0.5">Send a real-time notification to all active guests and portal tabs.</p>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Alert Headline</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Helicopter Shuttle Schedule Update"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Broadcast Content</label>
              <textarea
                rows={3}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Enter details to be displayed to users..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-400"
              />
            </div>

            <button
              type="submit"
              disabled={isBroadcasting}
              className="w-full btn-accent py-2.5 text-xs font-bold shadow-lg shadow-accent-500/20"
            >
              📢 Transmit Live Alert
            </button>
          </form>

          {/* Activity Feed */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Log Stream</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="text-[11px] p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-slate-300">
                  <span className="font-bold text-accent-400">● {n.title}:</span> {n.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
