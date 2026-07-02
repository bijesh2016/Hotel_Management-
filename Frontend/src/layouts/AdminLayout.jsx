import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/hotels', label: 'Hotels', icon: '🏨' },
  { to: '/admin/rooms', label: 'Rooms', icon: '🛏️' },
  { to: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { to: '/admin/payments', label: 'Payments', icon: '💳' },
  { to: '/admin/reviews', label: 'Reviews', icon: '⭐' },
  { to: '/admin/users', label: 'Users', icon: '👥', adminOnly: true },
  { to: '/admin/facilities', label: 'Facilities', icon: '🏊' },
  { to: '/admin/notifications', label: 'Notifications', icon: '🔔' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const visibleNav = navItems.filter((item) => !item.adminOnly || user?.role === 'admin');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-primary-900 text-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center border-b border-primary-800 px-6">
          <Link to="/" className="font-display text-lg font-bold">
            Nepal<span className="text-accent-400">Hotels</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-primary-800 p-4">
          <div className="rounded-lg bg-primary-800 p-3">
            <p className="text-xs text-primary-300">Signed in as</p>
            <p className="text-sm font-medium truncate">{user?.full_name}</p>
            <p className="text-xs text-accent-400 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 w-full rounded-lg bg-primary-800 py-2 text-sm text-primary-200 hover:bg-primary-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-slate-800">Admin Panel</h1>
          <Link to="/" className="text-sm text-primary-700 hover:text-primary-600 font-medium">
            ← Back to site
          </Link>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
