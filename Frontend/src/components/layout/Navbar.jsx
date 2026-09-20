import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useSync } from '../../context/SyncContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/hotels', label: 'Luxury Hotels' },
  { to: '/rooms', label: 'Rooms & Suites' },
  { to: '/my-bookings', label: 'My Bookings' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { notifications, syncStats, markNotificationRead } = useSync();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const canAccessAdmin = user?.role === 'admin' || user?.role === 'hotel_owner';

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-500 via-primary-500 to-teal-400 p-0.5 shadow-lg shadow-accent-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-xl">
              🏔️
            </div>
          </div>
          <div>
            <span className="font-display text-xl font-extrabold text-white tracking-wide">
              Nepal<span className="text-accent-400">Hotels</span>
            </span>
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-teal-400/90 -mt-1">
              Luxury Resort & Spa
            </span>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Notif button */}
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60"
            aria-label="Notifications"
          >
            🔔
            {syncStats.unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {syncStats.unreadNotifs}
              </span>
            )}
          </button>

          <button
            type="button"
            className="rounded-xl p-2 text-white bg-slate-800/80"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            open ? 'flex' : 'hidden'
          } absolute left-0 right-0 top-full flex-col gap-2 bg-slate-900/95 backdrop-blur-2xl p-6 border-b border-slate-800 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-1 md:bg-transparent md:p-0 md:border-0 md:shadow-none`}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600/30 to-teal-500/30 text-teal-300 border border-teal-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {canAccessAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-2 text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-accent-500 text-slate-950 shadow-lg shadow-accent-500/20'
                    : 'bg-accent-500/10 text-accent-400 border border-accent-500/30 hover:bg-accent-500 hover:text-slate-950'
                }`
              }
            >
              👑 Admin Panel
            </NavLink>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-3 border-t border-slate-800 pt-4 md:border-0 md:pt-0 md:ml-3">
            {/* Notification Drawer Button */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 transition border border-slate-700/50"
                title="System Notifications"
              >
                🔔
                {syncStats.unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {syncStats.unreadNotifs}
                  </span>
                )}
              </button>

              {/* Notification Popover Drawer */}
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 text-slate-100"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">System Live Alerts</h4>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono">
                          LIVE 🟢
                        </span>
                      </div>
                      <button
                        onClick={() => setNotifOpen(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto my-3 space-y-2.5 pr-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-6">No notifications</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                              n.read
                                ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                                : 'bg-primary-950/40 border-primary-500/30 text-slate-200 hover:border-primary-400'
                            }`}
                          >
                            <div className="font-bold text-teal-300">{n.title}</div>
                            <div className="mt-1 leading-relaxed">{n.message}</div>
                            <div className="mt-1 text-[10px] text-slate-500">
                              {new Date(n.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-white truncate max-w-[120px]">
                    {user.full_name}
                  </div>
                  <div className="text-[10px] text-accent-400 capitalize font-mono">
                    {user.role?.replace('_', ' ')}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-rose-900/40 hover:text-rose-300 hover:border-rose-500/30 border border-slate-700 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="btn-accent py-2 px-4 text-xs font-bold shadow-lg shadow-accent-500/20"
                >
                  Book Stay
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
