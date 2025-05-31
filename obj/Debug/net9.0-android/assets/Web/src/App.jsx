import { createSignal } from 'solid-js';
import WelcomeScreen from './components/WelcomeScreen';
import { HybridWebViewBridge } from './utils/HybridWebViewBridge';

function App() {
  const [selectedPlan, setSelectedPlan] = createSignal(null);

  const startNewPlan = () => {
    HybridWebViewBridge.sendMessage('Creating new plan');
    // This would navigate to the plan creation screen
  };

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    HybridWebViewBridge.sendMessage(`Selected plan: ${plan.name}`);
    // This would normally navigate to the plan details
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
