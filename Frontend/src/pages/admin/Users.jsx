import { useState } from 'react';

const SEED_USERS = [
  { id: 1, full_name: 'Bijesh Shrestha', email: 'admin@nepalhotels.com', role: 'admin' },
  { id: 2, full_name: 'Aarav Sharma', email: 'aarav@example.com', role: 'customer' },
  { id: 3, full_name: 'Sophia Patel', email: 'sophia@example.com', role: 'customer' },
  { id: 4, full_name: 'Dr. Rohan Ray', email: 'rohan@resortowner.com', role: 'hotel_owner' }
];

export default function Users() {
  const [users, setUsers] = useState(SEED_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserRole = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextRole = u.role === 'customer' ? 'hotel_owner' : u.role === 'hotel_owner' ? 'admin' : 'customer';
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">User Account Directory</h2>
          <p className="text-xs text-slate-400 mt-1">Manage system accounts, staff credentials, and role permissions.</p>
        </div>

        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-teal-400"
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Access Level Role</th>
                <th className="px-6 py-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-teal-300">
                      {u.full_name[0]}
                    </div>
                    {u.full_name}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{u.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        u.role === 'admin'
                          ? 'bg-accent-500/10 text-accent-400 border border-accent-500/30'
                          : u.role === 'hotel_owner'
                          ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleUserRole(u.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition text-xs border border-slate-700"
                    >
                      ⚡ Toggle Role
                    </button>
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
