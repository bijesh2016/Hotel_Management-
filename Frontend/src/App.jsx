import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SyncProvider } from './context/SyncContext';
import ToastContainer from './components/ui/ToastContainer';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Hotels from './pages/Hotels';
import HotelSingle from './pages/HotelSingle';
import Rooms from './pages/Rooms';
import RoomSingle from './pages/RoomSingle';
import MyBookings from './pages/MyBookings';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import AdminHotels from './pages/admin/Hotels';
import RoomsAdmin from './pages/admin/RoomsAdmin';
import Bookings from './pages/admin/Bookings';
import Payments from './pages/admin/Payments';
import Reviews from './pages/admin/Reviews';
import Users from './pages/admin/Users';
import Facilities from './pages/admin/Facilities';
import Notifications from './pages/admin/Notifications';

export default function App() {
  return (
    <AuthProvider>
      <SyncProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="hotels" element={<Hotels />} />
              <Route path="hotels/:id" element={<HotelSingle />} />
              <Route path="services" element={<Services />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="rooms/:id" element={<RoomSingle />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
              path="admin"
              element={
                <ProtectedRoute roles={['admin', 'hotel_owner']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="hotels" element={<AdminHotels />} />
              <Route path="rooms" element={<RoomsAdmin />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="payments" element={<Payments />} />
              <Route path="reviews" element={<Reviews />} />
              <Route
                path="users"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route path="facilities" element={<Facilities />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </SyncProvider>
    </AuthProvider>
  );
}

