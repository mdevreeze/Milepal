import { Component, For, createSignal, createMemo } from 'solid-js';
import { RunningSchedule, WorkoutDay } from '../types';
import WorkoutItem from './WorkoutItem';

interface WeeklyScheduleProps {
  schedule: RunningSchedule;
}

const WeeklySchedule: Component<WeeklyScheduleProps> = (props) => {
  const [currentWeek, setCurrentWeek] = createSignal(1);
  const [viewMode, setViewMode] = createSignal<'list' | 'calendar'>('list');

  const totalWeeks = () => props.schedule.duration || 1;

  const weeklyWorkouts = createMemo(() => {
    if (!props.schedule.workouts || !Array.isArray(props.schedule.workouts)) {
      console.log('No workouts found or workouts is not an array', props.schedule);
      return [];
    }

    const startDay = (currentWeek() - 1) * 7 + 1;
    const endDay = startDay + 6;

    const filtered = props.schedule.workouts.filter(
      workout => workout && workout.day >= startDay && workout.day <= endDay
    );

    console.log(`Week ${currentWeek()}: Found ${filtered.length} workouts between days ${startDay}-${endDay}`);
    return filtered;
  });

  const getWorkoutForDay = (dayOfWeek: number): WorkoutDay | undefined => {
    const dayInSchedule = (currentWeek() - 1) * 7 + dayOfWeek + 1;
    return weeklyWorkouts().find(w => w.day === dayInSchedule);
  };

  const nextWeek = () => {
    if (currentWeek() < totalWeeks()) {
      setCurrentWeek(currentWeek() + 1);
    }
  };

  const prevWeek = () => {
    if (currentWeek() > 1) {
      setCurrentWeek(currentWeek() - 1);
    }
  };

  const weekSummary = createMemo(() => {
    const workouts = weeklyWorkouts();
    const totalDistance = workouts.reduce((sum, w) => sum + (w.distance || 0), 0);
    const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);

    const typeCounts: Record<string, number> = {};
    workouts.forEach(w => {
      typeCounts[w.type] = (typeCounts[w.type] || 0) + 1;
    });

    return {
      totalDistance,
      totalDuration,
      typeCounts
    };
  });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Weekly Schedule</h2>
        <div class="flex items-center">
          <div class="mr-4 flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('list')}
              class={`px-3 py-1 rounded-md text-sm ${viewMode() === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              class={`px-3 py-1 rounded-md text-sm ${viewMode() === 'calendar' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              Calendar
            </button>
          </div>

          <div class="flex items-center space-x-2">
            <button 
              onClick={prevWeek} 
              disabled={currentWeek() === 1}
              class="p-2 rounded-full bg-sky-100 text-sky-700 disabled:opacity-50"
              aria-label="Previous week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <span class="font-medium">Week {currentWeek()} of {totalWeeks()}</span>
            <button 
              onClick={nextWeek} 
              disabled={currentWeek() === totalWeeks()}
              class="p-2 rounded-full bg-sky-100 text-sky-700 disabled:opacity-50"
              aria-label="Next week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Week Summary Card */}
      <div class="bg-sky-50 p-4 rounded-lg mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span class="block text-sm text-gray-500">Total Distance</span>
            <span class="text-lg font-bold">{weekSummary().totalDistance} km</span>
          </div>
          <div>
            <span class="block text-sm text-gray-500">Total Duration</span>
            <span class="text-lg font-bold">{weekSummary().totalDuration} min</span>
          </div>
          <div>
            <span class="block text-sm text-gray-500">Workout Types</span>
            <div class="flex flex-wrap gap-1 mt-1">
              {Object.entries(weekSummary().typeCounts).map(([type, count]) => (
                <span class="text-xs px-2 py-0.5 bg-sky-100 text-sky-700 rounded-full">
                  {type} ({count})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* List View */}
      <div class={viewMode() === 'list' ? 'space-y-2' : 'hidden'}>
        <For each={[0, 1, 2, 3, 4, 5, 6]}>
          {(dayOfWeek) => {
            const workout = getWorkoutForDay(dayOfWeek);
            return workout ? (
              <WorkoutItem workout={workout} dayOfWeek={dayOfWeek} />
            ) : (
              <div class="bg-gray-50 rounded-lg p-4 mb-2 border border-gray-100">
                <div class="flex justify-between items-center">
                  <h3 class="font-medium">{dayNames[dayOfWeek]}</h3>
                  <span class="text-gray-400 text-sm">Rest Day</span>
                </div>
              </div>
            );
          }}
        </For>
      </div>

      {/* Calendar View */}
      <div class={viewMode() === 'calendar' ? 'grid grid-cols-7 gap-2' : 'hidden'}>
        {/* Day Headers */}
        {dayNames.map(day => (
          <div class="text-center font-medium text-sm py-2">
            {day.substring(0, 3)}
          </div>
        ))}

        {/* Day Cells */}
        <For each={[0, 1, 2, 3, 4, 5, 6]}>
          {(dayOfWeek) => {
            const workout = getWorkoutForDay(dayOfWeek);
            const dayNumber = (currentWeek() - 1) * 7 + dayOfWeek + 1;

            return (
              <div class={`border rounded-lg p-3 h-40 overflow-y-auto ${workout ? 
                workout.type === 'rest' ? 'bg-gray-50 border-gray-100' : 'bg-white border-sky-200 shadow-sm' 
                : 'bg-gray-50 border-gray-100'}`}>
                <div class="text-xs text-gray-500 mb-1 flex justify-between">
                  <span>Day {dayNumber}</span>
                  <span class="font-medium">{dayNames[dayOfWeek].substring(0, 3)}</span>
                </div>

                {workout ? (
                  <div>
                    <div class={`text-xs px-2 py-0.5 rounded-full inline-block mb-2 ${
                      workout.type === 'easy' ? 'bg-green-100 text-green-800' :
                      workout.type === 'tempo' ? 'bg-yellow-100 text-yellow-800' :
                      workout.type === 'interval' ? 'bg-red-100 text-red-800' :
                      workout.type === 'long' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {workout.type}
                    </div>

                    <div class="flex items-baseline gap-2 mb-1">
                      {workout.distance && (
                        <div class="text-sm font-medium">{workout.distance} km</div>
                      )}
                      {workout.duration && (
                        <div class="text-xs text-gray-500">{workout.duration} min</div>
                      )}
                    </div>

                    <p class="text-xs mt-1 text-gray-600 line-clamp-3">{workout.description}</p>
                  </div>
                ) : (
                  <div class="h-full flex items-center justify-center">
                    <p class="text-sm text-gray-400">Rest Day</p>
                  </div>
                )}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default WeeklySchedule;
