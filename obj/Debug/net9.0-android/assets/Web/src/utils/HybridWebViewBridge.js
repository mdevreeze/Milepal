/**
 * Bridge for communicating with the MAUI HybridWebView
 */
export const HybridWebViewBridge = {
  /**
   * Send a message to the native app
   * @param {string} message - The message to send
   */
  sendMessage: (message) => {
    if (window.HybridWebView) {
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(10); // subtle vibration
      }
      window.HybridWebView.SendRawMessage(message);
    } else {
      console.log('HybridWebView not available:', message);
    }
  },

  /**
   * Trigger native haptic feedback
   * @param {string} type - The type of feedback: 'light', 'medium', or 'heavy'
   */
  hapticFeedback: (type = 'light') => {
    if (window.HybridWebView) {
      try {
        window.HybridWebView.InvokeDotNet('TriggerHapticFeedback', [type]);
      } catch (error) {
        // Fallback to browser vibration API
        if (navigator.vibrate) {
          switch(type) {
            case 'light': navigator.vibrate(10); break;
            case 'medium': navigator.vibrate(20); break;
            case 'heavy': navigator.vibrate([30, 30, 30]); break;
            default: navigator.vibrate(10);
          }
        }
      }
    }
  },

  /**
   * Check if app is running in a native container
   * @returns {boolean} - True if running in native container
   */
  isRunningNative: () => {
    return !!window.HybridWebView;
  },

  /**
   * Invoke a method in the native app
   * @param {string} methodName - The name of the method to invoke
   * @param {Array} params - Optional parameters to pass to the method
   * @returns {Promise<any>} - A promise that resolves with the return value from the native method
   */
  invokeNativeMethod: async (methodName, params = []) => {
    if (window.HybridWebView) {
      try {
        return await window.HybridWebView.InvokeDotNet(methodName, params);
      } catch (error) {
        console.error(`Error invoking ${methodName}:`, error);
        throw error;
      }
    } else {
      console.log(`HybridWebView not available for method: ${methodName}`);
      return null;
    }
  }
};

// Initialize event listener for messages from the native app
window.addEventListener('HybridWebViewMessageReceived', (e) => {
  console.log('Message from native app:', e.detail.message);
  // You can add custom handling here as needed
});
