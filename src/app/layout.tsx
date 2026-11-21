import type { Metadata } from 'next';
import { playfair, cormorant, inter, jetbrainsMono } from '@/styles/fonts';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { ComingSoonModal } from '@/components/layout/ComingSoonModal';
import { CafeConciergeModal } from '@/components/concierge/CafeConciergeModal';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aroma Haven Café — Served With Love & Quality !!',
  description:
    'Experience the luxury, warmth, and craft of Aroma Haven Café in Motihari, Bihar. 24x7 premium coffee, handcrafted cuisine, dine-in, takeaway, and delivery.',
  keywords: [
    'Aroma Haven Café',
    'Motihari Café',
    'Premium Coffee',
    'Specialty Coffee',
    'Dine-in Motihari',
    'Café Delivery',
  ],
  authors: [{ name: 'Anubhav Rajput' }],
  openGraph: {
    title: 'Aroma Haven Café — Served With Love & Quality !!',
    description:
      'Where luxury hospitality meets the craft of artisanal coffee and culinary precision.',
    siteName: 'Aroma Haven Café',
    locale: 'en_IN',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Aroma Haven Café',
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
  description: 'Served With Love & Quality !! Luxury artisanal coffee and handcrafted cuisine in Motihari, Bihar.',
  slogan: 'Served With Love & Quality !!',
  telephone: '+919229310610',
  email: 'Anubhavrajput@aromahavencafe.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Road',
    addressLocality: 'Motihari',
    addressRegion: 'Bihar',
    postalCode: '845401',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  servesCuisine: ['Coffee', 'Continental', 'Desserts', 'Fast Food'],
  priceRange: '₹₹',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface-primary text-content-primary font-body min-h-screen antialiased flex flex-col justify-between selection:bg-brand-copper/30 selection:text-brand-cream">
        <Navbar />
        <div className="flex-1 pt-20">
          {children}
        </div>
        <Footer />
        <CartDrawer />
        <ComingSoonModal />
        <CafeConciergeModal />
      </body>
    </html>
  );
}
