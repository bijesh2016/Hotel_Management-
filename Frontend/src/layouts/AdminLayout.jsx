import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useSync } from '../context/SyncContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/hotels', label: 'Hotels', icon: '🏨' },
  { to: '/admin/rooms', label: 'Rooms & Suites', icon: '🛏️' },
  { to: '/admin/bookings', label: 'Reservations', icon: '📅', badgeKey: 'activeBookingsCount' },
  { to: '/admin/payments', label: 'Payments & Revenue', icon: '💳' },
  { to: '/admin/reviews', label: 'Guest Reviews', icon: '⭐' },
  { to: '/admin/users', label: 'User Directory', icon: '👥', adminOnly: true },
  { to: '/admin/facilities', label: 'Resort Amenities', icon: '🏊' },
  { to: '/admin/notifications', label: 'Alerts & Broadcast', icon: '🔔', badgeKey: 'unreadNotifs' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuth();
  const { syncStats, lastSyncTime, notifications, markNotificationRead } = useSync();
  const navigate = useNavigate();

  const visibleNav = navItems.filter((item) => !item.adminOnly || user?.role === 'admin');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Glassmorphism Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-900/95 backdrop-blur-2xl border-r border-slate-800 transition-all duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-500 to-teal-400 flex items-center justify-center text-lg font-bold shadow-lg shadow-accent-500/20">
              👑
            </div>
            <div>
              <span className="font-display text-lg font-extrabold text-white tracking-wide">
                Nepal<span className="text-accent-400">Admin</span>
              </span>
              <span className="block text-[9px] uppercase font-bold tracking-widest text-teal-400 -mt-0.5">
                Management Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Live Status Pill */}
        <div className="px-6 py-4 border-b border-slate-800/60">
          <div className="flex items-center justify-between bg-slate-950/60 border border-emerald-500/30 rounded-2xl px-3.5 py-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400">Live Sync Active</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{lastSyncTime}</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-240px)]">
          {visibleNav.map((item) => {
            const badgeCount = item.badgeKey ? syncStats[item.badgeKey] : 0;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-600/30 to-teal-500/20 text-teal-300 border border-teal-500/30 shadow-lg shadow-teal-900/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>

                {badgeCount > 0 && (
                  <span className="bg-accent-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {badgeCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800/80 p-4 bg-slate-900/90 backdrop-blur-md">
          <div className="rounded-2xl bg-slate-950/80 p-3.5 border border-slate-800 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Logged in as</p>
              <p className="text-xs font-bold text-white truncate">{user?.full_name || 'Admin User'}</p>
              <p className="text-[10px] text-accent-400 capitalize font-mono">{user?.role?.replace('_', ' ')}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-rose-900/40 hover:text-rose-300 transition text-sm shrink-0"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 bg-slate-950">
        {/* Header Bar */}
        <header className="flex h-20 items-center justify-between border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white font-display">Executive Overview</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Realtime alerts drawer trigger */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white transition"
              >
                🔔
                {syncStats.unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {syncStats.unreadNotifs}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 text-slate-100"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h4 className="font-bold text-sm">System Admin Notifications</h4>
                      <button onClick={() => setNotifOpen(false)} className="text-xs text-slate-400 hover:text-white">✕</button>
                    </div>
                    <div className="max-h-72 overflow-y-auto my-3 space-y-2 pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer ${
                            n.read ? 'bg-slate-950/40 border-slate-800 text-slate-400' : 'bg-primary-950/50 border-primary-500/30 text-white'
                          }`}
                        >
                          <div className="font-bold text-accent-400">{n.title}</div>
                          <div className="mt-1">{n.message}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/"
              className="rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-teal-300 hover:bg-teal-500/10 hover:border-teal-500/30 transition flex items-center gap-1.5"
            >
              <span>← View Customer Site</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
