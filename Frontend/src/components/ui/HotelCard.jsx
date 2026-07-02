import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScaleOnHover } from './Animate';

export default function HotelCard({ hotel, index = 0 }) {
  return (
    <ScaleOnHover>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/60 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary-200/40"
      >
        <Link to={`/hotels/${hotel.id}`} className="block">
          <div className="relative h-56 overflow-hidden">
            <div
              className="image-zoom h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${hotel.image || hotel.image_url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
            {hotel.star_rating && (
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-accent-600 backdrop-blur-sm">
                {'★'.repeat(hotel.star_rating)}
              </span>
            )}
            {hotel.priceFrom && (
              <span className="absolute bottom-4 left-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                From Rs {hotel.priceFrom.toLocaleString()}
              </span>
            )}
          </div>

          <div className="relative p-6">
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
            <h3 className="font-display text-xl font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
              {hotel.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">{hotel.description}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {hotel.city}{hotel.country ? `, ${hotel.country}` : ''}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 group-hover:gap-3 transition-all">
              View Details
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>
      </motion.article>
    </ScaleOnHover>
  );
}
