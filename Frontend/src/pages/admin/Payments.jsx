import { useState } from 'react';
import { useSync } from '../../context/SyncContext';

export default function Payments() {
  const { bookings, syncStats } = useSync();
  const [filter, setFilter] = useState('all');

  // Derive payments list from bookings
  const paymentsList = bookings.map((b) => ({
    id: `PAY-${b.id.replace('RES-', '')}`,
    booking_id: b.id,
    user_name: b.user_name,
    amount: b.total_amount,
    method: 'Credit Card / eSewa',
    status: b.payment_status || (b.status === 'Confirmed' ? 'Paid' : 'Pending'),
    date: new Date(b.created_at || Date.now()).toLocaleDateString()
  }));

  const filteredPayments = paymentsList.filter(
    (p) => filter === 'all' || p.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">Revenue & Financial Ledger</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time payment tracking, digital receipts, and audit history.</p>
        </div>

        <div className="flex items-center gap-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Gross Total Revenue</span>
            <div className="text-2xl font-extrabold text-emerald-400">${syncStats.totalRevenue.toLocaleString()}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-200 outline-none font-bold"
          >
            <option value="all">All Payment Statuses</option>
            <option value="Paid">Paid Only</option>
            <option value="Pending">Pending Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Receipt TxID</th>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Payer Name</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-mono font-bold text-teal-400">{p.id}</td>
                  <td className="px-6 py-4 font-mono text-slate-300">{p.booking_id}</td>
                  <td className="px-6 py-4 font-bold text-white">{p.user_name}</td>
                  <td className="px-6 py-4 font-extrabold text-white text-sm">${p.amount}</td>
                  <td className="px-6 py-4 text-slate-400">{p.method}</td>
                  <td className="px-6 py-4 text-slate-400">{p.date}</td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        p.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      ● {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
