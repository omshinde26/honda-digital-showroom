export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'contacted' | 'converted' | 'closed';
}

class EnquiryStore {
  private enquiries: Enquiry[] = [];

  // Load enquiries from localStorage on initialization
  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('kanade-honda-enquiries');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.enquiries = parsed.map((e: any) => ({
          ...e,
          submittedAt: new Date(e.submittedAt)
        }));
      }
    } catch (error) {
      console.error('Error loading enquiries from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('kanade-honda-enquiries', JSON.stringify(this.enquiries));
      
      // Development warning
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ DEMO MODE: Enquiry data is saved locally only. In production, this should be sent to a backend server.');
      }
    } catch (error) {
      console.error('Error saving enquiries to storage:', error);
    }
  }

  addEnquiry(enquiryData: Omit<Enquiry, 'id' | 'submittedAt' | 'status'>): string {
    const enquiry: Enquiry = {
      ...enquiryData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      submittedAt: new Date(),
      status: 'new'
    };

    this.enquiries.unshift(enquiry); // Add to beginning for latest first
    this.saveToStorage();
    return enquiry.id;
  }

  getAllEnquiries(): Enquiry[] {
    return [...this.enquiries];
  }

  getEnquiryById(id: string): Enquiry | undefined {
    return this.enquiries.find(e => e.id === id);
  }

  updateEnquiryStatus(id: string, status: Enquiry['status']): boolean {
    const enquiry = this.enquiries.find(e => e.id === id);
    if (enquiry) {
      enquiry.status = status;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  deleteEnquiry(id: string): boolean {
    const index = this.enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      this.enquiries.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getEnquiriesByStatus(status: Enquiry['status']): Enquiry[] {
    return this.enquiries.filter(e => e.status === status);
  }

  getStats() {
    const total = this.enquiries.length;
    const new_ = this.enquiries.filter(e => e.status === 'new').length;
    const contacted = this.enquiries.filter(e => e.status === 'contacted').length;
    const converted = this.enquiries.filter(e => e.status === 'converted').length;
    const closed = this.enquiries.filter(e => e.status === 'closed').length;

    return { total, new: new_, contacted, converted, closed };
  }

  clearAll(): void {
    this.enquiries = [];
    this.saveToStorage();
  }
}

export const enquiryStore = new EnquiryStore();