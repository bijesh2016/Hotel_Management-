import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi, hotelApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const statCards = [
  { key: 'hotels', label: 'Total Hotels', icon: '🏨', color: 'bg-primary-500', link: '/admin/hotels' },
  { key: 'bookings', label: 'Bookings', icon: '📅', color: 'bg-accent-500', link: '/admin/bookings' },
  { key: 'users', label: 'Users', icon: '👥', color: 'bg-violet-500', link: '/admin/users' },
  { key: 'revenue', label: 'Revenue', icon: '💰', color: 'bg-emerald-500', link: '/admin/payments' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ hotels: 0, bookings: 0, users: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [hotels, reports] = await Promise.allSettled([
          hotelApi.getAll(),
          user?.role === 'admin' ? adminApi.getReports() : Promise.resolve(null),
        ]);

        setStats({
          hotels: hotels.status === 'fulfilled' && Array.isArray(hotels.value) ? hotels.value.length : 0,
          bookings: reports.status === 'fulfilled' ? reports.value?.reports?.totalBookings ?? 0 : 0,
          users: reports.status === 'fulfilled' ? reports.value?.reports?.totalUsers ?? 0 : 0,
          revenue: reports.status === 'fulfilled' ? reports.value?.reports?.totalRevenue ?? 0 : 0,
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.role]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.full_name?.split(' ')[0]}
        </h2>
        <p className="mt-1 text-slate-500">Here&apos;s an overview of your hotel operations.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Link key={card.key} to={card.link} className="card-surface p-6 transition hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {loading ? '—' : card.key === 'revenue' ? `Rs ${stats.revenue}` : stats[card.key]}
                </p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} text-xl text-white`}>
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h3 className="font-semibold text-slate-800">Quick Actions</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { to: '/admin/hotels', label: 'Add Hotel', desc: 'Register a new property' },
              { to: '/admin/bookings', label: 'View Bookings', desc: 'Manage reservations' },
              { to: '/admin/rooms', label: 'Manage Rooms', desc: 'Update room inventory' },
              { to: '/admin/notifications', label: 'Notifications', desc: 'Send guest alerts' },
            ].map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="rounded-xl border border-slate-100 p-4 hover:border-primary-200 hover:bg-primary-50 transition"
              >
                <p className="font-medium text-slate-800">{action.label}</p>
                <p className="text-xs text-slate-500 mt-1">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="card-surface p-6">
          <h3 className="font-semibold text-slate-800">System Status</h3>
          <ul className="mt-4 space-y-3">
            {[
              { label: 'API Server', status: 'Connected', ok: true },
              { label: 'Hotel Module', status: 'Active', ok: true },
              { label: 'Booking Module', status: 'Ready', ok: true },
              { label: 'Payment Module', status: 'Ready', ok: true },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-700">{item.label}</span>
                <span className={`text-xs font-medium ${item.ok ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
