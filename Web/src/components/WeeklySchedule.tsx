import {Component, createMemo, createSignal} from 'solid-js';
import {RunningSchedule, WorkoutDay} from '../types';

interface WeeklyScheduleProps {
  schedule: RunningSchedule;
}

const WeeklySchedule: Component<WeeklyScheduleProps> = (props) => {
  const [currentWeek, setCurrentWeek] = createSignal(1);
  const [viewMode, setViewMode] = createSignal<'list' | 'calendar'>('list');

  const totalWeeks = () => props.schedule.duration || 1;

  const weeklyWorkouts = createMemo(() => {
    if (!props.schedule.workouts || !Array.isArray(props.schedule.workouts)) {
      return [];
    }

    const startDay = (currentWeek() - 1) * 7 + 1;
    const endDay = startDay + 6;

    return props.schedule.workouts.filter(
        workout => workout && workout.day >= startDay && workout.day <= endDay
    );
  });

  const getWorkoutForDay = (dayOfWeek: number): WorkoutDay | undefined => {
    const dayInSchedule = (currentWeek() - 1) * 7 + dayOfWeek + 1;
    return weeklyWorkouts().find(w => w.day === dayInSchedule);
  };

  const nextWeek = () => {
    if (currentWeek() < totalWeeks()) {
      const newWeek = currentWeek() + 1;
      setCurrentWeek(newWeek);
    }
  };

  const prevWeek = () => {
    if (currentWeek() > 1) {
      const newWeek = currentWeek() - 1;
      setCurrentWeek(newWeek);
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

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div class="w-full max-w-7xl mx-auto">
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
              onClick={() => prevWeek()} 
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
              onClick={() => nextWeek()} 
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
              {Object.entries(weekSummary().typeCounts).map(([type, count]) => {
                const typeStyle = (() => {
                  switch (type) {
                    case 'easy': return 'bg-green-100 text-green-800';
                    case 'tempo': return 'bg-yellow-100 text-yellow-800';
                    case 'intervals': return 'bg-red-100 text-red-800';
                    case 'long': return 'bg-purple-100 text-purple-800';
                    case 'rest': return 'bg-gray-100 text-gray-800';
                    case 'race': return 'bg-pink-100 text-pink-800';
                    default: return 'bg-sky-100 text-sky-700';
                  }
                })();
                return (
                  <span class={`text-xs px-2 py-0.5 ${typeStyle} rounded-full`}>
                    {type} ({count})
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Overview */}
      <div class="mb-12">
        <h3 class="text-lg font-semibold mb-2">Schedule Overview</h3>
        <p class="text-sm text-gray-500 mb-4">Click on a week to view its details</p>
        <div class="overflow-x-auto pb-4 -mx-2 md:mx-0 md:border md:border-gray-100 md:rounded-xl md:shadow-sm md:p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div class="w-full flex space-x-3 px-2 md:px-4 py-2">
            {Array.from({ length: totalWeeks() }).map((_, weekIndex) => {
              const weekNum = weekIndex + 1;
              const isCurrentWeek = currentWeek() === weekNum;
              const weekStartDay = (weekNum - 1) * 7 + 1;
              const weekEndDay = weekStartDay + 6;

              // Get all workouts for this week
              const thisWeekWorkouts = props.schedule.workouts.filter(
                workout => workout && workout.day >= weekStartDay && workout.day <= weekEndDay
              );

              // Calculate week totals
              const weekDistance = thisWeekWorkouts.reduce((sum, w) => sum + (w.distance || 0), 0);

              // Get dominant workout type
              const typeCounts: Record<string, number> = {};
              thisWeekWorkouts.forEach(w => {
                typeCounts[w.type] = (typeCounts[w.type] || 0) + 1;
              });

              // Find the most common type
              let dominantType = '';
              let maxCount = 0;
              Object.entries(typeCounts).forEach(([type, count]) => {
                if (count > maxCount && type !== 'rest') {
                  dominantType = type;
                  maxCount = count;
                }
              });

              // Style based on workout type
              const getTypeColor = (type: string) => {
                switch(type) {
                  case 'easy': return 'bg-green-100 border-green-300';
                  case 'long': return 'bg-purple-100 border-purple-300';
                  case 'tempo': return 'bg-yellow-100 border-yellow-300';
                  case 'intervals': return 'bg-red-100 border-red-300';
                  case 'race': return 'bg-pink-100 border-pink-300';
                  default: return 'bg-gray-100 border-gray-300';
                }
              };

              return (
                <div 
                  onClick={() => setCurrentWeek(weekNum)}
                  class={`cursor-pointer flex-shrink-0 w-24 h-32 rounded-lg border-2 flex flex-col justify-between p-3 transition-all ${isCurrentWeek ? 'ring-2 ring-sky-500 border-sky-500 transform scale-105' : `border-gray-200 hover:border-sky-300 ${dominantType ? getTypeColor(dominantType) : ''}`}`}
                >
                  <div class="text-center font-medium text-xs mb-2">
                    Week {weekNum}
                  </div>
                  <div class="text-center text-sm font-bold mb-2">
                    {weekDistance.toFixed(1)} km
                  </div>
                  <div class="flex justify-center gap-2 mt-auto">
                    {Object.keys(typeCounts).map(type => {
                      if (type !== 'rest') {
                        return (
                          <div 
                            class="w-3 h-3 rounded-full" 
                            style={`background-color: ${type === 'easy' ? '#22c55e' : 
                                                        type === 'long' ? '#9333ea' : 
                                                        type === 'tempo' ? '#eab308' : 
                                                        type === 'intervals' ? '#ef4444' : 
                                                        type === 'race' ? '#ec4899' : '#94a3b8'}`}
                            title={`${type}: ${typeCounts[type]}`}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Weekly View */}
      {viewMode() === 'list' ? (
        <div class="space-y-3">
          {weeklyWorkouts().map(workout => (
            <div class="border rounded-lg p-4 hover:shadow-md transition-shadow border-gray-200 bg-white shadow-sm">
              <div class="flex justify-between items-start">
                <div>
                  <div class="text-sm text-gray-500">
                    Day {workout.day}: {dayNames[(workout.day - 1) % 7]}
                  </div>
                  <div class="font-medium capitalize">
                    {workout.type} Run
                  </div>
                </div>
                <div class="flex space-x-2">
                  {workout.distance && (
                    <span class="inline-flex items-center text-sm px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700">
                      {workout.distance} km
                    </span>
                  )}
                  {workout.duration && (
                    <span class="inline-flex items-center text-sm px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700">
                      {workout.duration} min
                    </span>
                  )}
                </div>
              </div>
              <p class="text-sm text-gray-600 mt-2">{workout.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div class="grid grid-cols-7 gap-3">
          {Array.from({ length: 7 }).map((_, index) => {
            const workout = getWorkoutForDay(index);
            const isEmpty = !workout;

            return (
              <div class={`border rounded-lg ${isEmpty ? 'border-dashed border-gray-200 bg-gray-50' : 'border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow'} p-3 min-h-[150px]`}>
                <div class="text-sm font-medium mb-2">{dayNames[index]}</div>
                {!isEmpty ? (
                  <>
                    <div class={`inline-block px-2 py-1 rounded-full text-xs capitalize mb-2 ${(() => {
                      switch (workout.type) {
                        case 'easy': return 'bg-green-100 text-green-800';
                        case 'tempo': return 'bg-yellow-100 text-yellow-800';
                        case 'intervals': return 'bg-red-100 text-red-800';
                        case 'long': return 'bg-purple-100 text-purple-800';
                        case 'rest': return 'bg-gray-100 text-gray-800';
                        case 'race': return 'bg-pink-100 text-pink-800';
                        default: return 'bg-gray-100 text-gray-800';
                      }
                    })()}`}>
                      {workout.type}
                    </div>
                    <div class="flex flex-col gap-1 mt-1">
                      {workout.distance && (
                        <div class="text-sm inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 w-fit">
                          {workout.distance} km
                        </div>
                      )}
                      {workout.duration && (
                        <div class="text-sm inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 w-fit">
                          {workout.duration} min
                        </div>
                      )}
                    </div>
                    <p class="text-xs text-gray-600 mt-2 line-clamp-3">{workout.description}</p>
                  </>
                ) : (
                  <div class="flex items-center justify-center h-full text-sm text-gray-400">
                    Rest Day
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;
