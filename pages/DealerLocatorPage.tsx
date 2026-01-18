
import React, { useState } from 'react';
import { MOCK_DEALERS } from '../constants';

const DealerLocatorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDealers = MOCK_DEALERS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-[80vh]">
      <section className="bg-jetBlack py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-wider">FIND A DEALER</h1>
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Enter city or pincode" 
                className="w-full p-4 pl-12 rounded-sm text-jetBlack outline-none focus:ring-2 focus:ring-hondaRed"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-coolGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button className="bg-hondaRed hover:bg-hondaRedDark text-white px-8 py-4 font-bold rounded-sm transition-colors">
              SEARCH
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8">
        {/* Results List */}
        <div className="w-full lg:w-1/3 h-[600px] overflow-y-auto pr-4 space-y-4">
          <p className="text-sm font-bold text-charcoalGrey mb-4">{filteredDealers.length} DEALERS FOUND NEAR YOU</p>
          {filteredDealers.map((dealer) => (
            <div key={dealer.id} className="p-6 border border-lightGrey2 rounded-sm hover:border-hondaRed hover:shadow-lg transition-all cursor-pointer group">
              <h3 className="text-xl font-bold mb-2 group-hover:text-hondaRed">{dealer.name}</h3>
              <p className="text-charcoalGrey text-sm mb-4 leading-relaxed">{dealer.address}</p>
              <div className="flex items-center gap-2 text-sm font-bold mb-6">
                 <svg className="w-4 h-4 text-hondaRed" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                 {dealer.phone}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="border-2 border-jetBlack py-2.5 text-xs font-bold hover:bg-jetBlack hover:text-white transition-all">
                  GET DIRECTIONS
                </button>
                <button className="bg-hondaRed text-white py-2.5 text-xs font-bold hover:bg-jetBlack transition-all">
                  CONTACT
                </button>
              </div>
            </div>
          ))}
          {filteredDealers.length === 0 && (
             <div className="text-center py-20 bg-lightGrey1 rounded-sm">
                <p className="font-bold text-coolGrey">No dealers found matching your search.</p>
             </div>
          )}
        </div>

        {/* Map Placeholder */}
        <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px] bg-lightGrey1 relative overflow-hidden rounded-sm border border-lightGrey2 group">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover bg-center brightness-75 transition-transform duration-[20s] linear group-hover:scale-110" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-sm shadow-xl text-center">
               <div className="w-12 h-12 bg-hondaRed rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <div className="w-3 h-3 bg-white rounded-full" />
               </div>
               <p className="font-bold text-jetBlack uppercase tracking-widest text-sm">Interactive Map Loading...</p>
               <p className="text-xs text-charcoalGrey mt-2">Displaying {filteredDealers.length} locations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealerLocatorPage;
