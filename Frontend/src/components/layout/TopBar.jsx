export default function TopBar() {
  return (
    <div className="hidden md:block bg-primary-900 text-primary-100 text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
        <p>
          <span className="text-primary-300">Phone:</span>{' '}
          <a href="tel:+9771234567" className="hover:text-white transition">+977 1 234 567</a>
          <span className="mx-3 text-primary-700">|</span>
          <span className="text-primary-300">Email:</span>{' '}
          <a href="mailto:info@nepalhotels.com" className="hover:text-white transition">info@nepalhotels.com</a>
        </p>
        <div className="flex items-center gap-3">
          {['Facebook', 'Twitter', 'Instagram'].map((social) => (
            <a
              key={social}
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-xs hover:bg-primary-700 transition"
              aria-label={social}
            >
              {social[0]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
