import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

export default function RoomCard({ room, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: room.reverse ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-100/50 md:flex-row ${room.reverse ? 'md:flex-row-reverse' : ''}`}
    >
      <Link
        to={`/rooms/${room.id}`}
        className="relative block h-72 w-full overflow-hidden md:h-auto md:w-1/2"
      >
        <div
          className="image-zoom h-full min-h-[280px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${room.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {room.price && (
          <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-2 backdrop-blur-sm shadow-lg">
            <span className="text-lg font-bold gradient-text">Rs {room.price.toLocaleString()}</span>
            <span className="ml-1 text-xs text-slate-500">/ night</span>
          </div>
        )}
      </Link>

      <div className="relative flex w-full items-center justify-center bg-gradient-to-br from-white to-primary-50/30 p-8 md:w-1/2">
        <div className="text-center">
          <StarRating rating={room.rating} />
          <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900">{room.name}</h3>
          <ul className="mt-5 inline-grid grid-cols-2 gap-x-8 gap-y-2 text-left text-sm text-slate-600">
            <li><span className="font-medium text-primary-700">Max:</span> {room.maxGuests} Guests</li>
            <li><span className="font-medium text-primary-700">Size:</span> {room.size}</li>
            <li><span className="font-medium text-primary-700">View:</span> {room.view}</li>
            <li><span className="font-medium text-primary-700">Bed:</span> {room.bed}</li>
          </ul>
          <Link
            to={`/rooms/${room.id}`}
            className="btn-primary mt-6 !text-xs !py-2.5"
          >
            Explore Room →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
