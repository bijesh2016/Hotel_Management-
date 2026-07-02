import { useCallback, useEffect, useState } from 'react';
import { notificationApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const emptyForm = {
  title: '',
  message: '',
  type: 'info',
  recipient_type: 'all',
};

export default function Notifications() {
  const { isAdmin, isHotelOwner } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await notificationApi.getAll();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCreate = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await notificationApi.create(form);
      setShowForm(false);
      loadNotifications();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
      loadNotifications();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !window.confirm('Delete this notification?')) return;
    try {
      await notificationApi.delete(id);
      loadNotifications();
    } catch (err) {
      setError(err.message);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-700';
      case 'success':
        return 'bg-emerald-100 text-emerald-700';
      case 'warning':
        return 'bg-amber-100 text-amber-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '📢';
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <p className="text-sm text-slate-500">Send and manage guest notifications</p>
        </div>
        {(isAdmin || isHotelOwner) && (
          <button type="button" onClick={openCreate} className="btn-primary !py-2.5">
            + Send Notification
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <div className="mb-6 card-surface p-6">
          <h3 className="font-semibold text-slate-800">Send New Notification</h3>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Notification Title"
              className="input-field"
              required
            />
            <select name="type" value={form.type} onChange={handleChange} className="input-field">
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <select
              name="recipient_type"
              value={form.recipient_type}
              onChange={handleChange}
              className="input-field"
            >
              <option value="all">All Users</option>
              <option value="customers">Customers Only</option>
              <option value="hotel_owners">Hotel Owners Only</option>
            </select>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="input-field sm:col-span-2 resize-none"
              required
            />
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? 'Sending...' : 'Send Notification'}
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
        <p className="text-slate-500">Loading notifications...</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card-surface p-6 transition hover:shadow-md ${
                !notification.read ? 'border-l-4 border-l-primary-500' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-slate-800">{notification.title}</h3>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getTypeColor(
                          notification.type
                        )}`}
                      >
                        {notification.type || 'info'}
                      </span>
                      {!notification.read && (
                        <span className="inline-flex rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{notification.message}</p>
                    <p className="text-xs text-slate-400">
                      {notification.created_at ? new Date(notification.created_at).toLocaleString() : 'Unknown date'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <button
                      type="button"
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-primary-700 hover:text-primary-600 font-medium text-xs"
                    >
                      Mark Read
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleDelete(notification.id)}
                      className="text-red-600 hover:text-red-500 font-medium text-xs"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="card-surface p-12 text-center">
              <p className="text-slate-500">No notifications found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
