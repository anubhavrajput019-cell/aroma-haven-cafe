# Aroma Haven Café

**Served With Love & Quality !!**

A premium full-stack digital experience for Aroma Haven Café — featuring a cinematic 3D brand website, complete ordering platform, customer accounts with loyalty rewards, and a professional admin SaaS dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Custom Design Tokens |
| 3D | Three.js + React Three Fiber |
| Animation | GSAP + Framer Motion |
| State | Zustand |
| Database | PostgreSQL via Supabase |
| Auth | Supabase Auth |
| Real-time | Supabase Realtime |
| Storage | Supabase Storage |
| Email | Resend (when configured) |
| Deployment | Render |

## Quick Start

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm (`npm install -g pnpm`)
- Supabase account (free tier)

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd aroma-haven-cafe

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Start development server
pnpm dev
```

Visit `http://localhost:3000`

### Demo Credentials

- **Admin**: `admin@aromahavencafe.com` (password configured via environment variable)
- **Customer**: Create an account via the registration page

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (customer)/         # Customer-facing pages
│   ├── admin/              # Admin dashboard pages
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # Primitives (buttons, inputs, cards)
│   ├── layout/             # Navbar, footer, sidebar
│   ├── home/               # Homepage sections
│   ├── menu/               # Menu components
│   ├── cart/               # Cart components
│   ├── checkout/           # Checkout flow
│   ├── order/              # Order tracking
│   ├── auth/               # Authentication
│   ├── account/            # Customer account
│   ├── admin/              # Admin components
│   ├── three/              # 3D/Three.js components
│   ├── concierge/          # AI menu assistant
│   └── shared/             # Shared/common
├── lib/                    # Libraries & utilities
│   ├── supabase/           # Supabase client config
│   ├── utils/              # Helper functions
│   ├── constants/          # App constants
│   ├── validations/        # Zod schemas
│   ├── hooks/              # Custom React hooks
│   └── services/           # Business logic services
├── stores/                 # Zustand state stores
├── types/                  # TypeScript type definitions
└── styles/                 # Font configuration
```

## Features

### Customer Experience
- Cinematic 3D hero with interactive coffee scene
- Premium menu with categories, search, and filters
- Product customization (sizes, add-ons, spice levels)
- Cart with coupon support, GST, delivery fee, tipping
- Guest checkout and authenticated checkout
- Real-time order tracking
- Favourites and order history
- AI-powered menu concierge
- Loyalty rewards (Bronze → Silver → Gold)

### Admin Dashboard
- Real-time order management
- Menu and product CRUD with image upload
- Customer management
- Sales analytics and charts
- Coupon engine
- Review moderation
- Contact message management
- Availability controls
- Configurable settings (GST, delivery, rewards)
- Audit log

### Technical
- Fully responsive (desktop, tablet, mobile)
- Accessibility (ARIA, keyboard nav, reduced motion)
- Performance optimized (lazy loading, code splitting)
- Security (hashed passwords, server-side validation, rate limiting)
- Real-time updates via WebSocket
- SEO ready (metadata, Open Graph, structured data)
- Git-ready with no committed secrets

## Documentation

- [Architecture Overview](docs/architecture.md)
- [Database Schema](docs/database.md)
- [API Documentation](docs/api/README.md)
- [Deployment Guide](docs/guides/deployment.md)
- [Academic Documentation](docs/academic/)

## Business Information

- **Brand**: Aroma Haven Café
- **Owner**: Anubhav Rajput
- **Location**: Motihari, Bihar, India
- **Hours**: 24 × 7
- **Contact**: +91 9229310610
- **Email**: Anubhavrajput@aromahavencafe.com

---

*Built as a premium digital product — not a template.*
