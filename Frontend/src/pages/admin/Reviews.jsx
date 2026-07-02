import { useCallback, useEffect, useState } from 'react';
import { reviewApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function Reviews() {
  const { isAdmin } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await reviewApi.getAll();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleDelete = async (id) => {
    if (!isAdmin || !window.confirm('Delete this review?')) return;
    try {
      await reviewApi.delete(id);
      loadReviews();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'all') return true;
    return filter === 'approved' ? review.approved : !review.approved;
  });

  const renderStars = (rating) => {
    return '★'.repeat(rating || 0) + '☆'.repeat(5 - (rating || 0));
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
          <p className="text-sm text-slate-500">Moderate guest reviews and ratings</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field !py-2"
          >
            <option value="all">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading reviews...</p>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="card-surface p-6 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent-500 text-lg">{renderStars(review.rating)}</span>
                    <span className="text-sm font-medium text-slate-700">{review.rating}/5</span>
                    {review.approved !== undefined && (
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          review.approved
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-800 font-medium mb-1">
                    {review.user_name || review.author || 'Anonymous'}
                  </p>
                  <p className="text-slate-600 text-sm mb-3">{review.comment || review.content}</p>
                  <p className="text-xs text-slate-400">
                    Hotel: {review.hotel_name || review.hotel_id || 'Unknown'} •{' '}
                    {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Unknown date'}
                  </p>
                </div>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(review.id)}
                      className="text-red-600 hover:text-red-500 font-medium text-xs"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filteredReviews.length === 0 && (
            <div className="card-surface p-12 text-center">
              <p className="text-slate-500">No reviews found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
