import { useCallback, useEffect, useState } from 'react';
import { roomApi, hotelApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const emptyForm = {
  hotel_id: '',
  room_type_id: '',
  room_number: '',
  floor_number: '',
  status: 'available',
};

export default function RoomsAdmin() {
  const { isAdmin, isHotelOwner } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadRooms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await roomApi.getAll();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadHotels = useCallback(async () => {
    try {
      const data = await hotelApi.getAll();
      setHotels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load hotels:', err);
    }
  }, []);

  useEffect(() => {
    loadRooms();
    loadHotels();
  }, [loadRooms, loadHotels]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (room) => {
    setForm({
      hotel_id: room.hotel_id || '',
      room_type_id: room.room_type_id || '',
      room_number: room.room_number || '',
      floor_number: room.floor_number || '',
      status: room.status || 'available',
    });
    setEditingId(room.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await roomApi.update(editingId, form);
      } else {
        await roomApi.create(form);
      }
      setShowForm(false);
      loadRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !window.confirm('Delete this room?')) return;
    try {
      await roomApi.delete(id);
      loadRooms();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Rooms</h2>
          <p className="text-sm text-slate-500">Manage room inventory and availability</p>
        </div>
        {(isAdmin || isHotelOwner) && (
          <button type="button" onClick={openCreate} className="btn-primary !py-2.5">
            + Add Room
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 card-surface p-6">
          <h3 className="font-semibold text-slate-800">{editingId ? 'Edit Room' : 'New Room'}</h3>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <select
              name="hotel_id"
              value={form.hotel_id}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select Hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </select>
            <input
              name="room_number"
              value={form.room_number}
              onChange={handleChange}
              placeholder="Room Number"
              className="input-field"
              required
            />
            <input
              name="floor_number"
              value={form.floor_number}
              onChange={handleChange}
              placeholder="Floor Number"
              className="input-field"
              type="number"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading rooms...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Room Number</th>
                <th className="px-6 py-4">Hotel</th>
                <th className="px-6 py-4">Floor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{room.room_number}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {hotels.find((h) => h.id === room.hotel_id)?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{room.floor_number || '-'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        room.status === 'available'
                          ? 'bg-emerald-100 text-emerald-700'
                          : room.status === 'occupied'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {room.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(room)}
                        className="text-primary-700 hover:text-primary-600 font-medium text-xs"
                      >
                        Edit
                      </button>
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleDelete(room.id)}
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
