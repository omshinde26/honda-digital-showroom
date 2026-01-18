import React, { useState, useEffect } from 'react';
import { apiService } from '../utils/apiService';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  vehicle_type: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  submitted_at: string;
  updated_at?: string;
}

const AdminDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEnquiries();
  }, [filterStatus]);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getEnquiries();
      if (response.success) {
        const filteredEnquiries = filterStatus === 'all' 
          ? response.data 
          : response.data.filter((e: any) => e.status === filterStatus);
        
        setEnquiries(filteredEnquiries);
        setStats(response.statistics || { total: 0, new: 0, contacted: 0, converted: 0, closed: 0 });
      } else {
        setError(response.error || 'Failed to load enquiries');
      }
    } catch (err) {
      console.error('Error loading enquiries:', err);
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Enquiry['status']) => {
    try {
      const response = await apiService.updateEnquiryStatus(id, status);
      if (!response.success) {
        alert(`Error: ${response.message}`);
        return;
      }
      
      await loadEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update enquiry status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) {
      return;
    }

    try {
      const response = await apiService.deleteEnquiry(id);
      if (!response.success) {
        alert(`Error: ${response.message}`);
        return;
      }
      
      await loadEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear all enquiries? This action cannot be undone.')) {
      return;
    }

    try {
      // Note: This would require a bulk delete API endpoint in production
      alert('Bulk delete functionality requires individual deletion of each enquiry.');
    } catch (error) {
      console.error('Error clearing enquiries:', error);
      alert('Failed to clear enquiries');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-lightGrey1">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-lightGrey2">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-jetBlack">Admin Dashboard</h1>
              <p className="text-charcoalGrey mt-1">Kanade Honda Enquiry Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-charcoalGrey">Total Enquiries</p>
                <p className="text-2xl font-bold text-hondaRed">{stats.total}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-sm hover:bg-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-lightGrey2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoalGrey">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-lightGrey2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoalGrey">Contacted</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.contacted}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-lightGrey2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoalGrey">Converted</p>
                <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-lightGrey2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoalGrey">Closed</p>
                <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
      <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-bold text-jetBlack">Filter by Status:</h3>
            {['all', 'new', 'contacted', 'converted', 'closed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-sm font-semibold text-sm transition-colors ${
                  filterStatus === status
                    ? 'bg-hondaRed text-white'
                    : 'bg-lightGrey2 text-jetBlack hover:bg-lightGrey1'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-lg shadow-sm border border-lightGrey2 overflow-hidden">
          <div className="p-6 border-b border-lightGrey2">
            <h3 className="text-xl font-bold text-jetBlack">
              Enquiries ({enquiries.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-lightGrey2 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-charcoalGrey animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-charcoalGrey">Loading enquiries...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-600 font-semibold">{error}</p>
              <button 
                onClick={loadEnquiries}
                className="mt-4 px-4 py-2 bg-hondaRed text-white rounded-sm hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-lightGrey2 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-charcoalGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-charcoalGrey">No enquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-lightGrey1">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-jetBlack">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-jetBlack">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-jetBlack">Vehicle</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-jetBlack">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-jetBlack">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-jetBlack">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry, index) => (
                    <tr 
                      key={enquiry.id} 
                      className={`border-b border-lightGrey2 hover:bg-lightGrey1 cursor-pointer ${
                        selectedEnquiry?.id === enquiry.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedEnquiry(enquiry)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-jetBlack">{enquiry.name}</p>
                          <p className="text-sm text-charcoalGrey">{enquiry.city}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-jetBlack">{enquiry.phone}</p>
                          <p className="text-sm text-charcoalGrey">{enquiry.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-lightGrey2 text-jetBlack text-sm rounded-full font-medium">
                          {enquiry.vehicle_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(enquiry.status)}`}>
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoalGrey">
                        {formatDate(enquiry.submitted_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={enquiry.status}
                            onChange={(e) => handleStatusUpdate(enquiry.id, e.target.value as Enquiry['status'])}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm border border-lightGrey2 rounded px-2 py-1 focus:outline-none focus:border-hondaRed"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(enquiry.id);
                            }}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Enquiry Details Modal */}
        {selectedEnquiry && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="bg-hondaRed text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Enquiry Details</h3>
                    <p className="text-red-100 mt-1">ID: {selectedEnquiry.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-white hover:text-red-200 transition-colors p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-jetBlack mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <p><span className="font-semibold">Name:</span> {selectedEnquiry.name}</p>
                      <p><span className="font-semibold">Phone:</span> {selectedEnquiry.phone}</p>
                      <p><span className="font-semibold">Email:</span> {selectedEnquiry.email}</p>
                      <p><span className="font-semibold">City:</span> {selectedEnquiry.city}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-jetBlack mb-3">Enquiry Details</h4>
                    <div className="space-y-2">
                      <p><span className="font-semibold">Vehicle Type:</span> {selectedEnquiry.vehicle_type}</p>
                      <p><span className="font-semibold">Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-sm rounded ${getStatusColor(selectedEnquiry.status)}`}>
                          {selectedEnquiry.status}
                        </span>
                      </p>
                      <p><span className="font-semibold">Submitted:</span> {formatDate(selectedEnquiry.submitted_at)}</p>
                    </div>
                  </div>
                </div>

                {selectedEnquiry.message && (
                  <div>
                    <h4 className="font-bold text-jetBlack mb-3">Message</h4>
                    <div className="bg-lightGrey1 p-4 rounded border">
                      <p className="text-charcoalGrey">{selectedEnquiry.message}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4 border-t border-lightGrey2">
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="flex-1 px-6 py-3 border border-lightGrey2 text-jetBlack font-semibold rounded-sm hover:bg-lightGrey1 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-sm hover:bg-green-700 transition-colors text-center"
                  >
                    Call Customer
                  </a>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex-1 px-6 py-3 bg-hondaRed text-white font-bold rounded-sm hover:bg-red-700 transition-colors text-center"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;