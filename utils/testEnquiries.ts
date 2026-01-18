import { enquiryStore } from './enquiryStore';

// Function to add sample enquiries for testing
export const addSampleEnquiries = () => {
  const sampleEnquiries = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      vehicleType: 'scooter',
      message: 'I am interested in Activa 125. Please provide more details about pricing and availability.'
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      city: 'Delhi',
      vehicleType: 'motorcycle',
      message: 'Looking for a motorcycle for daily commute. Need information about CB 200X.'
    },
    {
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      city: 'Bangalore',
      vehicleType: 'ev',
      message: 'Interested in electric vehicles. When will Honda EV be available in Bangalore?'
    },
    {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 65432 10987',
      city: 'Hyderabad',
      vehicleType: 'scooter',
      message: 'Want to book a test ride for Grazia 125. Please contact me.'
    }
  ];

  sampleEnquiries.forEach(enquiry => {
    enquiryStore.addEnquiry(enquiry);
  });

  console.log('Sample enquiries added successfully!');
};

// Function to clear all enquiries (for testing)
export const clearAllEnquiries = () => {
  localStorage.removeItem('kanade-honda-enquiries');
  console.log('All enquiries cleared!');
};