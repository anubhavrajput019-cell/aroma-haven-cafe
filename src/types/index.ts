// ============================================================
// AROMA HAVEN CAFÉ — Core Type Definitions
// ============================================================

// ── Menu & Products ─────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  image_url: string;
  base_price: number;
  is_available: boolean;
  is_featured: boolean;
  is_todays_special: boolean;
  special_price: number | null;
  prep_time_min: number;
  prep_time_max: number;
  spice_level: SpiceLevel | null;
  is_vegetarian: boolean;
  is_vegan: boolean;
  dietary_info: string[];
  ingredients: string[];
  tags: string[];
  display_order: number;
  avg_rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  // Relations
  category?: Category;
  variants?: ProductVariant[];
  add_ons?: AddOn[];
  reviews?: Review[];
}

export type SpiceLevel = 'none' | 'mild' | 'medium' | 'hot' | 'extra_hot';

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string; // e.g., "Small", "Regular", "Large"
  price_adjustment: number; // amount added to base_price
  is_default: boolean;
  is_available: boolean;
  display_order: number;
}

export interface AddOn {
  id: string;
  product_id: string | null; // null = available for all products in category
  category_id: string | null;
  name: string; // e.g., "Extra Shot", "Oat Milk"
  price: number;
  is_available: boolean;
  display_order: number;
}

// ── Cart ────────────────────────────────────────────────────

export interface CartItem {
  id: string; // unique cart item ID
  product: Product;
  variant: ProductVariant | null;
  add_ons: AddOn[];
  quantity: number;
  spice_level: SpiceLevel | null;
  special_instructions: string;
  unit_price: number; // calculated: base + variant adjustment + add-ons
  total_price: number; // unit_price × quantity
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  coupon: AppliedCoupon | null;
  gst: number;
  gst_rate: number;
  delivery_fee: number;
  tip: number;
  grand_total: number;
  dining_mode: DiningMode;
  item_count: number;
}

export type DiningMode = 'dine_in' | 'takeaway' | 'delivery';

// ── Orders ──────────────────────────────────────────────────

export interface Order {
  id: string;
  order_number: string; // e.g., "AH-1001"
  customer_id: string | null; // null for guest orders
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  dining_mode: DiningMode;
  table_number: number | null;
  delivery_address: string | null;
  delivery_instructions: string | null;
  pickup_time: string | null;
  special_instructions: string | null;
  subtotal: number;
  discount: number;
  coupon_id: string | null;
  coupon_code: string | null;
  gst_rate: number;
  gst_amount: number;
  delivery_fee: number;
  tip: number;
  grand_total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_reference: string | null;
  status: OrderStatus;
  estimated_time: number | null; // minutes
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  items?: OrderItem[];
  status_history?: OrderStatusEntry[];
  customer?: UserProfile;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  variant_name: string | null;
  add_on_names: string[];
  spice_level: SpiceLevel | null;
  special_instructions: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'quality_check'
  | 'ready'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export type PaymentMethod =
  | 'upi'
  | 'card'
  | 'netbanking'
  | 'cash'
  | 'pay_on_delivery';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'demo';

export interface OrderStatusEntry {
  id: string;
  order_id: string;
  status: OrderStatus;
  note: string | null;
  created_by: string | null;
  created_at: string;
}

// ── Users & Auth ────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Relations
  addresses?: Address[];
  reward_balance?: RewardBalance;
}

export type UserRole = 'customer' | 'admin';

export interface Address {
  id: string;
  user_id: string;
  label: string; // "Home", "Work", etc.
  full_address: string;
  landmark: string | null;
  city: string;
  pincode: string;
  is_default: boolean;
  is_within_delivery_area: boolean;
  created_at: string;
}

// ── Coupons ─────────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  valid_from: string;
  valid_until: string;
  usage_limit: number | null;
  times_used: number;
  per_customer_limit: number;
  applicable_categories: string[]; // empty = all
  applicable_products: string[]; // empty = all
  is_active: boolean;
  created_at: string;
}

export interface AppliedCoupon {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  calculated_discount: number;
}

// ── Reviews ─────────────────────────────────────────────────

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  order_id: string;
  rating: number; // 1-5
  comment: string;
  images: string[];
  is_verified_purchase: boolean;
  status: ReviewStatus;
  admin_response: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  customer?: Pick<UserProfile, 'full_name' | 'avatar_url'>;
  product?: Pick<Product, 'name' | 'slug'>;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

// ── Rewards ─────────────────────────────────────────────────

export type RewardTier = 'bronze' | 'silver' | 'gold';

export interface RewardBalance {
  user_id: string;
  redeemable_points: number;
  lifetime_points: number;
  tier: RewardTier;
  earn_multiplier: number;
  updated_at: string;
}

export interface RewardTransaction {
  id: string;
  user_id: string;
  order_id: string | null;
  type: 'earned' | 'redeemed' | 'expired' | 'adjustment';
  points: number;
  description: string;
  created_at: string;
}

// ── Tables (Dine-in) ────────────────────────────────────────

export interface CafeTable {
  id: string;
  table_number: number;
  label: string; // "Table 01"
  capacity: number;
  is_active: boolean;
  current_session_id: string | null;
}

// ── Contact Messages ────────────────────────────────────────

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export type MessageStatus = 'new' | 'read' | 'responded' | 'archived';

// ── Audit Log ───────────────────────────────────────────────

export interface AuditLogEntry {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  description: string;
  created_at: string;
}

// ── Notifications ───────────────────────────────────────────

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

export type NotificationType =
  | 'order_placed'
  | 'order_confirmed'
  | 'order_preparing'
  | 'order_ready'
  | 'order_completed'
  | 'order_cancelled'
  | 'payment_success'
  | 'payment_failed'
  | 'reward_earned'
  | 'reward_tier_up'
  | 'welcome'
  | 'general';

// ── Settings (Admin-configurable) ───────────────────────────

export interface AppSettings {
  gst_rate: number; // 0.05 = 5%
  delivery_fee: number; // ₹30
  free_delivery_threshold: number; // ₹299
  delivery_area: string; // "Motihari"
  currency: string; // "INR"
  currency_symbol: string; // "₹"
  points_per_rupee: number; // 0.1 = 1pt per ₹10
  points_redemption_value: number; // 0.1 = 100pts = ₹10
  bronze_threshold: number; // 0
  silver_threshold: number; // 500
  gold_threshold: number; // 1500
  silver_multiplier: number; // 1.5
  gold_multiplier: number; // 2
  gold_free_delivery: boolean; // true
  tip_options: number[]; // [10, 20, 50]
  total_tables: number; // 12
  business_hours: string; // "24x7"
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

// ── UI State ────────────────────────────────────────────────

export interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isConciergeOpen: boolean;
  isIntroComplete: boolean;
  isSoundEnabled: boolean;
  reducedMotion: boolean;
  theme: 'dark'; // Always dark for the customer side
}
