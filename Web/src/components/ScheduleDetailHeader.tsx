import { Component } from 'solid-js';
import { RunningSchedule } from '../types';

interface ScheduleDetailHeaderProps {
  schedule: RunningSchedule;
  onBack: () => void;
}

const ScheduleDetailHeader: Component<ScheduleDetailHeaderProps> = (props) => {
  const difficultyColor = () => {
    switch (props.schedule.difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-white text-sky-800';
    }
  };

  return (
    <div class="bg-sky-500 text-white py-6 px-4">
      <div class="container mx-auto">
        <button 
          onClick={props.onBack}
          class="flex items-center text-white mb-4 hover:text-sky-100 transition-colors"
          aria-label="Back to plans"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Plans
        </button>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-2xl font-bold">{props.schedule.name || 'Running Plan'}</h1>
            <p class="text-sky-100 mt-2">{props.schedule.goal || 'Improve your running performance'}</p>

            <div class="flex items-center mt-4">
              <span class={`${difficultyColor()} text-xs px-2 py-1 rounded-full font-semibold mr-3`}>
                {props.schedule.difficulty}
              </span>
              <span class="text-sky-100 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {props.schedule.duration} weeks
              </span>
            </div>
          </div>

          <div class="mt-6 md:mt-0">
            <button
              onClick={() => {
                // Future feature: start the plan, creating a copy linked to the user
                alert(`Starting plan: ${props.schedule.name}\nThis feature will be available soon!`);
              }}
              class="px-4 py-2 bg-white text-sky-700 rounded-md font-medium hover:bg-sky-50 transition-colors"
            >
              Start This Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailHeader;
