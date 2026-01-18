
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import SpecsTabs from '../components/SpecsTabs';
import EMICalculator from '../components/EMICalculator';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  if (!product) return <div className="p-20 text-center">Product Not Found</div>;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="bg-white">
      {/* Product Hero */}
      <section 
        className="relative min-h-[70vh] flex flex-col items-center justify-center pt-10 pb-20 overflow-hidden border-b border-lightGrey2 transition-colors duration-700"
        style={{
          background: `linear-gradient(135deg, ${selectedColor.hex}15, ${selectedColor.hex}05, transparent)`
        }}
      >
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-jetBlack mb-2 tracking-tighter uppercase">{product.name}</h1>
          <p className="text-hondaRed font-bold text-xl mb-10 tracking-widest">{product.category}</p>
          
          <div className="relative max-w-4xl mx-auto h-[300px] md:h-[500px] mb-8">
            {/* Dynamic background with color-based gradient */}
            <div 
              className="absolute inset-0 rounded-3xl shadow-2xl transition-all duration-700"
              style={{
                background: `linear-gradient(145deg, ${selectedColor.hex}20, ${selectedColor.hex}10)`,
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px ${selectedColor.hex}40, 0 10px 30px -5px rgba(0, 0, 0, 0.15)`
              }}
            />
            
            {/* Color-based accent border */}
            <div 
              className="absolute inset-0 rounded-3xl border-2 transition-all duration-700"
              style={{
                borderColor: `${selectedColor.hex}30`
              }}
            />
            
            {/* Vehicle images */}
            {product.colors.map(color => (
               <img 
                key={color.name}
                src={product.images[color.name]} 
                alt={color.name}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out rounded-3xl p-6 ${selectedColor.name === color.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
                }}
               />
            ))}
            
            {/* Floating color indicator */}
            <div 
              className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg"
              style={{
                background: `${selectedColor.hex}20`,
                border: `1px solid ${selectedColor.hex}40`,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="text-sm font-semibold text-jetBlack">{selectedColor.name}</span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-8">
            <span className="text-xs font-bold text-coolGrey uppercase tracking-[0.2em] mb-4">Select Color: {selectedColor.name}</span>
            <div className="flex gap-4 flex-wrap justify-center">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-14 h-14 rounded-full border-3 transition-all duration-300 p-0.5 hover:scale-110 relative group ${selectedColor.name === color.name ? 'scale-110' : 'hover:shadow-lg'}`}
                  style={{
                    boxShadow: selectedColor.name === color.name 
                      ? `0 8px 25px rgba(0, 0, 0, 0.15), 0 8px 25px ${color.hex}60, 0 0 0 3px ${color.hex}30` 
                      : `0 4px 15px rgba(0, 0, 0, 0.1), 0 4px 15px ${color.hex}40`
                  }}
                  title={color.name}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-inner ring-2 ring-white transition-transform duration-200 group-hover:scale-105" 
                    style={{ 
                      backgroundColor: color.hex,
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  {selectedColor.name === color.name && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-hondaRed rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">Key Features</h2>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto" />
          </div>

          <div className="space-y-32">
            {product.features.map((feature, idx) => (
              <div 
                key={feature.title} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              >
                <div className="w-full lg:w-1/2 overflow-hidden shadow-2xl rounded-sm group">
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
            <h2 className="text-4xl font-bold mb-4 uppercase">Specifications</h2>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto" />
          </div>
          <div className="max-w-6xl mx-auto bg-white p-8 lg:p-12 shadow-sm rounded-sm">
            <SpecsTabs 
              specs={product.specs} 
              productImage={product.images[selectedColor.name]}
              productName={product.name}
              variants={["Standard", "DLX", "Smart"]}
            />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white overflow-x-auto">
        <div className="container mx-auto px-4 md:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 uppercase">Variants</h2>
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
                <td className="p-6 border border-lightGrey2 font-bold">Keyless Start</td>
                <td className="p-6 border border-lightGrey2 bg-white/50">—</td>
                <td className="p-6 border border-lightGrey2">—</td>
                <td className="p-6 border border-lightGrey2 text-green-600 font-bold">Yes</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-6 text-xs text-gray-400 text-center">*All prices are ex-showroom, Delhi. Subject to change.</p>
        </div>
      </section>

      {/* EMI Section */}
      <section className="py-24 bg-lightGrey1">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <EMICalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4">
            {[
              { q: "What is the mileage of Activa 110?", a: "The Kanade Honda Activa 110 delivers a certified mileage of approximately 60 kmpl, depending on riding conditions and maintenance." },
              { q: "Is a license required to drive Activa 110?", a: "Yes, since the displacement is 109.51cc, a valid two-wheeler driving license is required to operate it in India." },
              { q: "What is the warranty period?", a: "Kanade Honda offers a 3-year standard warranty + an additional 3-year optional extended warranty program for peace of mind." }
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
    </div>
  );
};

export default ProductDetail;
