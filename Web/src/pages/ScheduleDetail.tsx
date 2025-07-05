import { Component, Show, onMount, createSignal } from 'solid-js';
import { RunningSchedule, ScheduleInstance } from '../types';
import WeeklySchedule from '../components/WeeklySchedule';
import ScheduleSummary from '../components/ScheduleSummary';
import { UserPreferences, loadUserPreferences } from '../utils/userPreferences';

interface ScheduleDetailProps {
  schedule: RunningSchedule;
  onBack: () => void;
  onStartSchedule: (startDate: Date) => void;
  activeSchedule: ScheduleInstance | null;
}

const ScheduleDetail: Component<ScheduleDetailProps> = (props) => {
  const [userPreferences, setUserPreferences] = createSignal<UserPreferences>(loadUserPreferences());

  // Load preferences on mount
  onMount(() => {
    const prefs = loadUserPreferences();
    setUserPreferences(prefs);
  });

  const isStarted = () => props.activeSchedule?.scheduleId === props.schedule.id;

  return (
    <div class="pb-20">
      <div class="px-4 py-6">
        <div class="flex items-center mb-6">
          <button
            onClick={props.onBack}
            class="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-xl font-semibold text-gray-900">{props.schedule.name}</h1>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div class="flex flex-col space-y-3">
            <p class="text-gray-600 text-sm">{props.schedule.goal || 'Improve your running performance'}</p>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class={`px-2 py-1 rounded-full text-xs font-semibold ${
                  props.schedule.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  props.schedule.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  props.schedule.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
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
                    onClick={() => {
                      const today = new Date();
                      props.onStartSchedule(today);
                    }}
                    class="px-4 py-2 bg-sky-500 text-white rounded-md font-medium hover:bg-sky-600 transition-colors text-sm"
                  >
                    Start Plan
                  </button>
                </Show>
              </div>
            </div>
          </div>
        </div>
        <Show when={!isStarted()}>
          <ScheduleSummary schedule={props.schedule} userPreferences={userPreferences()} />
        </Show>

        <div class="mt-6">
          <WeeklySchedule schedule={props.schedule} userPreferences={userPreferences()} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
