// API Service for handling enquiry submissions
export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }

  async submitEnquiry(enquiryData: EnquiryData): Promise<ApiResponse> {
    try {
      console.log('📤 Submitting enquiry to API...');
      
      const response = await fetch(`${this.baseUrl}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...enquiryData,
          submittedAt: new Date().toISOString(),
          status: 'new'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Enquiry submitted successfully:', result.enquiryId);
      return result;

    } catch (error) {
      console.error('❌ API Error:', error);
      return {
        success: false,
        message: 'Failed to submit enquiry. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getEnquiries(): Promise<any> {
    try {
      console.log('📥 Fetching enquiries from API...');
      
      const response = await fetch(`${this.baseUrl}/enquiries`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Enquiries fetched successfully');
      
      return {
        success: true,
        data: result.data,
        statistics: result.statistics
      };
    } catch (error) {
      console.error('❌ Error fetching enquiries:', error);
      return {
        success: false,
        data: [],
        statistics: { total: 0, new: 0, contacted: 0, converted: 0, closed: 0 },
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async updateEnquiryStatus(enquiryId: string, status: string): Promise<ApiResponse> {
    try {
      console.log(`📝 Updating enquiry ${enquiryId} status to ${status}...`);
      
      const response = await fetch(`${this.baseUrl}/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Status updated successfully');
      return result;
    } catch (error) {
      console.error('❌ Error updating enquiry status:', error);
      return {
        success: false,
        message: 'Failed to update status',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async deleteEnquiry(enquiryId: string): Promise<ApiResponse> {
    try {
      console.log(`🗑️ Deleting enquiry ${enquiryId}...`);
      
      const response = await fetch(`${this.baseUrl}/enquiries/${enquiryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Enquiry deleted successfully');
      return result;
    } catch (error) {
      console.error('❌ Error deleting enquiry:', error);
      return {
        success: false,
        message: 'Failed to delete enquiry',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async login(username: string, password: string): Promise<ApiResponse> {
    try {
      console.log('🔐 Logging in...');
      
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data.token) {
        localStorage.setItem('admin_token', result.data.token);
        localStorage.setItem('admin_user', JSON.stringify(result.data.user));
        console.log('✅ Login successful');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please check your credentials.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    console.log('👋 Logged out');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token');
  }

  getAdminUser(): any {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  }

  private getAuthToken(): string {
    // In production, get auth token from secure storage
    return localStorage.getItem('admin_token') || '';
  }
}

export const apiService = new ApiService();