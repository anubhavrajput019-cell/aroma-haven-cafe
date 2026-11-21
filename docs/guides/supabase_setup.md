# Aroma Haven Café — Supabase Setup & Connection Guide

This guide details how to create and connect your live Supabase PostgreSQL database to Aroma Haven Café.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Fill in:
   - **Name**: `Aroma Haven Cafe`
   - **Database Password**: Set a strong password (save it safely).
   - **Region**: Select **South Asia (Mumbai)** for lowest latency to Motihari and India.
   - **Pricing Plan**: Free Tier.
4. Click **Create new project** and wait ~2 minutes for provisioning.

---

## 2. Run Database Migrations

1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New Query**.
3. Open `supabase/migrations/20260101000000_init_schema.sql` from this repository.
4. Copy and paste the entire SQL file into the editor, then click **Run**.
5. Once completed, create another query, copy the contents of `supabase/seed.sql`, and click **Run**.
6. This sets up all tables (`profiles`, `products`, `orders`, `cafe_tables`, `coupons`, `reviews`) and seeds initial demonstration data.

---

## 3. Retrieve API Credentials & Configure Environment

1. In Supabase Dashboard, navigate to **Project Settings** > **API**.
2. Copy:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **anon public key** (`eyJh...`)
   - **service_role secret key** (`eyJh...`)
3. Open `.env.local` in your project folder (or copy from `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ADMIN_EMAIL=admin@aromahavencafe.com
ADMIN_PASSWORD=your_secure_password
```

---

## 4. Enable Google OAuth (Optional / Future)

1. In Supabase Dashboard, navigate to **Authentication** > **Providers** > **Google**.
2. Enable Google provider.
3. Paste your Google Cloud Client ID and Secret when available.
4. Save configuration.
