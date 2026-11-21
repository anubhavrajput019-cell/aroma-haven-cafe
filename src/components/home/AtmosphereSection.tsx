import React from 'react';
import Image from 'next/image';

export function AtmosphereSection() {
  const spaces = [
    {
      title: 'The Espresso Bar',
      subtitle: 'Barista theater & pour-over station',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Private Lounge Booths',
      subtitle: 'Deep leather seating & intimate warm lighting',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'The Reading & Work Nook',
      subtitle: 'High-speed Wi-Fi, power outlets & quiet atmosphere',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Late Night Ambience',
      subtitle: '24×7 calm music and comforting warm cuisine',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="section-spacing bg-surface-primary text-left">
      <div className="section-container space-y-12">
        <div className="max-w-2xl space-y-3">
          <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
            Ambiance &amp; Spaces
          </span>
          <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
            Designed For Connection &amp; Contemplation
          </h2>
          <p className="text-body-md text-content-secondary">
            Muted copper accents, rich espresso wood, and soft acoustic room tones create an elevated hotel-lounge atmosphere right in Motihari.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-3/4 border border-border-subtle shadow-card"
            >
              <Image
                src={space.image}
                alt={space.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/20 to-transparent opacity-90" />

              <div className="absolute bottom-6 inset-x-6 space-y-1">
                <h4 className="text-heading-sm font-display text-content-primary">
                  {space.title}
                </h4>
                <p className="text-caption text-brand-copper">
                  {space.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
