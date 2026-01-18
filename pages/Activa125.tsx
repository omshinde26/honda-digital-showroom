import React, { useState } from 'react';
import SpecsTabs from '../components/SpecsTabs';
import EMICalculator from '../components/EMICalculator';

const Activa125: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('Pearl Precious White');

  // TEST: Add a very visible banner at the top
  console.log('Activa125 component is rendering!');

  const colors = [
    { name: 'Pearl Precious White', hex: '#F8F8FF' },
    { name: 'Mat Axis Gray Metallic', hex: '#4A4A4A' },
    { name: 'Rebel Red Metallic', hex: '#8B0000' },
    { name: 'Pearl Siren Blue', hex: '#007FFF' },
    { name: 'Pearl Igneous Black', hex: '#000000' },
    { name: 'Pearl Deep Ground Gray', hex: '#696969' },
  ];

  const colorImages = {
    'Pearl Precious White': '/assets/vehicles/activa125/colors/pearl-precious-white.png',
    'Mat Axis Gray Metallic': '/assets/vehicles/activa125/colors/mat-axis-gray-metallic.png',
    'Rebel Red Metallic': '/assets/vehicles/activa125/colors/rebel-red-metallic.png',
    'Pearl Siren Blue': '/assets/vehicles/activa125/colors/pearl-siren-blue.png',
    'Pearl Igneous Black': '/assets/vehicles/activa125/colors/pearl-igneous-black.png',
    'Pearl Deep Ground Gray': '/assets/vehicles/activa125/colors/pearl-deep-ground-gray.png',
  };

  const features = [
    {
      label: 'Storage',
      title: 'Open Glove Box',
      description: 'A spacious open glove box provides additional storage for essentials, keeping your belongings secure and easily accessible during your ride.',
      image: '/assets/vehicles/activa125/features/open-glove-box.png',
    },
    {
      label: 'Technology',
      title: '15W USB-C Port',
      description: 'Enjoy your ride. It provides charging to your smartphone, power bank, earphones on the go. Stay connected and powered up wherever your journey takes you.',
      image: '/assets/vehicles/activa125/features/usb-c-port.png',
    },
    {
      label: 'Efficiency',
      title: 'Advanced Idling Stop System',
      description: 'Say goodbye to fuel wastage with the new Advanced Idling Stop System, that automatically switches the engine off during brief stops, maximizing fuel efficiency.',
      image: '/assets/vehicles/activa125/features/advanced-idling-stop-system.jpg',
    },
    {
      label: 'Convenience',
      title: 'Double Lid External Fuel Fill',
      description: 'Stay seated and refuel with ease, thanks to the convenient double-lid fuel access. No need to get off your scooter for quick refueling stops.',
      image: '/assets/vehicles/activa125/features/double-lid-fuel-fill.png',
    }
  ];

  const specs = {
    'Body Dimensions': {
      'Length': '1833 mm',
      'Width': '697 mm',
      'Height': '1156 mm',
      'Wheel Base': '1260 mm',
      'Ground Clearance': '171 mm',
      'Seat Height': '780 mm',
      'Kerb Weight': '109 kg',
    },
    'Engine': {
      'Type': 'Air Cooled, 4 Stroke, SI Engine',
      'Displacement': '124.9 cc',
      'Max Power': '6.25 kW @ 6500 rpm',
      'Max Torque': '10.54 N-m @ 5000 rpm',
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
      'Front Brake': '190mm Disc',
      'Rear Brake': '130mm Drum',
      'Braking System': 'Combi-Brake System (CBS)',
    },
    'Frame & Suspension': {
      'Frame': 'Under Bone',
      'Front Suspension': 'Telescopic',
      'Rear Suspension': '3-Step Adjustable Spring Loaded Hydraulic',
    },
    'Electricals': {
      'Battery': '12V, 5Ah',
      'Headlight': 'LED Headlight & Position Lamp',
      'Tail Light': 'LED',
      'Ignition': 'DC-CDI',
      'Charging Socket': 'Mobile Charging Socket',
      'Console': 'Analog with Digital Display',
      'Under Seat Storage': '18 Liters',
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
            Activa 125
          </h1>
          <p className="text-xl md:text-2xl text-charcoalGrey mb-8 max-w-2xl mx-auto leading-relaxed">
            The perfect blend of style, performance, and reliability for modern urban mobility
          </p>
          
          {/* Hero Video */}
          <div className="relative w-full max-w-7xl mx-auto mb-12">
            <video 
              className="w-full h-auto rounded-3xl shadow-2xl"
              autoPlay 
              muted 
              loop 
              playsInline
              style={{
                minHeight: '400px',
                maxHeight: '70vh',
                objectFit: 'cover',
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px ${colors.find(c => c.name === selectedColor)?.hex}40`
              }}
            >
              <source src="/assets/vehicles/activa125/hero-video.mp4" type="video/mp4" />
            </video>
            
            {/* Video overlay with color indicator */}
            <div 
              className="absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg"
              style={{
                background: `${colors.find(c => c.name === selectedColor)?.hex}20`,
                border: `1px solid ${colors.find(c => c.name === selectedColor)?.hex}40`,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="text-sm font-semibold text-jetBlack">Activa 125</span>
            </div>
          </div>

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
              <div className="text-3xl md:text-4xl font-bold text-hondaRed mb-2">₹87,234*</div>
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
              <div className="text-3xl font-bold text-hondaRed mb-2">124.9cc</div>
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
              Discover the advanced features that make Activa 125 the perfect choice for your daily commute
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
              productName="Activa 125"
              variants={["Standard", "DLX", "Smart Connect"]}
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
                <th className="p-6 border border-lightGrey2 font-bold text-jetBlack">Smart Connect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-6 border border-lightGrey2 font-bold">Price</td>
                <td className="p-6 border border-lightGrey2 font-bold text-hondaRed bg-white/50">₹87,234*</td>
                <td className="p-6 border border-lightGrey2">₹89,734*</td>
                <td className="p-6 border border-lightGrey2">₹93,234*</td>
              </tr>
              <tr>
                <td className="p-6 border border-lightGrey2 font-bold">Wheels</td>
                <td className="p-6 border border-lightGrey2 bg-white/50">Steel</td>
                <td className="p-6 border border-lightGrey2">Alloy</td>
                <td className="p-6 border border-lightGrey2">Alloy</td>
              </tr>
              <tr>
                <td className="p-6 border border-lightGrey2 font-bold">Digital Console</td>
                <td className="p-6 border border-lightGrey2 bg-white/50">Analog</td>
                <td className="p-6 border border-lightGrey2">Digital</td>
                <td className="p-6 border border-lightGrey2 text-green-600 font-bold">Smart Digital</td>
              </tr>
              <tr>
                <td className="p-6 border border-lightGrey2 font-bold">Bluetooth Connectivity</td>
                <td className="p-6 border border-lightGrey2 bg-white/50">—</td>
                <td className="p-6 border border-lightGrey2">—</td>
                <td className="p-6 border border-lightGrey2 text-green-600 font-bold">Yes</td>
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
                q: "What is the mileage of Activa 125?", 
                a: "The Honda Activa 125 delivers a certified mileage of approximately 60 kmpl, depending on riding conditions and maintenance." 
              },
              { 
                q: "What are the key differences between Activa 125 variants?", 
                a: "The Standard variant comes with steel wheels and analog console, DLX adds alloy wheels and digital console, while Smart Connect includes Bluetooth connectivity and smart features." 
              },
              { 
                q: "Does Activa 125 have CBS (Combi Brake System)?", 
                a: "Yes, all variants of Activa 125 come equipped with CBS as standard, which ensures better braking performance and safety." 
              },
              { 
                q: "What is the warranty period for Activa 125?", 
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
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Activa 125?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a test ride today and discover why Activa 125 is India's most trusted scooter
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

export default Activa125;