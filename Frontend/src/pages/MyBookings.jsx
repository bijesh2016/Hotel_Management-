import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSync } from '../context/SyncContext';
import { useAuth } from '../context/AuthContext';
import PageHero from '../components/layout/PageHero';

export default function MyBookings() {
  const { bookings, updateBookingStatus, addReview } = useSync();
  const { user } = useAuth();
  
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Filter bookings for user or show demo user bookings
  const userBookings = bookings.filter(
    (b) => b.user_email === user?.email || user?.role === 'admin' || !user?.email
  );

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      updateBookingStatus(bookingId, 'Cancelled');
    }
  };

  const handlePayNow = (bookingId) => {
    updateBookingStatus(bookingId, 'Confirmed', 'Paid');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!selectedBookingForReview || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    await addReview({
      user_name: user?.full_name || selectedBookingForReview.user_name || 'Valued Guest',
      hotel_id: selectedBookingForReview.hotel_id,
      hotel_name: selectedBookingForReview.hotel_name,
      rating: reviewRating,
      comment: reviewComment
    });

    setIsSubmittingReview(false);
    setSelectedBookingForReview(null);
    setReviewComment('');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHero
        title="My Reservations & Travel Hub"
        subtitle="Track live booking confirmations, pay invoices, and manage your luxury stays."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-xl border border-slate-100 mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Active Stays</h2>
            <p className="text-sm text-slate-500 mt-1">Real-time status synced directly with resort front desk.</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200/50 text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            Live Sync Connected
          </div>
        </div>

        {userBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="text-5xl mb-4">🧳</div>
            <h3 className="text-xl font-bold text-slate-800">No active bookings found</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">Explore our premium selection of luxury Himalayan hotels and book your dream stay.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {userBookings.map((b, index) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-primary-200 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg shadow-primary-700/20">
                      🏨
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{b.id}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : b.status === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                          }`}
                        >
                          ● {b.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${b.payment_status === 'Paid' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                          Payment: {b.payment_status || 'Pending'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{b.hotel_name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{b.room_type}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total Investment</div>
                    <div className="text-3xl font-extrabold text-slate-900">${b.total_amount}</div>
                    <div className="text-xs text-slate-500 mt-1">{b.guests} Guests</div>
                  </div>
                </div>

                {/* Timeline info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 text-sm">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400">Check In</div>
                    <div className="font-bold text-slate-800 mt-1">📅 {b.check_in}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400">Check Out</div>
                    <div className="font-bold text-slate-800 mt-1">📅 {b.check_out}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400">Guest Name</div>
                    <div className="font-bold text-slate-800 mt-1 truncate">👤 {b.user_name}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400">Live Status</div>
                    <div className="font-bold text-primary-700 mt-1">
                      {b.status === 'Confirmed' ? 'Ready for Check-In' : b.status === 'Pending' ? 'Awaiting Admin Approval' : 'Cancelled'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  {b.status === 'Pending' && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm font-semibold transition"
                    >
                      Cancel Booking
                    </button>
                  )}

                  {b.payment_status !== 'Paid' && b.status !== 'Cancelled' && (
                    <button
                      onClick={() => handlePayNow(b.id)}
                      className="btn-accent py-2.5 px-6 text-sm font-semibold shadow-md"
                    >
                      💳 Pay Now (${b.total_amount})
                    </button>
                  )}

                  {b.status === 'Confirmed' && (
                    <button
                      onClick={() => setSelectedBookingForReview(b)}
                      className="btn-primary py-2.5 px-6 text-sm font-semibold shadow-md"
                    >
                      ⭐ Leave Review
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Review Modal */}
        <AnimatePresence>
          {selectedBookingForReview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedBookingForReview(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 text-lg"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold text-slate-900">Review Your Stay</h3>
                <p className="text-sm text-slate-500 mt-1">{selectedBookingForReview.hotel_name}</p>

                <form onSubmit={handleSubmitReview} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`text-3xl transition ${star <= reviewRating ? 'text-amber-400 scale-110' : 'text-slate-200'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Your Experience</label>
                    <textarea
                      rows={4}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Tell us about the hospitality, view, room quality, and amenities..."
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedBookingForReview(null)}
                      className="px-5 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmittingReview} className="btn-primary">
                      {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
