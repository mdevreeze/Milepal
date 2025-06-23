import { Component, For, createMemo } from 'solid-js';
import { RunningSchedule, ScheduleInstance, WorkoutDay } from '../types';

interface CalendarViewProps {
  schedule: RunningSchedule;
  activeSchedule: ScheduleInstance;
}

interface CalendarWeek {
  weekNumber: number;
  startDate: Date;
  days: CalendarDay[];
}

interface CalendarDay {
  date: Date;
  workout: WorkoutDay | null;
  isToday: boolean;
  isPast: boolean;
  isCurrentWeek: boolean;
}

const CalendarView: Component<CalendarViewProps> = (props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weeks = createMemo(() => {
    const startDate = new Date(props.activeSchedule.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const weeks: CalendarWeek[] = [];
    let currentDate = new Date(startDate);
    let workoutIndex = 0;

    for (let week = 1; week <= props.schedule.duration; week++) {
      const weekStartDate = new Date(currentDate);
      const days: CalendarDay[] = [];

      for (let day = 0; day < 7; day++) {
        const dayDate = new Date(currentDate);
        const workout = props.schedule.workouts[workoutIndex] || null;
        
        const isToday = dayDate.getTime() === today.getTime();
        const isPast = dayDate < today;
        const isCurrentWeek = Math.abs(today.getTime() - dayDate.getTime()) < 7 * 24 * 60 * 60 * 1000;

        days.push({
          date: dayDate,
          workout,
          isToday,
          isPast,
          isCurrentWeek
        });

        currentDate.setDate(currentDate.getDate() + 1);
        workoutIndex++;
      }

      weeks.push({
        weekNumber: week,
        startDate: weekStartDate,
        days
      });
    }

    return weeks;
  });

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'tempo': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'intervals': return 'bg-red-100 text-red-800 border-red-200';
      case 'long': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rest': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'race': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short' 
    });
  };

  return (
    <div class="space-y-8">
      <div class="text-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Training Calendar
        </h3>
        <p class="text-gray-600">
          Started on {props.activeSchedule.startDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <For each={weeks()}>
        {(week) => (
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-sky-50 px-6 py-3 border-b border-gray-200">
              <h4 class="font-medium text-sky-800">
                Week {week.weekNumber}
                <span class="text-sm text-sky-600 ml-2">
                  {formatDate(week.startDate)} - {formatDate(new Date(week.startDate.getTime() + 6 * 24 * 60 * 60 * 1000))}
                </span>
              </h4>
            </div>

            <div class="grid grid-cols-7 gap-px bg-gray-200">
              <For each={week.days}>
                {(day) => (
                  <div 
                    class={`bg-white p-3 min-h-[120px] ${
                      day.isToday ? 'ring-2 ring-sky-500 ring-inset' : ''
                    } ${
                      day.isPast ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div class="flex justify-between items-start mb-2">
                      <div class="text-xs text-gray-600">
                        {getDayName(day.date)}
                      </div>
                      <div class={`text-sm font-medium ${
                        day.isToday ? 'text-sky-700' : 
                        day.isPast ? 'text-gray-400' : 'text-gray-900'
                      }`}>
                        {day.date.getDate()}
                      </div>
                    </div>

                    {day.workout && (
                      <div class={`p-2 rounded text-xs border ${getWorkoutTypeColor(day.workout.type)}`}>
                        <div class="font-medium capitalize mb-1">
                          {day.workout.type}
                        </div>
                        {day.workout.distance && (
                          <div class="text-xs opacity-75">
                            {day.workout.distance}km
                          </div>
                        )}
                        {day.workout.duration && (
                          <div class="text-xs opacity-75">
                            {day.workout.duration}min
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </For>

      {/* Legend */}
      <div class="bg-gray-50 rounded-lg p-4">
        <h5 class="font-medium text-gray-900 mb-3">Workout Types</h5>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-100 border border-green-200 rounded mr-2"></div>
            Easy Run
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-orange-100 border border-orange-200 rounded mr-2"></div>
            Tempo Run
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-red-100 border border-red-200 rounded mr-2"></div>
            Intervals
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-100 border border-blue-200 rounded mr-2"></div>
            Long Run
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-gray-100 border border-gray-200 rounded mr-2"></div>
            Rest Day
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-purple-100 border border-purple-200 rounded mr-2"></div>
            Race Day
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;