
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import EnquiryModal from './components/EnquiryModal';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Activa125 from './pages/Activa125';
import CategoryPage from './pages/CategoryPage';
import DealerLocatorPage from './pages/DealerLocatorPage';
import Admin from './pages/Admin';
import TestEnquiry from './pages/TestEnquiry';
import Instructions from './pages/Instructions';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Route - No Header/Footer */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Regular Routes - With Header/Footer */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen">
            <Header onEnquiryClick={() => setIsEnquiryModalOpen(true)} />
            <main className="flex-grow pt-16 lg:pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/activa-125" element={<Activa125 />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/category/:type" element={<CategoryPage />} />
                <Route path="/dealers" element={<DealerLocatorPage />} />
                <Route path="/test-enquiry" element={<TestEnquiry />} />
                <Route path="/instructions" element={<Instructions />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Floating Action Button */}
            <FloatingActionButton onEnquiryClick={() => setIsEnquiryModalOpen(true)} />
            
            {/* Global Enquiry Modal */}
            <EnquiryModal 
              isOpen={isEnquiryModalOpen} 
              onClose={() => setIsEnquiryModalOpen(false)} 
            />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
