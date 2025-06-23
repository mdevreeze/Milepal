import { Component, createSignal, Show } from 'solid-js';
import { RunningSchedule, ScheduleInstance } from '../types';
import WeeklySchedule from '../components/WeeklySchedule';
import ScheduleDetailHeader from '../components/ScheduleDetailHeader';
import ScheduleSummary from '../components/ScheduleSummary';
import CalendarView from '../components/CalendarView';

interface ScheduleDetailProps {
  schedule: RunningSchedule;
  onBack: () => void;
  onStartSchedule: (startDate: Date) => void;
  activeSchedule: ScheduleInstance | null;
}

const ScheduleDetail: Component<ScheduleDetailProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<'schedule' | 'calendar'>('schedule');

  const isStarted = () => props.activeSchedule?.scheduleId === props.schedule.id;

  return (
    <div>
      <ScheduleDetailHeader 
        schedule={props.schedule} 
        onBack={props.onBack}
        onStartSchedule={props.onStartSchedule}
        activeSchedule={props.activeSchedule}
      />

      <div class="container mx-auto px-4 py-6">
        <Show when={!isStarted()}>
          <ScheduleSummary schedule={props.schedule} />
        </Show>

        {/* Tab Navigation */}
        <div class="flex border-b border-gray-200 mb-6">
          <button
            class={`py-2 px-4 font-medium ${activeTab() === 'schedule' ? 'text-sky-600 border-b-2 border-sky-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('schedule')}
          >
            Weekly Schedule
          </button>
          <Show when={isStarted()}>
            <button
              class={`py-2 px-4 font-medium ${activeTab() === 'calendar' ? 'text-sky-600 border-b-2 border-sky-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('calendar')}
            >
              Calendar View
            </button>
          </Show>
        </div>

        {/* Tab Content */}
        <div class={activeTab() === 'schedule' ? 'block' : 'hidden'}>
          <WeeklySchedule schedule={props.schedule} />
        </div>
        
        <Show when={isStarted()}>
          <div class={activeTab() === 'calendar' ? 'block' : 'hidden'}>
            <CalendarView 
              schedule={props.schedule} 
              activeSchedule={props.activeSchedule!} 
            />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default ScheduleDetail;
