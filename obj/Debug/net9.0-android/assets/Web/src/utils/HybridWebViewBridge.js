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
      window.HybridWebView.SendRawMessage(message);
    } else {
      console.log('HybridWebView not available:', message);
    }
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
