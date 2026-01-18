
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, MOTORCYCLE_MODELS, SCOOTER_MODELS } from '../constants';

interface HeaderProps {
  onEnquiryClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEnquiryClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDropdownToggle = (dropdown: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleProductClick = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-[100] border-b border-lightGrey2">
      <div className="container mx-auto px-4 md:px-8 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center -ml-12 mt-4">
          <div className="w-96 h-48 lg:w-[28rem] lg:h-56 flex items-center justify-center">
            <img 
              src="/assets/branding/logo.png" 
              alt="Kanade Honda Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          {NAV_LINKS.map((link) => (
            <div key={link.path} className="relative group h-full">
              {link.name === 'Motorcycles' ? (
                // Motorcycles with Dropdown
                <div className="relative h-full flex items-center">
                  <button
                    onClick={(e) => handleDropdownToggle('motorcycles', e)}
                    className={`relative h-full flex items-center text-sm font-semibold transition-colors gap-1 ${
                      activeDropdown === 'motorcycles' ? 'text-hondaRed' : 'text-jetBlack hover:text-hondaRed'
                    }`}
                  >
                    {link.name}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'motorcycles' ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hondaRed transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-100 rounded-lg transition-all duration-300 transform z-50 ${
                    activeDropdown === 'motorcycles' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}>
                    <div className="p-4">
                      <h3 className="text-hondaRed font-bold text-sm mb-3 border-b border-gray-100 pb-2">MOTORCYCLE MODELS</h3>
                      <div className="grid gap-1">
                        {MOTORCYCLE_MODELS.map((model) => (
                          <Link
                            key={model.path}
                            to={model.path}
                            onClick={handleProductClick}
                            className="block px-3 py-2 text-sm text-jetBlack hover:text-hondaRed hover:bg-gray-50 rounded transition-colors"
                          >
                            {model.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : link.name === 'Scooters' ? (
                // Scooters with Dropdown
                <div className="relative h-full flex items-center">
                  <button
                    onClick={(e) => handleDropdownToggle('scooters', e)}
                    className={`relative h-full flex items-center text-sm font-semibold transition-colors gap-1 ${
                      activeDropdown === 'scooters' ? 'text-hondaRed' : 'text-jetBlack hover:text-hondaRed'
                    }`}
                  >
                    {link.name}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'scooters' ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hondaRed transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-100 rounded-lg transition-all duration-300 transform z-50 ${
                    activeDropdown === 'scooters' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}>
                    <div className="p-4">
                      <h3 className="text-hondaRed font-bold text-sm mb-3 border-b border-gray-100 pb-2">SCOOTER MODELS</h3>
                      <div className="grid gap-1">
                        {SCOOTER_MODELS.map((model) => (
                          <Link
                            key={model.path}
                            to={model.path}
                            onClick={handleProductClick}
                            className="block px-3 py-2 text-sm text-jetBlack hover:text-hondaRed hover:bg-gray-50 rounded transition-colors"
                          >
                            {model.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular Navigation Links
                <Link
                  to={link.path}
                  className="relative group h-full flex items-center text-sm font-semibold text-jetBlack hover:text-hondaRed transition-colors"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hondaRed transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onEnquiryClick && onEnquiryClick()}
            className="hidden sm:flex bg-hondaRed text-white px-6 py-2.5 rounded-sm font-bold text-xs tracking-widest hover:bg-jetBlack transition-colors"
          >
            BOOK NOW
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-jetBlack"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Backdrop */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-jetBlack/50 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)} />
      
      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[120] transition-transform duration-500 ease-honda-ease ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <span className="text-hondaRed font-bold text-2xl">MENU</span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold text-jetBlack hover:text-hondaRed transition-colors flex items-center justify-between"
              >
                {link.name}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-10">
            <button 
              onClick={() => {
                onEnquiryClick && onEnquiryClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-hondaRed text-white py-4 rounded-sm font-bold text-lg hover:bg-jetBlack transition-colors"
            >
              BOOK TEST RIDE
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
