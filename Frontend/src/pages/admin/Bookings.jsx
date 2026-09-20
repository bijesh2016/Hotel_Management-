import { useState } from 'react';
import { useSync } from '../../context/SyncContext';

export default function Bookings() {
  const { bookings, updateBookingStatus } = useSync();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === 'all' || b.status?.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.hotel_name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white font-display">Reservation Operations</h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
              LIVE SYNC 🟢
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time control center for guest reservations across all partner hotels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search by ID, guest, or hotel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-teal-400"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-200 outline-none focus:border-teal-400 font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Guest Info</th>
                <th className="px-6 py-4">Hotel & Room</th>
                <th className="px-6 py-4">Check In / Out</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Instant Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    No reservations matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-bold font-mono text-teal-400">{b.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{b.user_name}</div>
                      <div className="text-[11px] text-slate-400">{b.user_email || 'guest@example.com'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-200">{b.hotel_name}</div>
                      <div className="text-[11px] text-teal-300 font-medium">{b.room_type}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <div>📅 {b.check_in}</div>
                      <div className="text-slate-500">➜ {b.check_out}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-white text-sm">${b.total_amount}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{b.payment_status || 'Pending'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : b.status === 'Cancelled'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
                        }`}
                      >
                        ● {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Confirmed', 'Paid')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
                          >
                            ✓ Confirm
                          </button>
                        )}
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Completed')}
                            className="px-3 py-1.5 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition"
                          >
                            🎉 Complete
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                            className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-bold hover:bg-rose-900 transition"
                          >
                            ✕ Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
