
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import { MOCK_PRODUCTS, MOCK_NEWS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSlider />

      {/* Category Selection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">CHOOSE YOUR RIDE</h2>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'EV', image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800', path: '/category/ev' },
              { title: 'Scooters', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800', path: '/category/scooters' },
              { title: 'Motorcycles', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800', path: '/category/motorcycles' },
            ].map((cat) => (
              <Link key={cat.title} to={cat.path} className="group relative overflow-hidden h-[400px] cursor-pointer shadow-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-white text-3xl font-bold mb-4">{cat.title}</h3>
                  <button className="bg-white text-jetBlack w-fit px-6 py-2.5 font-bold text-sm tracking-wider transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    VIEW ALL
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-hondaRed transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Carousel */}
      <section className="py-20 bg-lightGrey1">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">FEATURED PRODUCTS</h2>
              <div className="w-20 h-1.5 bg-hondaRed" />
            </div>
            <Link to="/products" className="text-hondaRed font-bold text-sm tracking-widest hover:text-jetBlack transition-colors">
              VIEW ALL PRODUCTS →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={Object.values(product.images)[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-jetBlack">{product.name}</h3>
                    <span className="text-hondaRed font-bold text-lg">{product.price}*</span>
                  </div>
                  <p className="text-coolGrey text-sm mb-6">Ex-showroom Price New Delhi</p>
                  <div className="flex justify-between items-center border-t border-lightGrey2 pt-6">
                    <span className="text-sm font-bold tracking-widest text-jetBlack border-b-2 border-hondaRed pb-1">VIEW DETAILS</span>
                    <div className="flex gap-2">
                       {product.colors.map(c => (
                         <div key={c.name} className="w-4 h-4 rounded-full border border-lightGrey2" style={{ backgroundColor: c.hex }} />
                       ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community / Mission Split */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full lg:w-1/2">
           <img 
            src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover"
            alt="Community"
           />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex justify-end">
          <div className="bg-white p-8 lg:p-16 w-full lg:w-1/2 shadow-2xl">
            <span className="text-hondaRed font-bold tracking-widest text-sm mb-4 block">OUR MISSION</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-jetBlack leading-tight">DRIVING DREAMS TO REALITY</h2>
            <p className="text-charcoalGrey leading-relaxed text-lg mb-8">
              At Honda, we believe in the power of dreams. Our journey is defined by innovation, precision engineering, and a commitment to creating a sustainable future for everyone, everywhere.
            </p>
            <button className="border-2 border-jetBlack text-jetBlack px-8 py-3.5 font-bold hover:bg-jetBlack hover:text-white transition-all">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Latest News</h2>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_NEWS.map((news) => (
              <div key={news.id} className="group cursor-pointer">
                <div className="h-60 overflow-hidden mb-6 rounded-sm">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                  />
                </div>
                <span className="text-hondaRed font-bold text-xs tracking-widest mb-2 block">{news.date}</span>
                <h3 className="text-xl font-bold text-jetBlack mb-4 group-hover:text-hondaRed transition-colors">{news.title}</h3>
                <div className="flex items-center gap-2 font-bold text-sm tracking-widest text-jetBlack group-hover:gap-4 transition-all">
                  READ MORE <span className="text-hondaRed">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
