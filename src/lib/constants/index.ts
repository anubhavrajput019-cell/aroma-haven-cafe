// ============================================================
// AROMA HAVEN CAFÉ — Application Constants
// ============================================================

// ── Brand ───────────────────────────────────────────────────

export const BRAND = {
  name: 'Aroma Haven Café',
  tagline: 'Served With Love & Quality !!',
  owner: 'Anubhav Rajput',
  phone: '+91 9229310610',
  whatsapp: '+91 9229310610',
  email: 'Anubhavrajput@aromahavencafe.com',
  location: 'Motihari, Bihar, India',
  hours: '24 × 7',
  currency: 'INR',
  currencySymbol: '₹',
} as const;

// ── Business Rules ──────────────────────────────────────────

export const DEFAULTS = {
  gstRate: 0.05, // 5% — configurable
  deliveryFee: 30, // ₹30 — configurable
  freeDeliveryThreshold: 299, // ₹299 — configurable
  deliveryArea: 'Motihari',
  tipOptions: [0, 10, 20, 50] as const,
  totalTables: 12,
  passwordMinLength: 12,
} as const;

// ── Rewards ─────────────────────────────────────────────────

export const REWARDS = {
  pointsPerRupee: 0.1, // 1 point per ₹10
  pointsRedemptionValue: 0.1, // 100 points = ₹10
  tiers: {
    bronze: { name: 'Bronze', threshold: 0, multiplier: 1 },
    silver: { name: 'Silver', threshold: 500, multiplier: 1.5 },
    gold: { name: 'Gold', threshold: 1500, multiplier: 2 },
  },
  goldFreeDelivery: true,
} as const;

// ── Order Statuses ──────────────────────────────────────────

export const ORDER_STATUS_FLOW = [
  { key: 'pending', label: 'Order Received', icon: 'ClipboardCheck' },
  { key: 'confirmed', label: 'Kitchen Confirmed', icon: 'ChefHat' },
  { key: 'preparing', label: 'Being Prepared', icon: 'Flame' },
  { key: 'quality_check', label: 'Quality Check', icon: 'ShieldCheck' },
  { key: 'ready', label: 'Ready', icon: 'PackageCheck' },
  { key: 'completed', label: 'Completed', icon: 'CircleCheck' },
] as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Order Received',
  confirmed: 'Kitchen Confirmed',
  preparing: 'Being Prepared',
  quality_check: 'Quality Check',
  ready: 'Ready',
  out_for_delivery: 'Out for Delivery',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

// ── Payment Methods ─────────────────────────────────────────

export const PAYMENT_METHODS = [
  { key: 'upi', label: 'UPI', mode: 'demo' as const, icon: 'Smartphone' },
  { key: 'card', label: 'Card', mode: 'demo' as const, icon: 'CreditCard' },
  { key: 'netbanking', label: 'Net Banking', mode: 'demo' as const, icon: 'Building' },
  { key: 'cash', label: 'Cash at Café', mode: 'live' as const, icon: 'Banknote' },
  { key: 'pay_on_delivery', label: 'Pay on Delivery', mode: 'live' as const, icon: 'HandCoins' },
] as const;

// ── Spice Levels ────────────────────────────────────────────

export const SPICE_LEVELS = [
  { key: 'none', label: 'No Spice', emoji: '' },
  { key: 'mild', label: 'Mild', emoji: '🌶️' },
  { key: 'medium', label: 'Medium', emoji: '🌶️🌶️' },
  { key: 'hot', label: 'Hot', emoji: '🌶️🌶️🌶️' },
  { key: 'extra_hot', label: 'Extra Hot', emoji: '🌶️🌶️🌶️🌶️' },
] as const;

// ── Menu Categories ─────────────────────────────────────────

export const MENU_CATEGORIES = [
  'Breakfast',
  'Coffee',
  'Tea',
  'Cold Coffee',
  'Shakes',
  'Mocktails',
  'Fresh Juices',
  'Pizza',
  'Pasta',
  'Burgers',
  'Sandwiches',
  'Fries',
  'Snacks',
  'Desserts',
  'Cakes',
  'Combos',
  'Specials',
] as const;

// ── Dining Modes ────────────────────────────────────────────

export const DINING_MODES = [
  { key: 'dine_in', label: 'Dine In', icon: 'UtensilsCrossed', description: 'Enjoy at our café' },
  { key: 'takeaway', label: 'Takeaway', icon: 'ShoppingBag', description: 'Pick up at the counter' },
  { key: 'delivery', label: 'Delivery', icon: 'Truck', description: 'Delivered to your door' },
] as const;

// ── Prep Time Defaults (minutes) ────────────────────────────

export const PREP_TIMES: Record<string, { min: number; max: number }> = {
  Coffee: { min: 5, max: 8 },
  Tea: { min: 4, max: 6 },
  'Cold Coffee': { min: 5, max: 8 },
  Shakes: { min: 5, max: 8 },
  Mocktails: { min: 5, max: 8 },
  'Fresh Juices': { min: 4, max: 7 },
  Breakfast: { min: 8, max: 15 },
  Pizza: { min: 15, max: 20 },
  Pasta: { min: 12, max: 18 },
  Burgers: { min: 10, max: 15 },
  Sandwiches: { min: 8, max: 12 },
  Fries: { min: 6, max: 10 },
  Snacks: { min: 5, max: 10 },
  Desserts: { min: 3, max: 7 },
  Cakes: { min: 3, max: 5 },
  Combos: { min: 12, max: 20 },
  Specials: { min: 10, max: 20 },
};

// ── Review Ratings ──────────────────────────────────────────

export const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

// ── Message / Contact Statuses ──────────────────────────────

export const MESSAGE_STATUSES = [
  { key: 'new', label: 'New', color: 'info' },
  { key: 'read', label: 'Read', color: 'warning' },
  { key: 'responded', label: 'Responded', color: 'success' },
  { key: 'archived', label: 'Archived', color: 'tertiary' },
] as const;

// ── Navigation ──────────────────────────────────────────────

export const CUSTOMER_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: 'Orders', href: '/admin/orders', icon: 'ClipboardList' },
  { label: 'Menu', href: '/admin/menu', icon: 'UtensilsCrossed' },
  { label: 'Customers', href: '/admin/customers', icon: 'Users' },
  { label: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
  { label: 'Coupons', href: '/admin/coupons', icon: 'Ticket' },
  { label: 'Reviews', href: '/admin/reviews', icon: 'Star' },
  { label: 'Messages', href: '/admin/messages', icon: 'MessageSquare' },
  { label: 'Availability', href: '/admin/availability', icon: 'ToggleLeft' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
  { label: 'Activity Log', href: '/admin/audit', icon: 'ScrollText' },
] as const;

// ── Social Links ────────────────────────────────────────────

export const SOCIAL_LINKS = [
  { name: 'Instagram', icon: 'Instagram', comingSoon: true },
  { name: 'Facebook', icon: 'Facebook', comingSoon: true },
  { name: 'Twitter', icon: 'Twitter', comingSoon: true },
  { name: 'YouTube', icon: 'Youtube', comingSoon: true },
] as const;
