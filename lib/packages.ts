export interface Package {
  id: string;
  name: string;
  slug: string;
  destination: string;
  destinationSlug: string;
  duration: string;
  nights: number;
  days: number;
  price: number;
  priceLabel: string;
  image: string;
  includes: string[];
  highlights: string[];
  description: string;
  badge?: string;
}

export const packages: Package[] = [
  {
    id: "kashmir-snow",
    name: "Kashmir Snow Escape",
    slug: "kashmir-snow-escape",
    destination: "Kashmir",
    destinationSlug: "kashmir",
    duration: "6 Days / 5 Nights",
    nights: 5,
    days: 6,
    price: 8000,
    priceLabel: "₹8,000",
    image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=800&q=80",
    includes: ["Flights Included", "Houseboat Stay", "Hotel", "All Meals", "Transfers"],
    highlights: ["Dal Lake Shikara", "Gulmarg Gondola", "Pahalgam Valley", "Mughal Gardens"],
    description: "Experience the magic of Kashmir in winter — frozen lakes, snow-draped Himalayan peaks, and the warm glow of walnut wood houseboats on Dal Lake.",
    badge: "Most Popular",
  },
  {
    id: "bali-soul",
    name: "Bali Soul Journey",
    slug: "bali-soul-journey",
    destination: "Bali",
    destinationSlug: "bali",
    duration: "7 Days / 6 Nights",
    nights: 6,
    days: 7,
    price: 45000,
    priceLabel: "₹45,000",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    includes: ["Flights Included", "Villa Stay", "Breakfast Daily", "Transfers", "Tour Guide"],
    highlights: ["Ubud Rice Terraces", "Mt. Batur Sunrise", "Uluwatu Temple", "Jimbaran Dinner"],
    description: "An immersive Balinese journey blending spiritual temples, active volcano treks, and legendary sunsets over the Indian Ocean.",
    badge: "Bestseller",
  },
  {
    id: "thailand-adventure",
    name: "Thailand Adventure",
    slug: "thailand-adventure",
    destination: "Thailand",
    destinationSlug: "thailand",
    duration: "6 Days / 5 Nights",
    nights: 5,
    days: 6,
    price: 15000,
    priceLabel: "₹15,000",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    includes: ["Flights Included", "Hotel", "Breakfast Daily", "Island Hopping", "Transfers"],
    highlights: ["Phi Phi Islands", "Railay Beach", "Grand Palace", "Muay Thai Show"],
    description: "Bangkok's chaotic beauty, Krabi's limestone karsts, and Phi Phi's crystal waters — Thailand's greatest hits in one perfectly paced package.",
  },
  {
    id: "maldives-luxury",
    name: "Maldives Luxury Retreat",
    slug: "maldives-luxury-retreat",
    destination: "Maldives",
    destinationSlug: "maldives",
    duration: "5 Days / 4 Nights",
    nights: 4,
    days: 5,
    price: 75000,
    priceLabel: "₹75,000",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    includes: ["Flights Included", "Overwater Villa", "Full Board", "Seaplane Transfer", "Diving"],
    highlights: ["Overwater Bungalow", "Bioluminescent Beach", "Reef Diving", "Island Hopping"],
    description: "The ultimate luxury escape — overwater villas, private reefs, and the kind of silence that only 1,200 coral islands in the middle of the Indian Ocean can provide.",
    badge: "Premium",
  },
  {
    id: "wayanad-weekend",
    name: "Wayanad Weekend",
    slug: "wayanad-weekend",
    destination: "Wayanad",
    destinationSlug: "wayanad",
    duration: "2 Days / 1 Night",
    nights: 1,
    days: 2,
    price: 500,
    priceLabel: "₹500",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    includes: ["Jungle Resort", "Breakfast & Dinner", "Forest Safari", "Transfers"],
    highlights: ["Soochipara Falls", "Wildlife Safari", "Edakkal Caves", "Spice Walk"],
    description: "A perfect quick escape from Kochi into the misty forests of Wayanad — waterfalls, wildlife, and tribal heritage in just 2 days.",
    badge: "Best Value",
  },
  {
    id: "vietnam-explorer",
    name: "Vietnam Explorer",
    slug: "vietnam-explorer",
    destination: "Vietnam",
    destinationSlug: "vietnam",
    duration: "8 Days / 7 Nights",
    nights: 7,
    days: 8,
    price: 12000,
    priceLabel: "₹12,000",
    image: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&q=80",
    includes: ["Flights Included", "Hotel", "Ha Long Bay Cruise", "Breakfast Daily", "Transfers"],
    highlights: ["Ha Long Bay Cruise", "Hoi An Lanterns", "Cu Chi Tunnels", "Street Food Tour"],
    description: "From Hanoi's ancient streets to Ha Long Bay's jade waters and Hoi An's lantern-lit Old Town — an 8-day sweep of Vietnam's most iconic experiences.",
  },
];
