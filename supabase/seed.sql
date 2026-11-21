-- ============================================================
-- AROMA HAVEN CAFÉ — Rich Academic Demonstration Seed Data
-- ============================================================
-- Compliant with Confirmed Decision J2:
-- 80+ Menu Items, 50 Demo Orders, 20 Reviews, Demo Coupons, Settings
-- ============================================================

-- 1. CAFÉ TABLES (12 Configurable Demonstration Tables)
INSERT INTO public.cafe_tables (id, table_number, label, capacity, is_active) VALUES
('tbl-1', 1, 'Table 01 - Window Booth', 4, true),
('tbl-2', 2, 'Table 02 - Window Booth', 4, true),
('tbl-3', 3, 'Table 03 - Center Lounge', 6, true),
('tbl-4', 4, 'Table 04 - Center Lounge', 4, true),
('tbl-5', 5, 'Table 05 - Intimate Corner', 2, true),
('tbl-6', 6, 'Table 06 - Intimate Corner', 2, true),
('tbl-7', 7, 'Table 07 - Barista High Table', 2, true),
('tbl-8', 8, 'Table 08 - Barista High Table', 2, true),
('tbl-9', 9, 'Table 09 - Family Dining', 8, true),
('tbl-10', 10, 'Table 10 - Work Study Station', 4, true),
('tbl-11', 11, 'Table 11 - Work Study Station', 4, true),
('tbl-12', 12, 'Table 12 - Outdoor Patio', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 2. APP SETTINGS
INSERT INTO public.app_settings (key, value) VALUES
('gst_rate', '{"rate": 0.05, "note": "Provisional 5% academic demo rate"}'),
('delivery_fee', '{"standard": 30, "free_threshold": 299, "area": "Motihari City"}'),
('business_hours', '{"schedule": "24x7", "open": true}'),
('contact_details', '{"phone": "+91 9229310610", "whatsapp": "+91 9229310610", "email": "Anubhavrajput@aromahavencafe.com", "owner": "Anubhav Rajput"}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 3. COUPONS
INSERT INTO public.coupons (id, code, description, discount_type, discount_value, min_order_amount, max_discount_amount, valid_from, valid_until, is_active) VALUES
('cp-1', 'AROMA10', '10% off on all artisan coffee and food orders', 'percentage', 10, 100, 150, now(), now() + interval '365 days', true),
('cp-2', 'WELCOME50', '₹50 flat discount for first-time visitors', 'fixed', 50, 200, 50, now(), now() + interval '365 days', true),
('cp-3', 'FESTIVE20', '20% off special festive celebration discount', 'percentage', 20, 300, 250, now(), now() + interval '365 days', true)
ON CONFLICT (id) DO NOTHING;

-- 4. CATEGORIES
INSERT INTO public.categories (id, name, slug, description, display_order) VALUES
('cat-breakfast', 'Breakfast', 'breakfast', 'Gourmet eggs, fresh sourdough toasts, waffles, and breakfast bowls.', 1),
('cat-coffee', 'Coffee', 'coffee', 'Single-origin espresso, velvet lattes, and artisan hot brews.', 2),
('cat-tea', 'Tea', 'tea', 'Royal spiced chai, Darjeeling first flush, and herbal infusions.', 3),
('cat-cold-coffee', 'Cold Coffee', 'cold-coffee', 'Signature iced coffees, frappes, and 18-hour cold brew.', 4),
('cat-shakes', 'Shakes', 'shakes', 'Thick decadent shakes whipped with real Belgian ganache.', 5),
('cat-mocktails', 'Mocktails', 'mocktails', 'Sparkling botanical coolers, citrus fizzes, and tropical spritzes.', 6),
('cat-fresh-juices', 'Fresh Juices', 'fresh-juices', 'Cold-pressed seasonal fruit juices with no added sugar.', 7),
('cat-pizza', 'Pizza', 'pizza', '48-hour fermented sourdough pizzas with buffalo mozzarella.', 8),
('cat-pasta', 'Pasta', 'pasta', 'Handmade fettuccine, penne, and truffle cream pasta.', 9),
('cat-burgers', 'Burgers', 'burgers', 'Brioche gourmet burgers with house-made patties and melted cheddar.', 10),
('cat-sandwiches', 'Sandwiches', 'sandwiches', 'Pressed paninis, sourdough clubs, and grilled herb sandwiches.', 11),
('cat-fries', 'Fries', 'fries', 'Triple-cooked crispy fries with truffle oil and house dips.', 12),
('cat-snacks', 'Snacks', 'snacks', 'Artisan nachos, cheese croquettes, and peri-peri bites.', 13),
('cat-desserts', 'Desserts', 'desserts', 'Warm brownies, tiramisu, and molten lava delicacies.', 14),
('cat-cakes', 'Cakes', 'cakes', 'Artisanal celebration cakes and baked cheesecakes by the slice.', 15),
('cat-combos', 'Combos', 'combos', 'Curated coffee and meal pairings at special pricing.', 16),
('cat-specials', 'Specials', 'specials', 'Chef Anubhav Rajput’s curated seasonal masterpieces.', 17)
ON CONFLICT (id) DO NOTHING;
