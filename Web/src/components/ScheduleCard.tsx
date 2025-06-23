import { Component, createMemo } from 'solid-js';
import { RunningSchedule, WorkoutType } from '../types';

interface ScheduleCardProps {
  schedule: RunningSchedule;
  onSelect: (schedule: RunningSchedule) => void;
}

const ScheduleCard: Component<ScheduleCardProps> = (props) => {
  const difficultyColor = () => {
    switch (props.schedule.difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const workoutTypes = createMemo(() => {
    if (!props.schedule.workouts || !Array.isArray(props.schedule.workouts)) {
      return [];
    }

    // Get unique workout types excluding rest days
    const types = new Set<WorkoutType>();
    props.schedule.workouts.forEach(workout => {
      if (workout.type !== 'rest') {
        types.add(workout.type);
      }
    });

    return Array.from(types);
  });

  const workoutTypeIcons = {
    easy: '🚶‍♂️',
    tempo: '⏱️',
    interval: '🔄',
    long: '🏃‍♀️',
  };

  return (
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div class="p-5">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-bold">{props.schedule.name}</h3>
          <span class={`text-xs px-2 py-1 rounded-full uppercase font-semibold ${difficultyColor()}`}>
            {props.schedule.difficulty}
          </span>
        </div>

        <p class="text-gray-600 mb-3">{props.schedule.goal}</p>

        <div class="flex flex-col gap-2 mb-4">
          <div class="flex items-center text-gray-500 text-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{props.schedule.duration} weeks</span>
          </div>

          <div class="flex flex-wrap gap-1">
            {workoutTypes().map(type => (
              <span class="inline-flex items-center text-xs px-2 py-1 bg-sky-50 text-sky-700 rounded-full">
                <span class="mr-1">{workoutTypeIcons[type] || '🏃'}</span>
                {type}
              </span>
            ))}
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <button 
            onClick={() => props.onSelect(props.schedule)}
            class="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md transition-colors font-medium"
          >
            Select Plan
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Future feature: preview plan details in a modal
              alert(`Preview coming soon for ${props.schedule.name}`);
            }}
            class="w-full bg-white hover:bg-gray-50 text-sky-600 border border-sky-500 py-2 px-4 rounded-md transition-colors"
          >
            Preview Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
