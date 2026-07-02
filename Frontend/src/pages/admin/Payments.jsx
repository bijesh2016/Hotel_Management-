import { useCallback, useEffect, useState } from 'react';
import { paymentApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function Payments() {
  const { isAdmin } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const loadPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await paymentApi.getAll();
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const handleDelete = async (id) => {
    if (!isAdmin || !window.confirm('Delete this payment record?')) return;
    try {
      await paymentApi.delete(id);
      loadPayments();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    if (filter === 'all') return true;
    return payment.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'refunded':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Payments</h2>
          <p className="text-sm text-slate-500">Track transactions and payment status</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field !py-2"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading payments...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Payment ID</th>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">#{payment.id}</td>
                  <td className="px-6 py-4 text-slate-600">#{payment.reservation_id || payment.booking_id || '-'}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    Rs {payment.amount || payment.total_amount || 0}
                  </td>
                  <td className="px-6 py-4 text-slate-600 capitalize">
                    {payment.payment_method || payment.method || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {payment.created_at ? new Date(payment.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleDelete(payment.id)}
                          className="text-red-600 hover:text-red-500 font-medium text-xs"
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
