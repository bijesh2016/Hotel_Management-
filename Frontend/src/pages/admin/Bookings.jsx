import { useCallback, useEffect, useState } from 'react';
import { bookingApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function Bookings() {
  const { isAdmin, isHotelOwner } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bookingApi.getAll();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleStatusUpdate = async (id, newStatus) => {
    if (!isAdmin && !isHotelOwner) return;
    try {
      await bookingApi.updateStatus(id, newStatus);
      loadBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !window.confirm('Delete this booking?')) return;
    try {
      await bookingApi.delete(id);
      loadBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bookings</h2>
          <p className="text-sm text-slate-500">Manage guest reservations and booking status</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field !py-2"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading bookings...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">#{booking.id}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {booking.user_name || booking.guest_name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{booking.room_id || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(booking.check_in).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(booking.check_out).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Rs {booking.total_amount || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {(isAdmin || isHotelOwner) && booking.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          className="text-emerald-600 hover:text-emerald-500 font-medium text-xs"
                        >
                          Confirm
                        </button>
                      )}
                      {(isAdmin || isHotelOwner) && booking.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(booking.id, 'completed')}
                          className="text-blue-600 hover:text-blue-500 font-medium text-xs"
                        >
                          Complete
                        </button>
                      )}
                      {(isAdmin || isHotelOwner) &&
                        (booking.status === 'pending' || booking.status === 'confirmed') && (
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="text-red-600 hover:text-red-500 font-medium text-xs"
                          >
                            Cancel
                          </button>
                        )}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleDelete(booking.id)}
                          className="text-slate-600 hover:text-slate-500 font-medium text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
