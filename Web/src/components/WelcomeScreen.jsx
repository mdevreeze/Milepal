import { createSignal } from 'solid-js';
import RunPlanCard from './RunPlanCard';

const WelcomeScreen = (props) => {
  const predefinedPlans = [
    {
      name: 'Beginner 5K',
      description: 'Perfect for new runners. Build up to running 5K in 8 weeks with a mix of walking and running.',
      features: ['3 runs per week', '8 weeks duration', 'Gradual progression'],
      level: 'Beginner',
      duration: '8 weeks',
      color: 'from-green-400 to-blue-500',
      distance: '5K'
    },
    {
      name: 'Intermediate 10K',
      description: 'For runners who can already run 5K. Improve your pace and endurance to conquer the 10K distance.',
      features: ['4 runs per week', '10 weeks duration', 'Includes speed work'],
      level: 'Intermediate',
      duration: '10 weeks',
      color: 'from-purple-400 to-pink-500',
      distance: '10K'
    },
    {
      name: 'Advanced Half Marathon',
      description: 'Challenge yourself with this intensive training plan designed to improve your half marathon time.',
      features: ['5 runs per week', '12 weeks duration', 'Advanced workouts'],
      level: 'Advanced',
      duration: '12 weeks',
      color: 'from-yellow-400 to-red-500',
      distance: '21K'
    }
  ];

  return (
    <div class="fade-in">
      <header class="mb-10 text-center">
        <h1 class="text-4xl font-bold mb-2 text-indigo-800">RunPlan</h1>
        <p class="text-xl text-gray-600">Your personal running journey starts here</p>
      </header>

      <main>
        <div class="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 class="text-2xl font-semibold mb-4">Welcome to RunPlan</h2>
          <p class="text-gray-600 mb-6">Whether you're just starting out or training for a marathon, we'll help you create the perfect running schedule tailored to your goals and fitness level.</p>

          <button 
            onClick={props.onStartNewPlan} 
            class="btn-primary text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Create Your Plan
          </button>
        </div>

        <h3 class="text-xl font-semibold mb-4">Quick Start with Templates</h3>
        <p class="text-gray-600 mb-6">Choose one of our popular training plans to get started immediately:</p>

        <div class="grid md:grid-cols-3 gap-6">
          {predefinedPlans.map((plan) => (
            <RunPlanCard 
              plan={plan} 
              onSelect={() => props.onSelectPlan(plan)} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WelcomeScreen;
