import { Component, Show, createEffect } from 'solid-js';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: Component<PrivacyPolicyModalProps> = (props) => {
  // Prevent background scrolling when modal is open
  createEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Show when={props.isOpen}>
      <div 
        class="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-8"
        style="position: fixed; top: 0; left: 0; right: 0; bottom: 0;"
      >
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        />
        
        <div class="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all">
          {/* Header */}
          <button
            onClick={props.onClose}
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Privacy Policy</h2>
            <p class="text-gray-600 text-sm">
              Your privacy matters to us. Learn how we protect your data.
            </p>
          </div>

          {/* Content */}
          <div class="p-6">
            <div class="prose prose-sm max-w-none text-gray-700 space-y-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-green-800">Privacy-First Approach</h3>
                    <p class="mt-1 text-sm text-green-700">
                      <strong>We don't track anything.</strong> All your data stays on your device, always.
                    </p>
                  </div>
                </div>
              </div>

              <section>
                <h3 class="text-lg font-semibold mb-3">What Data We Collect</h3>
                <p class="mb-3">
                  <strong>None.</strong> Milepal does not collect, store, or transmit any personal data to our servers or third parties.
                </p>
              </section>

              <section>
                <h3 class="text-lg font-semibold mb-3">Where Your Data is Stored</h3>
                <p class="mb-3">
                  All your data is stored locally on your device using your browser's localStorage. This includes:
                </p>
                <ul class="list-disc list-inside mb-3 space-y-1">
                  <li>Your running schedules and progress</li>
                  <li>Workout completion history and ratings</li>
                  <li>User preferences (distance units, etc.)</li>
                  <li>All training data and statistics</li>
                </ul>
                <p class="mb-3">
                  This data never leaves your device and is not accessible to us or anyone else.
                </p>
              </section>

              <section>
                <h3 class="text-lg font-semibold mb-3">No Tracking or Analytics</h3>
                <p class="mb-3">
                  We do not use:
                </p>
                <ul class="list-disc list-inside mb-3 space-y-1">
                  <li>Google Analytics or similar tracking services</li>
                  <li>Cookies for tracking purposes</li>
                  <li>Third-party advertising networks</li>
                  <li>Social media pixels or tracking scripts</li>
                  <li>Any form of user behavior monitoring</li>
                </ul>
              </section>

              <section>
                <h3 class="text-lg font-semibold mb-3">Data Portability</h3>
                <p class="mb-3">
                  Since all data is stored locally on your device:
                </p>
                <ul class="list-disc list-inside mb-3 space-y-1">
                  <li>You have complete control over your data</li>
                  <li>You can clear your data at any time through your browser settings</li>
                  <li>Uninstalling the app removes all associated data</li>
                  <li>We cannot recover your data if lost (because we never had access to it)</li>
                </ul>
              </section>

              <section>
                <h3 class="text-lg font-semibold mb-3">Third-Party Services</h3>
                <p class="mb-3">
                  RunScheduler operates entirely offline and does not integrate with any third-party services that could access your data.
                </p>
              </section>

              <div class="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-6">
                <p class="text-sm text-sky-800">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div class="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={props.onClose}
              class="flex-1 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default PrivacyPolicyModal;