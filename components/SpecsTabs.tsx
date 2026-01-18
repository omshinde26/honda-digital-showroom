
import React, { useState } from 'react';

interface SpecsTabsProps {
  specs: Record<string, Record<string, string>>;
  productImage?: string;
  productName?: string;
  variants?: string[];
}

const SpecsTabs: React.FC<SpecsTabsProps> = ({ 
  specs, 
  productImage, 
  productName = "Vehicle",
  variants = ["Standard", "DLX", "Smart Connect"]
}) => {
  const categories = Object.keys(specs);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  return (
    <div className="w-full">
      {/* Variant Selector */}
      <div className="mb-8 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-jetBlack">Technical Specifications</h3>
        <div className="relative">
          <select 
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="appearance-none bg-white border-2 border-lightGrey2 rounded-sm px-4 py-2 pr-8 font-semibold text-jetBlack focus:outline-none focus:border-hondaRed transition-colors"
          >
            {variants.map(variant => (
              <option key={variant} value={variant}>{variant}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-charcoalGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Vehicle Image Section */}
        {productImage && (
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-lightGrey1 to-white rounded-lg p-6 shadow-sm">
              <img 
                src={productImage} 
                alt={productName}
                className="w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
                }}
              />
              <div className="text-center mt-4">
                <h4 className="font-bold text-jetBlack text-lg">{productName}</h4>
                <p className="text-sm text-charcoalGrey">{selectedVariant} Variant</p>
              </div>
            </div>
          </div>
        )}

        {/* Specifications Tabs Section */}
        <div className={`${productImage ? 'lg:w-2/3' : 'w-full'}`}>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-0 border-b border-lightGrey2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-2 py-4 font-bold text-xs tracking-widest uppercase transition-all relative text-center border-b-2 ${
                  activeTab === cat 
                    ? 'text-hondaRed border-hondaRed' 
                    : 'text-coolGrey hover:text-jetBlack border-transparent hover:border-lightGrey2'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="animate-in fade-in duration-500">
            <div className="space-y-3">
              {Object.entries(specs[activeTab]).map(([key, value], idx) => (
                <div 
                  key={key} 
                  className="flex justify-between items-center py-3 px-4 bg-white hover:bg-lightGrey1 transition-colors rounded-sm border border-lightGrey2"
                >
                  <span className="text-sm font-semibold text-charcoalGrey">{key}</span>
                  <span className="text-sm font-bold text-jetBlack text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecsTabs;
