import { useCallback, useEffect, useState } from 'react';
import { hotelApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { FEATURED_HOTELS } from '../../data/mockData';

const emptyForm = {
  name: '',
  description: '',
  address: '',
  city: '',
  country: 'Nepal',
  star_rating: 3,
};

export default function Hotels() {
  const { isAdmin, isHotelOwner } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadHotels = useCallback(async () => {
    setLoading(true);
    try {
      const data = await hotelApi.getAll();
      setHotels(Array.isArray(data) && data.length > 0 ? data : FEATURED_HOTELS);
    } catch {
      setHotels(FEATURED_HOTELS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadHotels(); }, [loadHotels]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'star_rating' ? Number(value) : value }));
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (hotel) => {
    setForm({
      name: hotel.name || '',
      description: hotel.description || '',
      address: hotel.address || '',
      city: hotel.city || '',
      country: hotel.country || 'Nepal',
      star_rating: hotel.star_rating || 3,
    });
    setEditingId(hotel.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await hotelApi.update(editingId, form);
      } else {
        await hotelApi.create(form);
      }
      setShowForm(false);
      loadHotels();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !window.confirm('Delete this hotel?')) return;
    try {
      await hotelApi.delete(id);
      loadHotels();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Hotels</h2>
          <p className="text-sm text-slate-500">Manage hotel properties and listings</p>
        </div>
        {(isAdmin || isHotelOwner) && (
          <button type="button" onClick={openCreate} className="btn-primary !py-2.5">
            + Add Hotel
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 card-surface p-6">
          <h3 className="font-semibold text-slate-800">{editingId ? 'Edit Hotel' : 'New Hotel'}</h3>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Hotel name" className="input-field" required />
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input-field" required />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input-field sm:col-span-2" />
            <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="input-field" />
            <select name="star_rating" value={form.star_rating} onChange={handleChange} className="input-field">
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
              ))}
            </select>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className="input-field sm:col-span-2 resize-none" />
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading hotels...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{hotel.name}</td>
                  <td className="px-6 py-4 text-slate-600">{hotel.city}</td>
                  <td className="px-6 py-4 text-slate-600">{hotel.country}</td>
                  <td className="px-6 py-4 text-accent-500">{'★'.repeat(hotel.star_rating || 3)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => openEdit(hotel)} className="text-primary-700 hover:text-primary-600 font-medium text-xs">
                        Edit
                      </button>
                      {isAdmin && (
                        <button type="button" onClick={() => handleDelete(hotel.id)} className="text-red-600 hover:text-red-500 font-medium text-xs">
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
