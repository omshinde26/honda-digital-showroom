import React, { useState } from 'react';
import SpecsTabs from '../components/SpecsTabs';
import EMICalculator from '../components/EMICalculator';

const Activa110: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('Decent Blue');

  const colors = [
    { name: 'Decent Blue', hex: '#1D2951' },
    { name: 'Matte Axis Grey', hex: '#4A4A4A' },
    { name: 'Rebel Red', hex: '#8B0000' },
    { name: 'Pearl Siren Blue', hex: '#007FFF' },
  ];

  const colorImages = {
    'Decent Blue': 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800',
    'Matte Axis Grey': 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
    'Rebel Red': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&q=80&w=800',
    'Pearl Siren Blue': 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=800',
  };

  const features = [
    {
      label: 'Technology',
      title: 'Silent Start with ACG',
      description: 'Experience a smooth start with our advanced ACG technology that eliminates gear meshing noise for a peaceful riding experience.',
      image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=600',
    },
    {
      label: 'Performance',
      title: 'Enhanced Smart Power (eSP)',
      description: 'Optimized engine performance with programmed fuel injection for better mileage and efficiency in city riding conditions.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    },
    {
      label: 'Safety',
      title: 'Combi-Brake System',
      description: 'Shortens braking distance and ensures more stability when you pull the left lever, providing enhanced safety.',
      image: 'https://images.unsplash.com/photo-1621360841013-c7683c6c98ca?auto=format&fit=crop&q=80&w=600',
    },
    {
      label: 'Convenience',
      title: 'Mobile Charging Socket',
      description: 'Keep your devices charged on the go with the convenient mobile charging socket for modern connectivity needs.',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=600',
    }
  ];

  const specs = {
    'Body Dimensions': {
      'Length': '1833 mm',
      'Width': '697 mm',
      'Height': '1156 mm',
      'Wheel Base': '1260 mm',
      'Ground Clearance': '162 mm',
      'Seat Height': '780 mm',
      'Kerb Weight': '109 kg',
    },
    'Engine': {
      'Type': 'Fan Cooled, 4 Stroke, SI Engine',
      'Displacement': '109.51 cc',
      'Max Power': '5.77 kW @ 8000 rpm',
      'Max Torque': '8.90 N-m @ 5500 rpm',
      'Fuel System': 'PGM-FI',
      'Starting': 'Self & Kick Start',
      'Fuel Tank Capacity': '5.3 Liters',
    },
    'Transmission': {
      'Type': 'V-Matic (Automatic)',
      'Clutch': 'Wet, Multi-plate Centrifugal Automatic',
    },
    'Tyres & Brakes': {
      'Front Tyre': '90/100-10 53J',
      'Rear Tyre': '90/100-10 53J',
      'Front Brake': '130mm Drum',
      'Rear Brake': '130mm Drum',
      'Braking System': 'Combi-Brake System (CBS)',
    },
    'Frame & Suspension': {
      'Frame': 'Under Bone',
      'Front Suspension': 'Telescopic',
      'Rear Suspension': '3-Step Adjustable Spring Loaded Hydraulic',
    },
    'Electricals': {
      'Battery': '12V, 3Ah',
      'Headlight': 'LED',
      'Tail Light': 'LED',
      'Ignition': 'DC-CDI',
      'Charging Socket': 'Mobile Charging Socket',
      'Console': 'Analog with Digital Display',
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex flex-col items-center justify-center pt-10 pb-20 overflow-hidden transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, ${colors.find(c => c.name === selectedColor)?.hex}15, ${colors.find(c => c.name === selectedColor)?.hex}05, #f9fafb)`
        }}
      >
        <div className="container mx-auto px-4 text-center z-10">
          <div className="mb-6">
            <span className="text-hondaRed font-bold text-sm tracking-[0.3em] uppercase">Honda Scooter</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-jetBlack mb-4 tracking-tighter uppercase">
            Activa 110
          </h1>
          <p className="text-xl md:text-2xl text-charcoalGrey mb-8 max-w-2xl mx-auto leading-relaxed">
            The trusted companion for your daily commute with proven reliability and fuel efficiency
          </p>
          
          {/* Color Selection and Product Images */}
          <div className="relative max-w-4xl mx-auto h-[300px] md:h-[500px] mb-8">
            {/* Dynamic background with color-based gradient */}
            <div 
              className="absolute inset-0 rounded-3xl shadow-2xl transition-all duration-700"
              style={{
                background: `linear-gradient(145deg, ${colors.find(c => c.name === selectedColor)?.hex}20, ${colors.find(c => c.name === selectedColor)?.hex}10)`,
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px ${colors.find(c => c.name === selectedColor)?.hex}40, 0 10px 30px -5px rgba(0, 0, 0, 0.15)`
              }}
            />
            
            {/* Color-based accent border */}
            <div 
              className="absolute inset-0 rounded-3xl border-2 transition-all duration-700"
              style={{
                borderColor: `${colors.find(c => c.name === selectedColor)?.hex}30`
              }}
            />
            
            {/* Vehicle images */}
            {colors.map(color => (
               <img 
                key={color.name}
                src={colorImages[color.name]} 
                alt={color.name}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out rounded-3xl p-6 ${selectedColor === color.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
                }}
               />
            ))}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-coolGrey uppercase tracking-[0.2em] mb-4">
              Available Colors: {selectedColor}
            </span>
            <div className="flex gap-3 mb-8 flex-wrap justify-center">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-300 p-0.5 hover:scale-110 relative group ${selectedColor === color.name ? 'scale-110' : 'hover:shadow-lg'}`}
                  style={{
                    boxShadow: selectedColor === color.name 
                      ? `0 6px 20px rgba(0, 0, 0, 0.15), 0 6px 20px ${color.hex}60, 0 0 0 2px ${color.hex}30` 
                      : `0 3px 12px rgba(0, 0, 0, 0.1), 0 3px 12px ${color.hex}40`
                  }}
                  title={color.name}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-inner ring-1 ring-white transition-transform duration-200 group-hover:scale-105" 
                    style={{ 
                      backgroundColor: color.hex,
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  {selectedColor === color.name && (
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-hondaRed rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-hondaRed mb-2">₹76,234*</div>
              <p className="text-sm text-gray-500">*Ex-showroom price, Delhi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 bg-jetBlack text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-hondaRed mb-2">109.51cc</div>
              <div className="text-sm uppercase tracking-wide">Engine</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hondaRed mb-2">60 kmpl</div>
              <div className="text-sm uppercase tracking-wide">Mileage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hondaRed mb-2">18L</div>
              <div className="text-sm uppercase tracking-wide">Storage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hondaRed mb-2">109kg</div>
              <div className="text-sm uppercase tracking-wide">Weight</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase text-jetBlack">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the advanced features that make Activa 110 the perfect choice for your daily commute
            </p>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto mt-6" />
          </div>

          <div className="space-y-32">
            {features.map((feature, idx) => (
              <div 
                key={feature.title} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              >
                <div className="w-full lg:w-1/2 overflow-hidden shadow-2xl rounded-2xl group">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <span className="text-hondaRed font-bold text-sm tracking-widest mb-4 block uppercase">{feature.label}</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-jetBlack tracking-tight leading-tight">{feature.title}</h3>
                  <p className="text-charcoalGrey text-lg leading-relaxed mb-8">
                    {feature.description}
                  </p>
                  <div className="w-12 h-1 bg-jetBlack" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-24 bg-lightGrey1">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 uppercase text-jetBlack">Specifications</h2>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto" />
          </div>
          <div className="max-w-6xl mx-auto bg-white p-8 lg:p-12 shadow-sm rounded-sm">
            <SpecsTabs 
              specs={specs} 
              productImage={colorImages[selectedColor]}
              productName="Activa 110"
              variants={["Standard", "DLX", "Smart"]}
            />
          </div>
        </div>
      </section>

      {/* Variants Comparison */}
      <section className="py-24 bg-white overflow-x-auto">
        <div className="container mx-auto px-4 md:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 uppercase text-jetBlack">Variants</h2>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto" />
          </div>
          <table className="w-full border-collapse border border-lightGrey2 text-left">
            <thead>
              <tr className="bg-lightGrey1">
                <th className="p-6 border border-lightGrey2 font-bold text-charcoalGrey">Features</th>
                <th className="p-6 border border-lightGrey2 font-bold text-jetBlack bg-white">Standard</th>
                <th className="p-6 border border-lightGrey2 font-bold text-jetBlack">DLX</th>
                <th className="p-6 border border-lightGrey2 font-bold text-jetBlack">Smart</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-6 border border-lightGrey2 font-bold">Price</td>
                <td className="p-6 border border-lightGrey2 font-bold text-hondaRed bg-white/50">₹76,234*</td>
                <td className="p-6 border border-lightGrey2">₹78,734*</td>
                <td className="p-6 border border-lightGrey2">₹82,234*</td>
              </tr>
              <tr>
                <td className="p-6 border border-lightGrey2 font-bold">Wheels</td>
                <td className="p-6 border border-lightGrey2 bg-white/50">Steel</td>
                <td className="p-6 border border-lightGrey2">Steel</td>
                <td className="p-6 border border-lightGrey2">Alloy</td>
              </tr>
              <tr>
                <td className="p-6 border border-lightGrey2 font-bold">Digital Console</td>
                <td className="p-6 border border-lightGrey2 bg-white/50">Analog</td>
                <td className="p-6 border border-lightGrey2">Digital</td>
                <td className="p-6 border border-lightGrey2 text-green-600 font-bold">Smart Digital</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-6 text-xs text-gray-400 text-center">*All prices are ex-showroom, Delhi. Subject to change.</p>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-24 bg-lightGrey1">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <EMICalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-jetBlack">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto" />
          </div>
          <div className="space-y-4">
            {[
              { 
                q: "What is the mileage of Activa 110?", 
                a: "The Honda Activa 110 delivers a certified mileage of approximately 60 kmpl, depending on riding conditions and maintenance." 
              },
              { 
                q: "What are the key differences between Activa 110 variants?", 
                a: "The Standard variant comes with steel wheels and analog console, DLX adds digital features, while Smart includes advanced connectivity options." 
              },
              { 
                q: "Does Activa 110 have CBS (Combi Brake System)?", 
                a: "Yes, all variants of Activa 110 come equipped with CBS as standard, which ensures better braking performance and safety." 
              },
              { 
                q: "What is the warranty period for Activa 110?", 
                a: "Honda offers a 3-year standard warranty + an additional 3-year optional extended warranty program for complete peace of mind." 
              }
            ].map((faq, idx) => (
              <details key={idx} className="group border border-lightGrey2 p-6 cursor-pointer open:bg-lightGrey1 transition-colors">
                <summary className="list-none flex justify-between items-center font-bold text-lg text-jetBlack">
                  {faq.q}
                  <span className="text-hondaRed group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-charcoalGrey leading-relaxed text-sm lg:text-base">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-jetBlack text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Activa 110?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a test ride today and discover why Activa 110 is India's most trusted scooter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-hondaRed hover:bg-red-700 text-white px-8 py-4 rounded-sm font-bold text-sm tracking-widest transition-colors">
              BOOK TEST RIDE
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-jetBlack px-8 py-4 rounded-sm font-bold text-sm tracking-widest transition-colors">
              FIND DEALER
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activa110;