
import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    image: '/assets/hero/hero-1.png',
    title: 'THE FUTURE IS ELECTRIC',
    subtitle: 'Step into a greener tomorrow with Kanade Honda EV.',
    cta: 'Explore more'
  },
  {
    id: 2,
    image: '/assets/hero/hero-2.png',
    title: 'STYLE MEETS PERFORMANCE',
    subtitle: 'Power that defines generations. Kanade Honda Motorcycles.',
    cta: 'View Features'
  },
  {
    id: 3,
    image: '/assets/hero/hero-3.png',
    title: 'RIDE THE LEGEND',
    subtitle:  'The all-new Activa 110. Your perfect companion.' ,
    cta: 'Discover More'
  }
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] lg:h-[100vh] w-full overflow-hidden">
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6s] ease-linear scale-110"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: idx === current ? 'scale(1)' : 'scale(1.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center items-start text-white">
            <div className={`transition-all duration-700 delay-300 transform ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight max-w-3xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-lightGrey2 mb-8 max-w-xl">
                {slide.subtitle}
              </p>
              <button className="bg-hondaRed hover:bg-jetBlack text-white px-8 md:px-12 py-3.5 md:py-4 rounded-sm font-bold text-sm tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 transition-all duration-300 rounded-full ${idx === current ? 'w-12 bg-hondaRed' : 'w-6 bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
