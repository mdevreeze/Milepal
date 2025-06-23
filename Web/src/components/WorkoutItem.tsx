import { Component } from 'solid-js';
import { WorkoutDay } from '../types';

interface WorkoutItemProps {
  workout: WorkoutDay;
  dayOfWeek: number;
}

const WorkoutItem: Component<WorkoutItemProps> = (props) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const workoutTypeStyles = () => {
    switch (props.workout.type) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'tempo': return 'bg-yellow-100 text-yellow-800';
      case 'intervals': return 'bg-red-100 text-red-800';
      case 'long': return 'bg-purple-100 text-purple-800';
      case 'rest': return 'bg-gray-100 text-gray-800';
      case 'race': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-2">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500">{weekdays[props.dayOfWeek]}</p>
          <h3 class="font-medium">
            <span class={`inline-block px-2 py-1 rounded-full text-xs font-semibold mr-2 ${workoutTypeStyles()}`}>
              {props.workout.type}
            </span>
            {props.workout.distance && `${props.workout.distance} km`}
            {props.workout.duration && ` (${props.workout.duration} min)`}
          </h3>
        </div>
      </div>
      <p class="text-gray-700 text-sm mt-2">{props.workout.description}</p>
    </div>
  );
};

export default WorkoutItem;
