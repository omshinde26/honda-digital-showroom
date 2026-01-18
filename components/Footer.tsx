
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-jetBlack text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-coolGrey pb-12">
        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-hondaRed">Products</h4>
          <ul className="space-y-4">
            <li><Link to="/category/ev" className="text-lightGrey2 hover:text-white transition-colors">Electric Vehicles</Link></li>
            <li><Link to="/category/scooters" className="text-lightGrey2 hover:text-white transition-colors">Scooters</Link></li>
            <li><Link to="/category/motorcycles" className="text-lightGrey2 hover:text-white transition-colors">Motorcycles</Link></li>
            <li><Link to="/parts" className="text-lightGrey2 hover:text-white transition-colors">Genuine Parts</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Dealer Network</h4>
          <ul className="space-y-4">
            <li><Link to="/dealers" className="text-lightGrey2 hover:text-white transition-colors">Find a Dealer</Link></li>
            <li><Link to="/become-dealer" className="text-lightGrey2 hover:text-white transition-colors">Become a Dealer</Link></li>
            <li><Link to="/dealer-portal" className="text-lightGrey2 hover:text-white transition-colors">Dealer Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Services</h4>
          <ul className="space-y-4">
            <li><Link to="/service" className="text-lightGrey2 hover:text-white transition-colors">Book Service</Link></li>
            <li><Link to="/warranty" className="text-lightGrey2 hover:text-white transition-colors">Warranty Policy</Link></li>
            <li><Link to="/roadside" className="text-lightGrey2 hover:text-white transition-colors">Roadside Assistance</Link></li>
            <li><Link to="/finance" className="text-lightGrey2 hover:text-white transition-colors">Kanade Honda Finance</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">About Kanade Honda</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-lightGrey2 hover:text-white transition-colors">Our Vision</Link></li>
            <li><Link to="/news" className="text-lightGrey2 hover:text-white transition-colors">Latest News</Link></li>
            <li><Link to="/careers" className="text-lightGrey2 hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="text-lightGrey2 hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-lightGrey2 text-sm">
          © {new Date().getFullYear()} Kanade Honda. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map(social => (
            <a key={social} href="#" className="text-lightGrey2 hover:text-hondaRed transition-all transform hover:scale-110">
              <span className="sr-only">{social}</span>
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-jetBlack rounded-full" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
