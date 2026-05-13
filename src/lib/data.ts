export const categories = [
  {
    id: 1,
    name: 'Accessories',
    slug: 'accessories',
    description: 'Elevate your style',
    productCount: 48,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'Home & Living',
    slug: 'home',
    description: 'Design your space',
    productCount: 36,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Premium tech essentials',
    productCount: 24,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Curated for you',
    productCount: 52,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Aurora Cashmere Overcoat',
    price: 489,
    originalPrice: 720,
    rating: 4.8,
    reviews: 312,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear',
    isNew: true,
    description:
      'An impossibly soft cashmere blend overcoat tailored in Italy. A modern silhouette with a relaxed shoulder and clean drape — the kind of piece that defines a wardrobe.'
  },
  {
    id: 2,
    name: 'Monolith Leather Tote',
    price: 320,
    originalPrice: 420,
    rating: 4.9,
    reviews: 521,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    category: 'Bags',
    description:
      'Vegetable-tanned full-grain leather, hand-stitched edges, and a structured silhouette that softens beautifully with use.'
  },
  {
    id: 3,
    name: 'Equinox Minimalist Watch',
    price: 245,
    rating: 4.7,
    reviews: 189,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    isNew: true,
    description:
      'Brushed stainless steel case, sapphire crystal, and a Japanese quartz movement. Designed to disappear on the wrist.'
  },
  {
    id: 4,
    name: 'Atelier Loafer — Cognac',
    price: 295,
    originalPrice: 380,
    rating: 4.6,
    reviews: 142,
    image:
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    category: 'Footwear',
    description:
      'Hand-lasted in Portugal from supple Italian calfskin. The silhouette is timeless, the comfort is immediate.'
  },
  {
    id: 5,
    name: 'Noir Wool Knit Sweater',
    price: 180,
    rating: 4.5,
    reviews: 86,
    image:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    category: 'Knitwear',
    description:
      'A heavyweight merino knit with a relaxed fit and ribbed details. Built for cold mornings and quiet nights.'
  },
  {
    id: 6,
    name: 'Linen Tailored Trousers',
    price: 165,
    originalPrice: 220,
    rating: 4.4,
    reviews: 73,
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    category: 'Trousers',
    description:
      'European linen, half-elastic waistband, and a softly tapered leg. Effortless across seasons.'
  },
  {
    id: 7,
    name: 'Slate Sunglasses 02',
    price: 145,
    rating: 4.7,
    reviews: 211,
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    isNew: true,
    description:
      'Hand-polished acetate frames with polarized Zeiss lenses. A confident, modern silhouette.'
  },
  {
    id: 8,
    name: 'Heritage Denim — Indigo',
    price: 210,
    rating: 4.8,
    reviews: 402,
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    category: 'Denim',
    description:
      '13.5oz Japanese selvedge denim with a high rise and straight leg. Made to age with character.'
  }
];
export const productCategories = [
  'All',
  'Accessories',
  'Watches',
  'Eyewear',
  'Electronics',
  'Home',
  'Kitchen',
  'Lighting'
];

export const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' }
];

export const priceRanges = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $300', min: 200, max: 300 },
  { label: 'Over $300', min: 300, max: Infinity }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content:
      "The quality of products from Luxe is unmatched. Every piece I've purchased feels premium and timeless. Their attention to detail is remarkable.",
    rating: 5
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content:
      'Finally found a brand that understands minimalist design without compromising on functionality. The customer service is exceptional too.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content:
      'I recommend Luxe to all my clients. The products seamlessly blend into any interior while making a subtle statement. Pure elegance.',
    rating: 5
  }
];

export const features = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'On orders over $100',
    icon: 'truck'
  },
  {
    id: 2,
    title: 'Premium Quality',
    description: 'Handcrafted with care',
    icon: 'gem'
  },
  {
    id: 3,
    title: '2-Year Warranty',
    description: 'We stand behind our products',
    icon: 'shield'
  },
  {
    id: 4,
    title: '24/7 Support',
    description: 'Always here to help',
    icon: 'headphones'
  }
];

export const navLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/#categories' },
  { name: 'About', href: '/#features' },
  { name: 'Reviews', href: '/#testimonials' }
];
