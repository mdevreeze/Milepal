const RunPlanCard = (props) => {
  const { plan, onSelect } = props;

  return (
    <div class="plan-card bg-white rounded-xl shadow-md overflow-hidden slide-up">
      <div class={`h-40 bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
        <span class="text-3xl font-bold text-white">{plan.distance}</span>
      </div>
      <div class="p-6">
        <h4 class="font-semibold text-lg mb-2">{plan.name}</h4>
        <p class="text-gray-600 mb-4">{plan.description}</p>
        <ul class="text-sm text-gray-600 mb-4">
          {plan.features.map((feature) => (
            <li class="flex items-center mb-1">
              <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button 
          onClick={onSelect} 
          class="w-full py-2 px-4 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition-colors"
        >
          Start This Plan
        </button>
      </div>
    </div>
  );
};

export default RunPlanCard;
