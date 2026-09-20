import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { bookingApi, hotelApi, roomApi, reviewApi, notificationApi, paymentApi, facilityApi, userApi } from '../api/api';

const SyncContext = createContext(null);

const SYNC_CHANNEL_NAME = 'hotel_sync_channel_v1';

// Seed mock initial state for full offline fallback capability
const SEED_HOTELS = [
  {
    id: 1,
    name: 'The Everest Luxury Resort',
    description: 'Panoramic Himalayan views with world-class 5-star spa, heated infinity pool, and gourmet dining.',
    address: 'Nagarkot Top, Bhaktapur',
    city: 'Nagarkot',
    country: 'Nepal',
    star_rating: 5,
    rating: 4.9,
    price_per_night: 220,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Free High-Speed Wi-Fi', 'Infinity Pool', 'Mountain Spa', 'Fine Dining', 'Helipad Access'],
    available_rooms: 12
  },
  {
    id: 2,
    name: 'Lakeside Serenity Hotel & Suites',
    description: 'Boutique eco-resort overlooking Phewa Lake with Annapurna views and organic dining.',
    address: 'Lakeside Road, Ward 6',
    city: 'Pokhara',
    country: 'Nepal',
    star_rating: 4,
    rating: 4.8,
    price_per_night: 145,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Lake View Balcony', 'Yoga Pavilion', 'Bar & Lounge', 'Kayaking', 'Airport Transfer'],
    available_rooms: 8
  },
  {
    id: 3,
    name: 'Kathmandu Heritage Grand',
    description: 'Traditional Nepalese Newari craftsmanship blended with modern royal luxury in historical Durbar Square area.',
    address: 'Thamel Marg',
    city: 'Kathmandu',
    country: 'Nepal',
    star_rating: 5,
    rating: 4.7,
    price_per_night: 180,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Heritage Courtyard', 'Rooftop Bar', '24/7 Butler Service', 'Casino', 'Sauna'],
    available_rooms: 15
  },
  {
    id: 4,
    name: 'Chitwan Jungle Safari Lodge',
    description: 'Immersive eco-luxury lodge on the edge of Chitwan National Park with wildlife tours and riverfront villas.',
    address: 'Sauraha Riverfront',
    city: 'Chitwan',
    country: 'Nepal',
    star_rating: 4,
    rating: 4.9,
    price_per_night: 160,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Elephant Safari', 'River View Pool', 'All-Inclusive Meals', 'Nature Guides', 'Bonfire Deck'],
    available_rooms: 6
  }
];

const SEED_ROOMS = [
  {
    id: 101,
    hotel_id: 1,
    hotel_name: 'The Everest Luxury Resort',
    room_number: 'E-501',
    room_type: 'Presidential Suite',
    price_per_night: 350,
    capacity: 4,
    description: 'Ultimate luxury suite with private Jacuzzi, panoramic mountain view terrace, and king bed.',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    amenities: ['Jacuzzi', 'Terrace', 'King Bed', 'Butler Service', 'Mini Bar']
  },
  {
    id: 102,
    hotel_id: 1,
    hotel_name: 'The Everest Luxury Resort',
    room_number: 'E-302',
    room_type: 'Deluxe Himalayan Room',
    price_per_night: 220,
    capacity: 2,
    description: 'Spacious room with floor-to-ceiling glass windows facing snow peaks.',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Mountain View', 'Balcony', 'King Bed', 'Free Wi-Fi']
  },
  {
    id: 103,
    hotel_id: 2,
    hotel_name: 'Lakeside Serenity Hotel & Suites',
    room_number: 'L-204',
    room_type: 'Lake Front Suite',
    price_per_night: 180,
    capacity: 3,
    description: 'Relaxing suite directly looking out onto Phewa Lake with private sunrise balcony.',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    amenities: ['Lake View', 'Private Balcony', 'Express Coffee Maker', 'Bathtub']
  },
  {
    id: 104,
    hotel_id: 3,
    hotel_name: 'Kathmandu Heritage Grand',
    room_number: 'K-108',
    room_type: 'Royal Newari Room',
    price_per_night: 180,
    capacity: 2,
    description: 'Artisanal carved wood furnishings combined with modern plush comforts.',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    amenities: ['Air Conditioning', 'Smart TV', 'Marble Bath', 'Work Desk']
  }
];

const SEED_BOOKINGS = [
  {
    id: 'RES-8901',
    user_name: 'Aarav Sharma',
    user_email: 'aarav@example.com',
    hotel_id: 1,
    hotel_name: 'The Everest Luxury Resort',
    room_id: 101,
    room_type: 'Presidential Suite',
    check_in: '2026-10-15',
    check_out: '2026-10-18',
    guests: 2,
    total_amount: 1050,
    status: 'Confirmed',
    payment_status: 'Paid',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'RES-8902',
    user_name: 'Sophia Patel',
    user_email: 'sophia@example.com',
    hotel_id: 2,
    hotel_name: 'Lakeside Serenity Hotel & Suites',
    room_id: 103,
    room_type: 'Lake Front Suite',
    check_in: '2026-11-01',
    check_out: '2026-11-04',
    guests: 2,
    total_amount: 540,
    status: 'Pending',
    payment_status: 'Pending',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

const SEED_REVIEWS = [
  {
    id: 1,
    user_name: 'Dr. Rohan Ray',
    hotel_id: 1,
    hotel_name: 'The Everest Luxury Resort',
    rating: 5,
    comment: 'The sunrise view over Everest from our balcony was unforgettable. Exceptional staff service!',
    date: '2026-09-10'
  },
  {
    id: 2,
    user_name: 'Elena Rostova',
    hotel_id: 2,
    hotel_name: 'Lakeside Serenity Hotel & Suites',
    rating: 5,
    comment: 'Peaceful ambience, delicious local cuisine, and seamless boat transfers across Phewa Lake.',
    date: '2026-09-14'
  }
];

const SEED_NOTIFICATIONS = [
  {
    id: 101,
    title: 'System Initialized',
    message: 'Live synchronization between User and Admin portal active.',
    type: 'info',
    read: false,
    timestamp: new Date().toISOString()
  }
];

export function SyncProvider({ children }) {
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('sync_hotels');
    return saved ? JSON.parse(saved) : SEED_HOTELS;
  });

  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('sync_rooms');
    return saved ? JSON.parse(saved) : SEED_ROOMS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('sync_bookings');
    return saved ? JSON.parse(saved) : SEED_BOOKINGS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('sync_reviews');
    return saved ? JSON.parse(saved) : SEED_REVIEWS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sync_notifications');
    return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState([]);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());

  // BroadcastChannel for cross-tab sync
  const [channel, setChannel] = useState(null);

  // Save state to localStorage whenever modified
  useEffect(() => {
    localStorage.setItem('sync_hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('sync_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('sync_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('sync_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('sync_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helper
  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    const newToast = { id, title, message, type, timestamp: new Date() };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Broadcast state changes across browser tabs
  const broadcastEvent = useCallback((type, payload, notificationMessage) => {
    setLastSyncTime(new Date().toLocaleTimeString());
    
    if (channel) {
      try {
        channel.postMessage({ type, payload, time: Date.now() });
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }
    }

    if (notificationMessage) {
      addToast(notificationMessage.title, notificationMessage.message, notificationMessage.type || 'info');
      
      const newNotif = {
        id: Date.now(),
        title: notificationMessage.title,
        message: notificationMessage.message,
        type: notificationMessage.type || 'info',
        read: false,
        timestamp: new Date().toISOString()
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  }, [channel, addToast]);

  // Setup BroadcastChannel
  useEffect(() => {
    let bc = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      setChannel(bc);

      bc.onmessage = (event) => {
        const { type, payload } = event.data;
        setLastSyncTime(new Date().toLocaleTimeString());

        if (type === 'NEW_BOOKING') {
          setBookings((prev) => [payload, ...prev]);
          addToast('🎉 New Booking Received!', `${payload.user_name} booked ${payload.room_type} at ${payload.hotel_name}`, 'success');
        } else if (type === 'UPDATE_BOOKING_STATUS') {
          setBookings((prev) =>
            prev.map((b) => (b.id === payload.id ? { ...b, status: payload.status, payment_status: payload.payment_status || b.payment_status } : b))
          );
          addToast('🔔 Booking Status Updated', `Booking ${payload.id} changed to "${payload.status}"`, 'info');
        } else if (type === 'NEW_REVIEW') {
          setReviews((prev) => [payload, ...prev]);
          addToast('⭐ New Customer Review!', `${payload.user_name} rated ${payload.rating} stars`, 'success');
        } else if (type === 'HOTEL_UPDATED') {
          setHotels((prev) => prev.map((h) => (h.id === payload.id ? payload : h)));
          addToast('🏨 Hotel Updated', `${payload.name} details have been updated`, 'info');
        } else if (type === 'HOTEL_CREATED') {
          setHotels((prev) => [payload, ...prev]);
          addToast('🏨 New Hotel Added', `${payload.name} is now available`, 'success');
        } else if (type === 'ROOM_CREATED') {
          setRooms((prev) => [payload, ...prev]);
          addToast('🛏️ New Room Listed', `${payload.room_type} in ${payload.hotel_name}`, 'success');
        } else if (type === 'BROADCAST_NOTIFICATION') {
          setNotifications((prev) => [payload, ...prev]);
          addToast(`📢 ${payload.title}`, payload.message, 'warning');
        }
      };
    }

    return () => {
      if (bc) bc.close();
    };
  }, [addToast]);

  // Sync API actions
  const fetchAllData = useCallback(async () => {
    try {
      const [hotelsData, roomsData, bookingsData, reviewsData, notifsData] = await Promise.allSettled([
        hotelApi.getAll(),
        roomApi.getAll(),
        bookingApi.getAll(),
        reviewApi.getAll(),
        notificationApi.getAll()
      ]);

      if (hotelsData.status === 'fulfilled' && Array.isArray(hotelsData.value?.hotels || hotelsData.value)) {
        setHotels(hotelsData.value.hotels || hotelsData.value);
      }
      if (roomsData.status === 'fulfilled' && Array.isArray(roomsData.value?.rooms || roomsData.value)) {
        setRooms(roomsData.value.rooms || roomsData.value);
      }
      if (bookingsData.status === 'fulfilled' && Array.isArray(bookingsData.value?.reservations || bookingsData.value)) {
        setBookings(bookingsData.value.reservations || bookingsData.value);
      }
      if (reviewsData.status === 'fulfilled' && Array.isArray(reviewsData.value?.reviews || reviewsData.value)) {
        setReviews(reviewsData.value.reviews || reviewsData.value);
      }
      if (notifsData.status === 'fulfilled' && Array.isArray(notifsData.value?.notifications || notifsData.value)) {
        setNotifications(notifsData.value.notifications || notifsData.value);
      }
    } catch (err) {
      // Backend api optional offline fallback
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Action Methods
  const createBooking = useCallback(async (bookingData) => {
    const newBooking = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      user_name: bookingData.user_name || 'Valued Guest',
      user_email: bookingData.user_email || 'guest@example.com',
      hotel_id: bookingData.hotel_id,
      hotel_name: bookingData.hotel_name,
      room_id: bookingData.room_id,
      room_type: bookingData.room_type,
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      guests: bookingData.guests || 2,
      total_amount: bookingData.total_amount,
      status: 'Pending',
      payment_status: 'Pending',
      created_at: new Date().toISOString()
    };

    try {
      await bookingApi.create(bookingData);
    } catch (e) {
      // Offline fallback
    }

    setBookings((prev) => [newBooking, ...prev]);

    broadcastEvent('NEW_BOOKING', newBooking, {
      title: '🎉 New Booking Placed',
      message: `Reservation ${newBooking.id} for ${newBooking.hotel_name} received.`,
      type: 'success'
    });

    return newBooking;
  }, [broadcastEvent]);

  const updateBookingStatus = useCallback(async (id, status, payment_status) => {
    try {
      await bookingApi.updateStatus(id, status);
    } catch (e) {
      // Offline fallback
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, payment_status: payment_status || (status === 'Confirmed' ? 'Paid' : b.payment_status) } : b))
    );

    const payload = { id, status, payment_status };
    broadcastEvent('UPDATE_BOOKING_STATUS', payload, {
      title: '🔔 Booking Status Changed',
      message: `Reservation ${id} updated to status "${status}".`,
      type: status === 'Confirmed' ? 'success' : status === 'Cancelled' ? 'warning' : 'info'
    });
  }, [broadcastEvent]);

  const addReview = useCallback(async (reviewData) => {
    const newReview = {
      id: Date.now(),
      user_name: reviewData.user_name || 'Guest User',
      hotel_id: reviewData.hotel_id,
      hotel_name: reviewData.hotel_name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await reviewApi.create(reviewData);
    } catch (e) {}

    setReviews((prev) => [newReview, ...prev]);
    broadcastEvent('NEW_REVIEW', newReview, {
      title: '⭐ New Review Submitted',
      message: `${newReview.user_name} gave ${newReview.rating} stars for ${newReview.hotel_name}.`,
      type: 'success'
    });

    return newReview;
  }, [broadcastEvent]);

  const createHotel = useCallback(async (hotelData) => {
    const newHotel = {
      id: Date.now(),
      ...hotelData,
      rating: hotelData.rating || 4.5,
      available_rooms: hotelData.available_rooms || 10,
      image: hotelData.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    };

    try {
      await hotelApi.create(hotelData);
    } catch (e) {}

    setHotels((prev) => [newHotel, ...prev]);
    broadcastEvent('HOTEL_CREATED', newHotel, {
      title: '🏨 New Hotel Added',
      message: `${newHotel.name} added to the catalog.`,
      type: 'success'
    });
    return newHotel;
  }, [broadcastEvent]);

  const createRoom = useCallback(async (roomData) => {
    const newRoom = {
      id: Date.now(),
      ...roomData,
      status: 'Available',
      image: roomData.image || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    };

    try {
      await roomApi.create(roomData);
    } catch (e) {}

    setRooms((prev) => [newRoom, ...prev]);
    broadcastEvent('ROOM_CREATED', newRoom, {
      title: '🛏️ New Room Added',
      message: `${newRoom.room_type} added for ${newRoom.hotel_name}.`,
      type: 'success'
    });
    return newRoom;
  }, [broadcastEvent]);

  const sendBroadcastNotification = useCallback((title, message) => {
    const payload = {
      id: Date.now(),
      title,
      message,
      type: 'warning',
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications((prev) => [payload, ...prev]);
    broadcastEvent('BROADCAST_NOTIFICATION', payload, { title, message, type: 'warning' });
  }, [broadcastEvent]);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Stats calculation
  const syncStats = useMemo(() => {
    const totalRevenue = bookings
      .filter((b) => b.status === 'Confirmed' || b.payment_status === 'Paid')
      .reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);
    const activeBookingsCount = bookings.filter((b) => b.status === 'Pending' || b.status === 'Confirmed').length;
    const totalHotels = hotels.length;
    const totalRooms = rooms.length;
    const unreadNotifs = notifications.filter((n) => !n.read).length;

    return {
      totalRevenue,
      activeBookingsCount,
      totalBookings: bookings.length,
      totalHotels,
      totalRooms,
      unreadNotifs
    };
  }, [bookings, hotels, rooms, notifications]);

  const value = useMemo(
    () => ({
      hotels,
      rooms,
      bookings,
      reviews,
      notifications,
      toasts,
      syncStats,
      lastSyncTime,
      addToast,
      removeToast,
      createBooking,
      updateBookingStatus,
      addReview,
      createHotel,
      createRoom,
      sendBroadcastNotification,
      markNotificationRead,
      clearNotifications,
      refreshData: fetchAllData
    }),
    [
      hotels,
      rooms,
      bookings,
      reviews,
      notifications,
      toasts,
      syncStats,
      lastSyncTime,
      addToast,
      removeToast,
      createBooking,
      updateBookingStatus,
      addReview,
      createHotel,
      createRoom,
      sendBroadcastNotification,
      markNotificationRead,
      clearNotifications,
      fetchAllData
    ]
  );

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}

export function useSync() {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
}
