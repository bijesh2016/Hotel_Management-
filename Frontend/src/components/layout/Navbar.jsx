import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/services', label: 'Services' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const canAccessAdmin = user?.role === 'admin' || user?.role === 'hotel_owner';

  return (
    <nav className="sticky top-0 z-50 bg-primary-800/95 backdrop-blur-md shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link to="/" className="font-display text-2xl font-bold text-white">
          Nepal<span className="text-accent-400">Hotels</span>
        </Link>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-white"
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

        <div className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-1 bg-primary-800 px-4 py-4 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-1 md:bg-transparent md:p-0 md:shadow-none`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-primary-700 text-white' : 'text-primary-100 hover:bg-primary-700/60 hover:text-white'
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
                `rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-accent-500 text-white' : 'text-accent-300 hover:bg-accent-500/20'
                }`
              }
            >
              Admin
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-2 border-t border-primary-700 pt-3 md:border-0 md:pt-0 md:pl-2">
              <span className="px-2 text-xs text-primary-200">{user.full_name}</span>
              <button type="button" onClick={handleLogout} className="btn-accent !py-2 !px-4 text-xs">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 border-t border-primary-700 pt-3 md:border-0 md:pt-0 md:pl-2">
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm text-primary-100 hover:text-white">
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-accent !py-2 !px-4 text-xs">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
