const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getToken = () => localStorage.getItem('token');

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }

  return data;
}

export const authApi = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (full_name, email, password, role = 'customer') =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ full_name, email, password, role }),
    }),
  logout: () => request('/auth/logout', { method: 'POST' }),
};

export const hotelApi = {
  getAll: () => request('/hotels'),
  getById: (id) => request(`/hotels/${id}`),
  create: (payload) =>
    request('/hotels', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/hotels/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/hotels/${id}`, { method: 'DELETE' }),
};

export const adminApi = {
  getDashboard: () => request('/admin/dashboard'),
  getUsers: () => request('/admin/users'),
  getReports: () => request('/admin/reports'),
  getHotelOwners: () => request('/admin/hotel-owners'),
};

export const roomApi = {
  getAll: () => request('/rooms'),
  getById: (id) => request(`/rooms/${id}`),
  getByHotel: (hotelId) => request(`/hotels/${hotelId}/rooms`),
  create: (payload) =>
    request('/rooms', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/rooms/${id}`, { method: 'DELETE' }),
};

export const bookingApi = {
  getAll: () => request('/reservations'),
  getById: (id) => request(`/reservations/${id}`),
  getMy: () => request('/reservations/my'),
  create: (payload) =>
    request('/reservations', { method: 'POST', body: JSON.stringify(payload) }),
  updateStatus: (id, status) =>
    request(`/reservations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  delete: (id) => request(`/reservations/${id}`, { method: 'DELETE' }),
};

export const userApi = {
  getAll: () => request('/admin/users'),
  getById: (id) => request(`/admin/users/${id}`),
  create: (payload) =>
    request('/admin/users', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
};

export const paymentApi = {
  getAll: () => request('/payments'),
  getById: (id) => request(`/payments/${id}`),
  create: (payload) =>
    request('/payments', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/payments/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/payments/${id}`, { method: 'DELETE' }),
};

export const reviewApi = {
  getAll: () => request('/reviews'),
  getById: (id) => request(`/reviews/${id}`),
  getByHotel: (hotelId) => request(`/hotels/${hotelId}/reviews`),
  create: (payload) =>
    request('/reviews', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/reviews/${id}`, { method: 'DELETE' }),
};

export const facilityApi = {
  getAll: () => request('/facilities'),
  getById: (id) => request(`/facilities/${id}`),
  create: (payload) =>
    request('/facilities', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/facilities/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/facilities/${id}`, { method: 'DELETE' }),
};

export const notificationApi = {
  getAll: () => request('/notifications'),
  getById: (id) => request(`/notifications/${id}`),
  create: (payload) =>
    request('/notifications', { method: 'POST', body: JSON.stringify(payload) }),
  markAsRead: (id) =>
    request(`/notifications/${id}/read`, { method: 'PUT' }),
  delete: (id) => request(`/notifications/${id}`, { method: 'DELETE' }),
};
