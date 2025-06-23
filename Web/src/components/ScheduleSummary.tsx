import { Component, createMemo } from 'solid-js';
import { RunningSchedule, WorkoutType } from '../types';

interface ScheduleSummaryProps {
  schedule: RunningSchedule;
}

const ScheduleSummary: Component<ScheduleSummaryProps> = (props) => {
  const workoutTypeCounts = createMemo(() => {
    if (!props.schedule.workouts || !Array.isArray(props.schedule.workouts)) {
      return {};
    }

    const counts: Record<WorkoutType, number> = {
      easy: 0,
      tempo: 0,
      interval: 0,
      long: 0,
      rest: 0
    };

    props.schedule.workouts.forEach(workout => {
      if (workout.type in counts) {
        counts[workout.type]++;
      }
    });

    return counts;
  });

  const totalDistance = createMemo(() => {
    if (!props.schedule.workouts || !Array.isArray(props.schedule.workouts)) {
      return 0;
    }

    return props.schedule.workouts.reduce((total, workout) => {
      return total + (workout.distance || 0);
    }, 0);
  });

  const weeklyAvgDistance = createMemo(() => {
    if (props.schedule.duration <= 0) return 0;
    return (totalDistance() / props.schedule.duration).toFixed(1);
  });

  return (
    <div class="bg-sky-50 rounded-lg p-6 mb-8">
      <h2 class="text-xl font-bold mb-3">About This Plan</h2>
      <p class="text-gray-700 mb-5">
        This {props.schedule.difficulty || 'beginner'} level plan is designed to help you {props.schedule.goal ? props.schedule.goal.toLowerCase() : 'improve your running'}. 
        The plan spans {props.schedule.duration || 8} weeks with a structured approach to ensure balanced training and steady progress.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div class="bg-white p-4 rounded-md shadow-sm">
          <h3 class="font-medium text-gray-900 mb-2">Weekly Distance</h3>
          <p class="text-2xl font-bold text-sky-600">{weeklyAvgDistance()} km</p>
          <p class="text-sm text-gray-500">average per week</p>
        </div>

        <div class="bg-white p-4 rounded-md shadow-sm">
          <h3 class="font-medium text-gray-900 mb-2">Workout Mix</h3>
          <div class="flex gap-2 flex-wrap">
            {Object.entries(workoutTypeCounts()).map(([type, count]) => (
              count > 0 && (
                <span class="inline-flex items-center text-xs px-2 py-1 bg-sky-50 text-sky-700 rounded-full">
                  {type}: {count}
                </span>
              )
            ))}
          </div>
        </div>

        <div class="bg-white p-4 rounded-md shadow-sm">
          <h3 class="font-medium text-gray-900 mb-2">Total Distance</h3>
          <p class="text-2xl font-bold text-sky-600">{totalDistance()} km</p>
          <p class="text-sm text-gray-500">over {props.schedule.duration} weeks</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSummary;
