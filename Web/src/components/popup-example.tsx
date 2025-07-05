import { useState } from 'react';

export default function PopupDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
      {/* Sample background content */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Sample Page Content</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Card 1</h2>
            <p className="text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Card 2</h2>
            <p className="text-white/90">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsOpen(true)}
          className="mt-8 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Open Popup
        </button>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popup content */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Popup header */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Popup Title</h3>
              <p className="text-gray-600">This is a centered popup with a blurred background effect.</p>
            </div>
            
            {/* Popup content */}
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                This popup is perfectly centered on the screen and uses Tailwind's backdrop-blur utility to create a beautiful blurred background effect.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Centered using Flexbox</li>
                  <li>• Blurred background with backdrop-blur</li>
                  <li>• Click outside to close</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
            
            {/* Popup actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}