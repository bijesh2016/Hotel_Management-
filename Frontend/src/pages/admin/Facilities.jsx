import { useCallback, useEffect, useState } from 'react';
import { facilityApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const emptyForm = {
  name: '',
  description: '',
  icon: '',
  category: 'general',
};

export default function Facilities() {
  const { isAdmin, isHotelOwner } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadFacilities = useCallback(async () => {
    setLoading(true);
    try {
      const data = await facilityApi.getAll();
      setFacilities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (facility) => {
    setForm({
      name: facility.name || '',
      description: facility.description || '',
      icon: facility.icon || '',
      category: facility.category || 'general',
    });
    setEditingId(facility.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await facilityApi.update(editingId, form);
      } else {
        await facilityApi.create(form);
      }
      setShowForm(false);
      loadFacilities();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !window.confirm('Delete this facility?')) return;
    try {
      await facilityApi.delete(id);
      loadFacilities();
    } catch (err) {
      setError(err.message);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'room':
        return 'bg-blue-100 text-blue-700';
      case 'dining':
        return 'bg-amber-100 text-amber-700';
      case 'wellness':
        return 'bg-emerald-100 text-emerald-700';
      case 'service':
        return 'bg-violet-100 text-violet-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Facilities</h2>
          <p className="text-sm text-slate-500">Manage hotel amenities and facilities</p>
        </div>
        {(isAdmin || isHotelOwner) && (
          <button type="button" onClick={openCreate} className="btn-primary !py-2.5">
            + Add Facility
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 card-surface p-6">
          <h3 className="font-semibold text-slate-800">{editingId ? 'Edit Facility' : 'New Facility'}</h3>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Facility Name"
              className="input-field"
              required
            />
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="Icon (emoji or text)"
              className="input-field"
            />
            <select name="category" value={form.category} onChange={handleChange} className="input-field">
              <option value="general">General</option>
              <option value="room">Room</option>
              <option value="dining">Dining</option>
              <option value="wellness">Wellness</option>
              <option value="service">Service</option>
            </select>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="input-field sm:col-span-2 resize-none"
            />
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
        <p className="text-slate-500">Loading facilities...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <div key={facility.id} className="card-surface p-6 transition hover:shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {facility.icon && <span className="text-2xl">{facility.icon}</span>}
                  <div>
                    <h3 className="font-semibold text-slate-800">{facility.name}</h3>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getCategoryColor(
                        facility.category
                      )}`}
                    >
                      {facility.category || 'general'}
                    </span>
                  </div>
                </div>
                {(isAdmin || isHotelOwner) && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(facility)}
                      className="text-primary-700 hover:text-primary-600 font-medium text-xs"
                    >
                      Edit
                    </button>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDelete(facility.id)}
                        className="text-red-600 hover:text-red-500 font-medium text-xs"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-600">{facility.description || 'No description'}</p>
            </div>
          ))}
          {facilities.length === 0 && (
            <div className="card-surface p-12 text-center sm:col-span-2 lg:col-span-3">
              <p className="text-slate-500">No facilities found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
