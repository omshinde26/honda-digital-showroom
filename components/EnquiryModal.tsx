import React, { useState } from 'react';
import { apiService, type EnquiryData } from '../utils/apiService';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const enquiryData: EnquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        vehicleType: formData.vehicleType,
        message: formData.message
      };

      console.log('🚀 Submitting enquiry via API...');
      const response = await apiService.submitEnquiry(enquiryData);

      if (response.success) {
        setSubmitStatus('success');
        console.log('✅ Enquiry submitted successfully:', response.enquiryId);
        
        // Show success message
        alert(`Thank you ${formData.name}! Your enquiry has been submitted successfully.

Enquiry ID: ${response.enquiryId}
We will contact you soon at ${formData.phone}.

You can check the status by contacting our admin team.`);
        // Reset form and close modal
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          vehicleType: '',
          message: ''
        });
        
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 500);
        
      } else {
        setSubmitStatus('error');
        console.error('❌ API Error:', response.error);
        alert(`Error: ${response.message}\n\nPlease try again or contact us directly.`);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('💥 Submission Error:', error);
      alert('There was an unexpected error submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-hondaRed text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">BOOK YOUR RIDE</h2>
              <p className="text-red-100 mt-1">Get in touch with Kanade Honda</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-jetBlack mb-4 border-b border-lightGrey2 pb-2">
              PERSONAL INFORMATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-jetBlack mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-jetBlack mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-jetBlack mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-jetBlack mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors"
                  placeholder="Your city"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Interest */}
          <div>
            <h3 className="text-lg font-bold text-jetBlack mb-4 border-b border-lightGrey2 pb-2">
              VEHICLE INTEREST
            </h3>
            <div>
              <label className="block text-sm font-semibold text-jetBlack mb-2">
                Interested Vehicle Type *
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors"
              >
                <option value="">Select vehicle type</option>
                <option value="scooter">Scooter</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="ev">Electric Vehicle</option>
              </select>
            </div>
          </div>

          {/* Additional Message */}
          <div>
            <label className="block text-sm font-semibold text-jetBlack mb-2">
              Additional Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors resize-none"
              placeholder="Tell us more about your requirements..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-lightGrey2 text-jetBlack font-semibold rounded-sm hover:bg-lightGrey1 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 font-bold rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : submitStatus === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : submitStatus === 'error'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-hondaRed text-white hover:bg-red-700 hover:scale-105 active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SUBMITTING...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SUBMITTED!
                </>
              ) : submitStatus === 'error' ? (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  RETRY
                </>
              ) : (
                'SUBMIT ENQUIRY'
              )}
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-lightGrey1 p-4 rounded-sm mt-6">
            <h4 className="font-bold text-jetBlack mb-2">CONTACT INFORMATION</h4>
            <div className="text-sm text-charcoalGrey space-y-1">
              <p>📞 Call: +91 98765 43210</p>
              <p>📧 Email: info@kanadehonda.com</p>
              <p>🕒 Business Hours: Mon-Sat 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;