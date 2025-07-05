import { Component, Show, For, createMemo, onMount, createSignal } from 'solid-js';
import { ScheduleInstance, RunningSchedule } from '../types';
import { getRecentWorkouts, getWorkoutTypeColor, getWorkoutTypeIcon, WorkoutWithSchedule } from '../utils/workoutUtils';
import { defaultSchedules } from '../data/schedules';
import { UserPreferences, loadUserPreferences, convertDistance, getDistanceUnitLabel } from '../utils/userPreferences';
import WorkoutRatingModal from '../components/WorkoutRatingModal';

interface ProgressProps {
  activeSchedule: ScheduleInstance | null;
  onClearSchedule?: () => void;
  onMarkWorkoutComplete?: (workoutKey: string, rating?: number, notes?: string) => void;
}

const Progress: Component<ProgressProps> = (props) => {
  const [userPreferences, setUserPreferences] = createSignal<UserPreferences>(loadUserPreferences());
  const [workoutToRate, setWorkoutToRate] = createSignal<WorkoutWithSchedule | null>(null);

  // Load preferences on mount
  onMount(() => {
    const prefs = loadUserPreferences();
    setUserPreferences(prefs);
  });

  const currentSchedule = createMemo(() => {
    if (!props.activeSchedule) return null;
    return defaultSchedules.find(s => s.id === props.activeSchedule!.scheduleId);
  });

  const recentWorkouts = createMemo(() => {
    if (!props.activeSchedule || !currentSchedule()) return [];
    return getRecentWorkouts(currentSchedule()!, props.activeSchedule!);
  });

  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 1) return `In ${diffDays} days`;
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div class="pb-20">
      <div class="px-4 py-6">
        <Show
          when={props.activeSchedule && currentSchedule()}
          fallback={
            <div class="text-center py-12">
              <div class="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold mb-2">No Active Plan</h2>
              <p class="text-gray-600 mb-6">Start a training plan to track your progress</p>
            </div>
          }
        >
          <div class="space-y-6">
            {/* Current Plan Summary */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold mb-4">{currentSchedule()?.name}</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-sky-600">
                    {props.activeSchedule?.completedWorkouts.size || 0}
                  </div>
                  <div class="text-sm text-gray-600">Completed</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-sky-600">
                    {Math.ceil((new Date().getTime() - props.activeSchedule!.startDate.getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div class="text-sm text-gray-600">Days Active</div>
                </div>
              </div>
            </div>

            {/* Recent Workouts */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold mb-4">Recent Workouts</h2>
              <div class="space-y-3">
                <For each={recentWorkouts()}>
                  {(workoutItem) => (
                    <div 
                      class={`p-4 rounded-lg border transition-all ${
                        workoutItem.isCompleted
                          ? 'bg-green-50 border-green-200'
                          : workoutItem.isPast
                          ? 'bg-red-50 border-red-200'
                          : workoutItem.isToday
                          ? 'bg-sky-50 border-sky-200 ring-2 ring-sky-100'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex-1">
                          <div class="flex items-center space-x-2 mb-2">
                            <span class="text-lg">{getWorkoutTypeIcon(workoutItem.workout.type)}</span>
                            <span class={`px-2 py-1 rounded-full text-xs font-medium ${getWorkoutTypeColor(workoutItem.workout.type)}`}>
                              {workoutItem.workout.type}
                            </span>
                            <span class="text-sm text-gray-600">
                              {formatDate(workoutItem.scheduledDate)}
                            </span>
                            <Show when={workoutItem.isToday}>
                              <span class="px-2 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-medium">
                                Today
                              </span>
                            </Show>
                          </div>
                          <p class="text-sm text-gray-700 mb-1">{workoutItem.workout.description}</p>
                          <Show when={workoutItem.workout.distance}>
                            <p class="text-xs text-gray-500">
                              Distance: {convertDistance(workoutItem.workout.distance!, userPreferences().distanceUnit).toFixed(1)}{getDistanceUnitLabel(userPreferences().distanceUnit)}
                            </p>
                          </Show>
                          <Show when={workoutItem.workout.duration}>
                            <p class="text-xs text-gray-500">
                              Duration: {workoutItem.workout.duration} minutes
                            </p>
                          </Show>
                          <Show when={workoutItem.completedData?.rating}>
                            <div class="flex items-center mt-2">
                              <span class="text-xs text-gray-500 mr-2">Rating:</span>
                              <div class="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <svg 
                                    class={`h-4 w-4 ${
                                      i < (workoutItem.completedData?.rating || 0) 
                                        ? 'text-yellow-400' 
                                        : 'text-gray-300'
                                    }`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </Show>
                        </div>
                        <div class="ml-4">
                          <Show
                            when={!workoutItem.isCompleted && (workoutItem.isPast || workoutItem.isToday)}
                            fallback={
                              <Show when={workoutItem.isCompleted}>
                                <div class="flex items-center text-green-600">
                                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                  </svg>
                                </div>
                              </Show>
                            }
                          >
                            <button
                              onClick={() => setWorkoutToRate(workoutItem)}
                              class="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-sm font-medium transition-colors"
                            >
                              Mark Complete
                            </button>
                          </Show>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>

            {/* Plan Management */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold mb-4">Plan Management</h2>
              <button
                onClick={() => props.onClearSchedule?.()}
                class="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
              >
                Stop Current Plan
              </button>
              <p class="text-sm text-gray-600 mt-2">
                This will clear your current progress and return you to plan selection.
              </p>
            </div>
          </div>
        </Show>
      </div>

      <WorkoutRatingModal
        isOpen={!!workoutToRate()}
        workout={workoutToRate()}
        onClose={() => setWorkoutToRate(null)}
        onSubmit={(rating, notes) => {
          const workout = workoutToRate();
          if (workout) {
            props.onMarkWorkoutComplete?.(workout.workoutKey, rating > 0 ? rating : undefined, notes);
          }
          setWorkoutToRate(null);
        }}
      />
    </div>
  );
};

export default Progress;