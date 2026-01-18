import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';

const CategoryPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  // Filter products based on category type
  const getFilteredProducts = () => {
    if (!type) return MOCK_PRODUCTS;
    
    switch (type.toLowerCase()) {
      case 'scooters':
        return MOCK_PRODUCTS.filter(product => product.category.toLowerCase() === 'scooter');
      case 'motorcycles':
        return MOCK_PRODUCTS.filter(product => product.category.toLowerCase() === 'motorcycle');
      case 'ev':
        return MOCK_PRODUCTS.filter(product => product.category.toLowerCase() === 'ev');
      default:
        return MOCK_PRODUCTS;
    }
  };

  const filteredProducts = getFilteredProducts();
  const categoryTitle = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All Products';

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-jetBlack to-charcoalGrey overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter uppercase">
              {categoryTitle}
            </h1>
            <div className="w-20 h-1.5 bg-hondaRed mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our premium range of {categoryTitle.toLowerCase()} engineered for performance, reliability, and the joy of riding.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-hondaRed/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-hondaRed/5 rounded-full blur-3xl" />
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-lightGrey1 p-8 rounded-lg shadow-sm border border-lightGrey2">
                <h3 className="text-2xl font-bold text-jetBlack mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-hondaRed block" />
                  CATEGORIES
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'EV', path: '/category/ev', count: MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === 'ev').length },
                    { name: 'Motorcycles', path: '/category/motorcycles', count: MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === 'motorcycle').length },
                    { name: 'Scooters', path: '/category/scooters', count: MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === 'scooter').length },
                  ].map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className={`flex items-center justify-between p-4 rounded-sm transition-all duration-300 group ${
                        (type === 'ev' && category.name === 'EV') ||
                        (type === 'motorcycles' && category.name === 'Motorcycles') ||
                        (type === 'scooters' && category.name === 'Scooters')
                          ? 'bg-hondaRed text-white shadow-lg' 
                          : 'text-jetBlack hover:bg-white hover:shadow-md border border-lightGrey2'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <div>
                          <div className="font-bold">{category.name}</div>
                          <div className={`text-sm ${
                            (type === 'ev' && category.name === 'EV') ||
                            (type === 'motorcycles' && category.name === 'Motorcycles') ||
                            (type === 'scooters' && category.name === 'Scooters')
                              ? 'text-red-100' 
                              : 'text-charcoalGrey'
                          }`}>
                            {category.count} Products
                          </div>
                        </div>
                      </span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>

                {/* Filter Section */}
                <div className="mt-12 pt-8 border-t border-lightGrey2">
                  <h4 className="font-bold text-jetBlack mb-4">SORT BY</h4>
                  <select className="w-full border-2 border-lightGrey2 rounded-sm px-4 py-3 text-sm font-semibold focus:outline-none focus:border-hondaRed transition-colors">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Name: A to Z</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-jetBlack mb-2">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                  </h2>
                  <p className="text-charcoalGrey">Showing all {categoryTitle.toLowerCase()} available</p>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-32 h-32 bg-lightGrey1 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-16 h-16 text-charcoalGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-jetBlack mb-4">No Products Available</h3>
                  <p className="text-charcoalGrey text-lg mb-8">We're working on bringing you amazing {categoryTitle.toLowerCase()} soon.</p>
                  <Link 
                    to="/" 
                    className="bg-hondaRed text-white px-8 py-4 font-bold text-sm tracking-widest hover:bg-red-700 transition-colors inline-block"
                  >
                    EXPLORE OTHER CATEGORIES
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`}
                      className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-lightGrey2"
                    >
                      <div className="h-72 overflow-hidden bg-lightGrey1 relative">
                        <img 
                          src={Object.values(product.images)[0]} 
                          alt={product.name} 
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-6"
                        />
                        <div className="absolute top-4 left-4 bg-hondaRed text-white px-3 py-1 text-xs font-bold tracking-widest">
                          {product.category.toUpperCase()}
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-jetBlack group-hover:text-hondaRed transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-hondaRed font-bold text-xl">{product.price}*</span>
                        </div>
                        <p className="text-coolGrey text-sm mb-6">Ex-showroom Price New Delhi</p>
                        <div className="flex justify-between items-center border-t border-lightGrey2 pt-6">
                          <span className="text-sm font-bold tracking-widest text-jetBlack group-hover:text-hondaRed transition-colors border-b-2 border-transparent group-hover:border-hondaRed pb-1">
                            VIEW DETAILS
                          </span>
                          <div className="flex gap-2">
                             {product.colors.slice(0, 4).map(c => (
                               <div 
                                 key={c.name} 
                                 className="w-5 h-5 rounded-full border-2 border-lightGrey2 shadow-sm transition-transform group-hover:scale-110" 
                                 style={{ backgroundColor: c.hex }}
                                 title={c.name}
                               />
                             ))}
                             {product.colors.length > 4 && (
                               <span className="text-xs text-charcoalGrey font-semibold">+{product.colors.length - 4}</span>
                             )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Call to Action */}
              {filteredProducts.length > 0 && (
                <div className="text-center mt-16 py-12 bg-lightGrey1 rounded-lg">
                  <h3 className="text-2xl font-bold text-jetBlack mb-4">Ready to Experience {categoryTitle}?</h3>
                  <p className="text-charcoalGrey mb-8 max-w-2xl mx-auto">
                    Visit your nearest Kanade Honda dealership for a test ride and discover the perfect {categoryTitle.toLowerCase()} for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/dealers" 
                      className="bg-hondaRed text-white px-8 py-4 font-bold text-sm tracking-widest hover:bg-red-700 transition-colors"
                    >
                      FIND DEALER
                    </Link>
                    <button className="border-2 border-jetBlack text-jetBlack px-8 py-4 font-bold text-sm tracking-widest hover:bg-jetBlack hover:text-white transition-colors">
                      BOOK TEST RIDE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;