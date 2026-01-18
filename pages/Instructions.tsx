import React from 'react';

const Instructions: React.FC = () => {
  const currentUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-lightGrey1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-jetBlack mb-2">Kanade Honda Enquiry System</h1>
            <p className="text-charcoalGrey">Complete Testing Instructions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current Server Info */}
            <div className="bg-hondaRed text-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">🌐 Current Server</h2>
              <p className="mb-2"><strong>URL:</strong> {currentUrl}</p>
              <p className="mb-2"><strong>Status:</strong> ✅ Running</p>
              <p className="text-red-100 text-sm">Make sure to use this URL for all testing!</p>
            </div>

            {/* Quick Links */}
            <div className="bg-green-600 text-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">🔗 Quick Links</h2>
              <div className="space-y-2">
                <a href="/" className="block bg-white/20 px-3 py-2 rounded hover:bg-white/30 transition-colors">
                  🏠 Homepage
                </a>
                <a href="/#/admin" className="block bg-white/20 px-3 py-2 rounded hover:bg-white/30 transition-colors">
                  👨‍💼 Admin Dashboard
                </a>
                <a href="/#/test-enquiry" className="block bg-white/20 px-3 py-2 rounded hover:bg-white/30 transition-colors">
                  🧪 Test Page
                </a>
              </div>
            </div>
          </div>

          {/* Step by Step Instructions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-jetBlack mb-6">📋 Step-by-Step Testing</h2>
            
            <div className="space-y-6">
              {/* Method 1 */}
              <div className="border border-lightGrey2 rounded-lg p-6">
                <h3 className="text-lg font-bold text-hondaRed mb-3">Method 1: Test from Homepage</h3>
                <ol className="list-decimal list-inside space-y-2 text-charcoalGrey">
                  <li>Go to: <a href="/" className="text-hondaRed font-semibold hover:underline">{currentUrl}/</a></li>
                  <li>Click the <strong>"BOOK NOW"</strong> button in the header</li>
                  <li>Fill out the enquiry form completely</li>
                  <li>Click <strong>"SUBMIT ENQUIRY"</strong></li>
                  <li>Note the Enquiry ID in the success message</li>
                  <li>Go to: <a href="/#/admin" className="text-hondaRed font-semibold hover:underline">{currentUrl}/#/admin</a></li>
                  <li>Login with: <strong>admin</strong> / <strong>kanade123</strong></li>
                  <li>Your enquiry should appear in the dashboard!</li>
                </ol>
              </div>

              {/* Method 2 */}
              <div className="border border-lightGrey2 rounded-lg p-6">
                <h3 className="text-lg font-bold text-hondaRed mb-3">Method 2: Test from Floating Button</h3>
                <ol className="list-decimal list-inside space-y-2 text-charcoalGrey">
                  <li>Go to: <a href="/" className="text-hondaRed font-semibold hover:underline">{currentUrl}/</a></li>
                  <li>Click the <strong>blue floating button</strong> (bottom-right)</li>
                  <li>Click <strong>"Enquire"</strong> from the expanded options</li>
                  <li>Fill out and submit the form</li>
                  <li>Check admin dashboard for the new enquiry</li>
                </ol>
              </div>

              {/* Method 3 */}
              <div className="border border-lightGrey2 rounded-lg p-6">
                <h3 className="text-lg font-bold text-hondaRed mb-3">Method 3: Use Test Page</h3>
                <ol className="list-decimal list-inside space-y-2 text-charcoalGrey">
                  <li>Go to: <a href="/#/test-enquiry" className="text-hondaRed font-semibold hover:underline">{currentUrl}/#/test-enquiry</a></li>
                  <li>Click <strong>"Submit Test Enquiry"</strong></li>
                  <li>Fill out and submit the form</li>
                  <li>Click <strong>"Refresh Count"</strong> to see updated total</li>
                  <li>Click <strong>"Go to Admin Dashboard"</strong></li>
                </ol>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-800 mb-4">⚠️ Troubleshooting</h2>
            <div className="space-y-2 text-yellow-700">
              <p><strong>Issue:</strong> Enquiries not showing in admin dashboard</p>
              <p><strong>Solution:</strong> Make sure you're using the same URL ({currentUrl}) for both submitting and viewing enquiries</p>
              <p><strong>Note:</strong> LocalStorage is domain-specific. Different ports (3000 vs 3001) have separate storage!</p>
            </div>
          </div>

          {/* Admin Credentials */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-blue-800 mb-4">🔐 Admin Credentials</h2>
            <div className="text-blue-700">
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> kanade123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;