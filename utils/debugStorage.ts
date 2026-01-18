// Debug utility to check localStorage contents
export const debugStorage = () => {
  console.log('=== LocalStorage Debug ===');
  console.log('Current URL:', window.location.href);
  console.log('All localStorage keys:', Object.keys(localStorage));
  
  const enquiryData = localStorage.getItem('kanade-honda-enquiries');
  if (enquiryData) {
    try {
      const parsed = JSON.parse(enquiryData);
      console.log('Enquiry data found:', parsed);
      console.log('Number of enquiries:', parsed.length);
    } catch (error) {
      console.log('Error parsing enquiry data:', error);
    }
  } else {
    console.log('No enquiry data found in localStorage');
  }
  console.log('========================');
};

// Add to window for easy access in browser console
(window as any).debugStorage = debugStorage;