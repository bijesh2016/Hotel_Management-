import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="font-display text-xl font-bold text-white">Nepal Hotels</h3>
          <p className="mt-4 text-sm leading-relaxed text-primary-200">
            Discover exceptional hospitality across Nepal. From Kathmandu heritage stays to Pokhara lakeside retreats.
          </p>
          <Link to="/about" className="mt-4 inline-flex items-center text-sm text-accent-400 hover:text-accent-300">
            Read more →
          </Link>
        </div>

        <div>
          <h4 className="font-semibold text-white">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-200">
            <li><Link to="/services" className="hover:text-white">Accommodation</Link></li>
            <li><Link to="/rooms" className="hover:text-white">Room Booking</Link></li>
            <li><Link to="/contact" className="hover:text-white">Concierge</Link></li>
            <li><Link to="/contact" className="hover:text-white">Airport Transfer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Explore</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Kathmandu', 'Pokhara', 'Chitwan', 'Lumbini', 'Nagarkot'].map((tag) => (
              <span key={tag} className="rounded-full bg-primary-800 px-3 py-1 text-xs text-primary-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white">Newsletter</h4>
          <p className="mt-4 text-sm text-primary-200">Get deals and travel tips for Nepal.</p>
          <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-l-lg border-0 bg-primary-800 px-4 py-2.5 text-sm text-white placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button type="submit" className="rounded-r-lg bg-accent-500 px-4 text-white hover:bg-accent-600 transition">
              →
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-primary-300 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Nepal Hotels. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
