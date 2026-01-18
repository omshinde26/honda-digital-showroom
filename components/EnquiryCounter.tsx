import React, { useState, useEffect } from 'react';
import { enquiryStore } from '../utils/enquiryStore';

const EnquiryCounter: React.FC = () => {
  const [newEnquiries, setNewEnquiries] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const stats = enquiryStore.getStats();
      setNewEnquiries(stats.new);
    };

    // Update count initially
    updateCount();

    // Update count every 5 seconds to catch new enquiries
    const interval = setInterval(updateCount, 5000);

    return () => clearInterval(interval);
  }, []);

  if (newEnquiries === 0) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-hondaRed text-white px-4 py-2 rounded-full shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold">
          {newEnquiries} New Enquir{newEnquiries === 1 ? 'y' : 'ies'}
        </span>
      </div>
    </div>
  );
};

export default EnquiryCounter;