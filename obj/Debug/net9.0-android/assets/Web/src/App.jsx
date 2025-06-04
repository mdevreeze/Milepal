import { createSignal, onMount, onCleanup } from 'solid-js';
import WelcomeScreen from './components/WelcomeScreen';
import { HybridWebViewBridge } from './utils/HybridWebViewBridge';

function App() {
  const [selectedPlan, setSelectedPlan] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(false);
  const [networkStatus, setNetworkStatus] = createSignal('online');

  // Monitor network status for native-like behavior
  onMount(() => {
    const handleOnline = () => {
      setNetworkStatus('online');
      HybridWebViewBridge.sendMessage('Network connection restored');
    };

    const handleOffline = () => {
      setNetworkStatus('offline');
      HybridWebViewBridge.sendMessage('Network connection lost');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if app was launched from home screen
    if (window.navigator.standalone) {
      console.log('App running in standalone mode');
    }

    onCleanup(() => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    });
  });

  const startNewPlan = () => {
    setIsLoading(true);
    HybridWebViewBridge.hapticFeedback('medium');
    HybridWebViewBridge.sendMessage('Creating new plan');

    // Simulate loading delay for native feel
    setTimeout(() => {
      setIsLoading(false);
      // This would navigate to the plan creation screen
    }, 300);
  };

  const selectPlan = (plan) => {
    setIsLoading(true);
    HybridWebViewBridge.hapticFeedback('light');
    setSelectedPlan(plan);
    HybridWebViewBridge.sendMessage(`Selected plan: ${plan.name}`);

    // Simulate loading delay for native feel
    setTimeout(() => {
      setIsLoading(false);
      // This would normally navigate to the plan details
    }, 300);
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8">
      <WelcomeScreen 
        onStartNewPlan={startNewPlan}
        onSelectPlan={selectPlan}
      />

      <footer class="mt-16 text-center text-gray-500 text-sm">
        <p>© 2025 RunPlan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
