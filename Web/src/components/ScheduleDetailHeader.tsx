import { Component, createSignal, Show } from 'solid-js';
import { RunningSchedule, ScheduleInstance } from '../types';
import DatePicker from './DatePicker';

interface ScheduleDetailHeaderProps {
  schedule: RunningSchedule;
  onBack: () => void;
  onStartSchedule: (startDate: Date) => void;
  activeSchedule: ScheduleInstance | null;
}

const ScheduleDetailHeader: Component<ScheduleDetailHeaderProps> = (props) => {
  const [showDatePicker, setShowDatePicker] = createSignal(false);

  const difficultyColor = () => {
    switch (props.schedule.difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-white text-sky-800';
    }
  };

  const handleStartPlan = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (date: Date) => {
    props.onStartSchedule(date);
    setShowDatePicker(false);
  };

  const handleCancel = () => {
    setShowDatePicker(false);
  };

  const isStarted = () => props.activeSchedule?.scheduleId === props.schedule.id;

  return (
    <>
      <div class="bg-white px-4 py-4 border-b border-gray-200">
        <div class="flex flex-col space-y-3">
          <p class="text-gray-600 text-sm">{props.schedule.goal || 'Improve your running performance'}</p>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class={`${difficultyColor()} text-xs px-2 py-1 rounded-full font-semibold`}>
                {props.schedule.difficulty}
              </span>
              <span class="text-gray-600 flex items-center text-sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {props.schedule.duration} weeks
              </span>
            </div>

            <div>
              <Show
                when={!isStarted()}
                fallback={
                  <div class="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-md text-sm">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Started
                  </div>
                }
              >
                <button
                  onClick={handleStartPlan}
                  class="px-4 py-2 bg-sky-500 text-white rounded-md font-medium hover:bg-sky-600 transition-colors text-sm"
                >
                  Start Plan
                </button>
              </Show>
            </div>
          </div>
        </div>
      </div>
      
      <Show when={showDatePicker()}>
        <DatePicker
          onDateSelect={handleDateSelect}
          onCancel={handleCancel}
        />
      </Show>
    </>
  );
};

export default ScheduleDetailHeader;
