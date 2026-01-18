import React, { useState } from 'react';
import EnquiryModal from '../components/EnquiryModal';
import { enquiryStore } from '../utils/enquiryStore';

const TestEnquiry: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiryCount, setEnquiryCount] = useState(0);

  const updateCount = () => {
    const stats = enquiryStore.getStats();
    setEnquiryCount(stats.total);
  };

  React.useEffect(() => {
    updateCount();
  }, []);

  return (
    <div className="min-h-screen bg-lightGrey1 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-jetBlack mb-4">Test Enquiry System</h1>
        
        <div className="bg-hondaRed text-white p-4 rounded-lg mb-6">
          <p className="text-lg font-bold">Total Enquiries: {enquiryCount}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-hondaRed text-white px-6 py-3 rounded-sm font-bold hover:bg-red-700 transition-colors"
          >
            Submit Test Enquiry
          </button>

          <button
            onClick={updateCount}
            className="w-full bg-gray-600 text-white px-6 py-3 rounded-sm font-bold hover:bg-gray-700 transition-colors"
          >
            Refresh Count
          </button>

          <a
            href="/#/admin"
            className="block w-full bg-green-600 text-white px-6 py-3 rounded-sm font-bold hover:bg-green-700 transition-colors"
          >
            Go to Admin Dashboard
          </a>
        </div>

        <div className="mt-6 p-4 bg-lightGrey1 rounded text-left">
          <h3 className="font-bold text-jetBlack mb-2">How to Test:</h3>
          <ol className="text-sm text-charcoalGrey space-y-1">
            <li>1. Click "Submit Test Enquiry"</li>
            <li>2. Fill out the form and submit</li>
            <li>3. Click "Refresh Count" to see updated total</li>
            <li>4. Go to Admin Dashboard to view the enquiry</li>
          </ol>
        </div>
      </div>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          updateCount();
        }} 
      />
    </div>
  );
};

export default TestEnquiry;