export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
  about: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
  hotel1: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  hotel2: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  hotel3: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  room1: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  room2: 'https://images.unsplash.com/photo-1611892440504-42a792e5248b?w=800&q=80',
  room3: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  room4: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
};

export const FEATURED_HOTELS = [
  {
    id: 1,
    name: 'Hotel Yak & Yeti',
    description: 'Experience luxury and tradition in Kathmandu\'s iconic hotel nestled in the heart of the capital.',
    city: 'Kathmandu',
    country: 'Nepal',
    address: 'Durbar Marg, Kathmandu',
    star_rating: 5,
    image: IMAGES.hotel1,
    gallery: [IMAGES.hotel1, IMAGES.about, IMAGES.room1],
    amenities: ['Spa & Wellness', 'Fine Dining', 'Swimming Pool', 'Conference Hall', 'Free WiFi', 'Airport Shuttle'],
    highlights: ['Heritage architecture since 1977', 'Walking distance to royal palace', 'Award-winning restaurants'],
    priceFrom: 12000,
  },
  {
    id: 2,
    name: 'Temple Tree Resort',
    description: 'Relax in the serene beauty of Pokhara with breathtaking Annapurna mountain views.',
    city: 'Pokhara',
    country: 'Nepal',
    address: 'Lakeside, Pokhara',
    star_rating: 4,
    image: IMAGES.hotel2,
    gallery: [IMAGES.hotel2, IMAGES.room2, IMAGES.hero],
    amenities: ['Lake View Terrace', 'Yoga Pavilion', 'Organic Restaurant', 'Bicycle Rental', 'Free WiFi', 'Garden'],
    highlights: ['Panoramic mountain vistas', 'Boutique garden cottages', 'Steps from Phewa Lake'],
    priceFrom: 9500,
  },
  {
    id: 3,
    name: 'Barahi Jungle Lodge',
    description: 'Stay close to nature in Chitwan with thrilling wildlife adventures and eco-luxury.',
    city: 'Chitwan',
    country: 'Nepal',
    address: 'Meghauli, Chitwan National Park',
    star_rating: 5,
    image: IMAGES.hotel3,
    gallery: [IMAGES.hotel3, IMAGES.room3, IMAGES.about],
    amenities: ['Safari Tours', 'Riverside Dining', 'Nature Walks', 'Spa', 'Free WiFi', 'Eco Lodge'],
    highlights: ['UNESCO World Heritage proximity', 'Rhino & tiger spotting', 'Sustainable eco-tourism'],
    priceFrom: 15000,
  },
];

export const ROOMS = [
  {
    id: 1,
    hotelId: 1,
    name: 'Deluxe Room with Mountain View',
    price: 8500,
    maxGuests: 2,
    size: '30 m²',
    view: 'Himalaya View',
    bed: '1 King',
    rating: 5,
    image: IMAGES.room1,
    gallery: [IMAGES.room1, IMAGES.room2, IMAGES.about],
    reverse: false,
    amenities: ['Mountain View', 'Mini Bar', 'Smart TV', 'Rain Shower', 'Coffee Maker', 'Safe'],
    description: 'Wake up to panoramic Himalayan views from your private balcony. This elegantly designed room blends contemporary comfort with Nepali craftsmanship.',
  },
  {
    id: 2,
    hotelId: 1,
    name: 'Traditional Nepali Suite',
    price: 12000,
    maxGuests: 4,
    size: '50 m²',
    view: 'Garden View',
    bed: '2 Queen',
    rating: 5,
    image: IMAGES.room2,
    gallery: [IMAGES.room2, IMAGES.room1, IMAGES.hotel1],
    reverse: false,
    amenities: ['Living Area', 'Bathtub', 'Garden Access', 'Room Service', 'Work Desk', 'Premium Linens'],
    description: 'A spacious suite featuring traditional Nepali woodwork and modern luxury. Perfect for families seeking an authentic cultural experience.',
  },
  {
    id: 3,
    hotelId: 2,
    name: 'Family Room',
    price: 9500,
    maxGuests: 3,
    size: '45 m²',
    view: 'Valley View',
    bed: '1 King + 1 Single',
    rating: 5,
    image: IMAGES.room3,
    gallery: [IMAGES.room3, IMAGES.room4, IMAGES.hotel2],
    reverse: true,
    amenities: ['Valley View', 'Connecting Rooms', 'Kids Amenities', 'Balcony', 'Free WiFi', 'Breakfast'],
    description: 'Designed for families, this room offers ample space and stunning valley views with thoughtful amenities for guests of all ages.',
  },
  {
    id: 4,
    hotelId: 2,
    name: 'Premium Deluxe Room',
    price: 11000,
    maxGuests: 3,
    size: '45 m²',
    view: 'City View',
    bed: '1 King',
    rating: 5,
    image: IMAGES.room4,
    gallery: [IMAGES.room4, IMAGES.room3, IMAGES.hotel2],
    reverse: true,
    amenities: ['City Skyline', 'Executive Lounge', 'Nespresso', 'Marble Bath', 'Pillow Menu', 'Turn-down Service'],
    description: 'Our premium offering with refined finishes, executive lounge access, and sweeping city skyline views from floor-to-ceiling windows.',
  },
];

export const SERVICES = [
  { title: 'Tea & Coffee', description: 'Complimentary premium beverages served throughout your stay.', icon: '☕' },
  { title: 'Hot Showers', description: '24/7 hot water with modern bathroom amenities.', icon: '🚿' },
  { title: 'Laundry', description: 'Same-day laundry and dry-cleaning services available.', icon: '👔' },
  { title: 'Air Conditioning', description: 'Climate-controlled rooms for every season.', icon: '❄️' },
  { title: 'Free WiFi', description: 'High-speed internet across the property.', icon: '📶' },
  { title: 'Kitchen', description: 'In-room kitchenette or full kitchen options.', icon: '🍳' },
  { title: 'Room Service', description: 'Round-the-clock dining delivered to your door.', icon: '🛎️' },
  { title: 'Airport Transfer', description: 'Hassle-free pickup and drop-off arrangements.', icon: '✈️' },
];

export function getHotelById(id) {
  return FEATURED_HOTELS.find((h) => h.id === Number(id));
}

export function getRoomById(id) {
  return ROOMS.find((r) => r.id === Number(id));
}

export function getRoomsByHotel(hotelId) {
  return ROOMS.filter((r) => r.hotelId === Number(hotelId));
}
