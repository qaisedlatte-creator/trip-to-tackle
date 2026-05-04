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
  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];
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
    price: 17500,
    priceLabel: "₹17,500",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80",
    includes: ["Flights from Hyderabad", "Houseboat Stay", "Hotel", "All Meals", "Transfers"],
    highlights: ["Dal Lake Shikara", "Gulmarg Gondola", "Pahalgam Valley", "Mughal Gardens"],
    description: "Experience the magic of Kashmir in winter — frozen lakes, snow-draped Himalayan peaks, and the warm glow of walnut wood houseboats on Dal Lake.",
    badge: "Most Popular",
    itinerary: [
      { day: 1, title: "Fly to Srinagar and settle into Dal Lake", description: "Depart from Hyderabad/Vijayawada. Arrive in Srinagar, board your houseboat on Dal Lake, enjoy kahwa on deck, and take an evening Shikara ride at sunset." },
      { day: 2, title: "Discover Srinagar's heritage and gardens", description: "Visit the Mughal Gardens, Shankaracharya Temple, and old city markets before a traditional Kashmiri dinner." },
      { day: 3, title: "Gulmarg gondola and snow experiences", description: "Drive to Gulmarg for the gondola ride, meadow views, and snow activities depending on the season." },
      { day: 4, title: "Scenic transfer to Pahalgam", description: "Travel through saffron fields to Pahalgam, check in, and enjoy a relaxed riverside evening in the valley." },
      { day: 5, title: "Explore Betaab and Aru Valleys", description: "Spend the day around Betaab Valley, Aru Valley, and Lidder viewpoints with plenty of time for photos and local snacks." },
      { day: 6, title: "Morning shopping and departure", description: "Pick up saffron, walnut crafts, or pashmina shawls before your airport transfer for the journey home." },
    ],
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
    price: 54000,
    priceLabel: "₹54,000",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    includes: ["Flights Included", "Villa Stay", "Breakfast Daily", "Transfers", "Tour Guide"],
    highlights: ["Ubud Rice Terraces", "Mt. Batur Sunrise", "Uluwatu Temple", "Jimbaran Dinner"],
    description: "An immersive Balinese journey blending spiritual temples, active volcano treks, and legendary sunsets over the Indian Ocean.",
    badge: "Bestseller",
    itinerary: [
      { day: 1, title: "Arrive in Bali and unwind by the coast", description: "Airport pickup, villa check-in, and a soft landing evening around Seminyak with beachside dining." },
      { day: 2, title: "Ubud art, temples, and rice terraces", description: "Visit Tegalalang, Tirta Empul, and Ubud's craft quarters for a deep first taste of Balinese culture." },
      { day: 3, title: "Mount Batur sunrise trek", description: "Early departure for the volcano hike, sunrise views from the summit, and a slow recovery brunch afterward." },
      { day: 4, title: "Waterfalls and jungle swing moments", description: "Spend the day around central Bali waterfalls, scenic cafes, and iconic jungle viewpoints." },
      { day: 5, title: "Uluwatu cliffs and Kecak performance", description: "Head south for the cliffside temple, sea views, the Kecak dance, and dinner at Jimbaran Bay." },
      { day: 6, title: "Leisure day for beach clubs or Nusa Dua", description: "Use the day for water sports, spa time, or simply a slower pace on Bali's southern beaches." },
      { day: 7, title: "Tanah Lot sunrise and departure", description: "Catch one last temple view, finish souvenir shopping, and transfer to the airport for departure." },
    ],
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
    price: 29500,
    priceLabel: "₹29,500",
    image: "https://images.unsplash.com/photo-1519177025083-0d8d6a571ee2?w=800&q=80",
    includes: ["Flights Included", "Hotel", "Breakfast Daily", "Island Hopping", "Transfers"],
    highlights: ["Phi Phi Islands", "Railay Beach", "Grand Palace", "Muay Thai Show"],
    description: "Bangkok's chaotic beauty, Krabi's limestone karsts, and Phi Phi's crystal waters — Thailand's greatest hits in one perfectly paced package.",
    itinerary: [
      { day: 1, title: "Arrive in Bangkok", description: "Transfer to the hotel, freshen up, and head out for a relaxed evening along the river or local night market." },
      { day: 2, title: "Bangkok temples and city highlights", description: "Cover the Grand Palace, Wat Pho, canal views, and a guided walk through the city's busiest cultural pockets." },
      { day: 3, title: "Fly south to Krabi", description: "Morning transfer to the airport, flight to Krabi, and sunset time around Ao Nang or Railay Beach." },
      { day: 4, title: "Island hopping adventure", description: "Set out by boat to Hong Island, Chicken Island, and nearby lagoons for swimming, snorkeling, and beach time." },
      { day: 5, title: "Phi Phi day trip and nightlife", description: "Cruise to Phi Phi for dramatic cliffs and clear water, then return for a Thai massage or Muay Thai show." },
      { day: 6, title: "Free morning and departure", description: "Enjoy a final slow breakfast and some shopping before airport transfer for your return journey." },
    ],
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
    price: 89000,
    priceLabel: "₹89,000",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    includes: ["Flights Included", "Overwater Villa", "Full Board", "Seaplane Transfer", "Diving"],
    highlights: ["Overwater Bungalow", "Bioluminescent Beach", "Reef Diving", "Island Hopping"],
    description: "The ultimate luxury escape — overwater villas, private reefs, and the kind of silence that only 1,200 coral islands in the middle of the Indian Ocean can provide.",
    badge: "Premium",
    itinerary: [
      { day: 1, title: "Arrive in Malé and transfer to your resort", description: "Land in the Maldives, take the seaplane or speedboat to your island, and settle into your overwater villa." },
      { day: 2, title: "House reef and ocean activities", description: "Spend the day snorkeling the house reef, trying paddle sports, and enjoying a sunset cruise." },
      { day: 3, title: "Diving and marine exploration", description: "Join a guided dive or beginner session, then relax with spa time and a beachside dinner." },
      { day: 4, title: "Island hopping and sandbank picnic", description: "Visit a local island, experience Maldivian life, and enjoy a private sandbank stop in crystal-clear waters." },
      { day: 5, title: "Slow morning and departure", description: "Enjoy one last breakfast over the lagoon before your transfer back to the airport." },
    ],
  },
  {
    id: "wayanad-weekend",
    name: "Wayanad Weekend",
    slug: "wayanad-weekend",
    destination: "Wayanad",
    destinationSlug: "wayanad",
    duration: "3 Days / 2 Nights",
    nights: 2,
    days: 3,
    price: 5500,
    priceLabel: "₹5,500",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    includes: ["Jungle Resort", "Breakfast & Dinner", "Forest Safari", "Transfers from AP"],
    highlights: ["Soochipara Falls", "Wildlife Safari", "Edakkal Caves", "Spice Walk"],
    description: "A perfect escape from Vijayawada or Hyderabad into the misty forests of Wayanad — waterfalls, wildlife, and tribal heritage in a relaxed 3-day group format.",
    badge: "Best Value",
    itinerary: [
      { day: 1, title: "Drive into the hills and chase waterfalls", description: "Depart early from AP. Arrive in Wayanad, check in to the resort, visit Soochipara Falls, and end with a campfire dinner." },
      { day: 2, title: "Safari, caves, and nature", description: "Start with an early wildlife safari, continue to Edakkal Caves and a spice walk through plantations." },
      { day: 3, title: "Scenic morning and return", description: "Morning at leisure, local market visit, and departure transfer back to Andhra Pradesh." },
    ],
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
    price: 46000,
    priceLabel: "₹46,000",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
    includes: ["Flights Included", "Hotel", "Ha Long Bay Cruise", "Breakfast Daily", "Transfers"],
    highlights: ["Ha Long Bay Cruise", "Hoi An Lanterns", "Cu Chi Tunnels", "Street Food Tour"],
    description: "From Hanoi's ancient streets to Ha Long Bay's jade waters and Hoi An's lantern-lit Old Town — an 8-day sweep of Vietnam's most iconic experiences.",
    itinerary: [
      { day: 1, title: "Arrive in Hanoi", description: "Transfer to the Old Quarter, settle in, and enjoy a gentle evening walk around Hoan Kiem Lake." },
      { day: 2, title: "Hanoi culture and street food", description: "Visit the Temple of Literature, key city landmarks, and finish with a guided street food crawl." },
      { day: 3, title: "Ha Long Bay overnight cruise", description: "Drive to the bay, board the cruise, kayak through limestone scenery, and stay overnight on the water." },
      { day: 4, title: "Cruise morning and transfer to Hoi An", description: "Wrap up the cruise, return to the airport, and fly south before a lantern-lit evening in Hoi An." },
      { day: 5, title: "Hoi An old town and countryside", description: "Explore heritage lanes, local markets, and nearby village experiences with free time for tailoring." },
      { day: 6, title: "Da Nang and Ba Na Hills", description: "Spend the day around the Golden Bridge, hilltop attractions, and the coast near Da Nang." },
      { day: 7, title: "Fly to Ho Chi Minh City", description: "Head south for a faster-paced city day covering key historical sights and the Cu Chi Tunnels." },
      { day: 8, title: "Departure from Vietnam", description: "Enjoy a final breakfast, pick up any last gifts, and transfer to the airport for your flight home." },
    ],
  },
];
