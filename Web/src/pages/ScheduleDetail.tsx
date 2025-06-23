import { Component, createSignal } from 'solid-js';
import { RunningSchedule, UserPreferences } from '../types';
import WeeklySchedule from '../components/WeeklySchedule';
import UserPreferencesForm from '../components/UserPreferencesForm';
import ScheduleDetailHeader from '../components/ScheduleDetailHeader';
import ScheduleSummary from '../components/ScheduleSummary';

interface ScheduleDetailProps {
  schedule: RunningSchedule;
  userPreferences?: UserPreferences;
  onSavePreferences: (preferences: UserPreferences) => void;
  onBack: () => void;
}

const ScheduleDetail: Component<ScheduleDetailProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<'schedule' | 'preferences'>('schedule');

  return (
    <div>
      <ScheduleDetailHeader 
        schedule={props.schedule} 
        onBack={props.onBack} 
      />

      <div class="container mx-auto px-4 py-6">
        <ScheduleSummary schedule={props.schedule} />

        {/* Tab Navigation */}
        <div class="flex border-b border-gray-200 mb-6">
          <button
            class={`py-2 px-4 font-medium ${activeTab() === 'schedule' ? 'text-sky-600 border-b-2 border-sky-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('schedule')}
          >
            Weekly Schedule
          </button>
          <button
            class={`py-2 px-4 font-medium ${activeTab() === 'preferences' ? 'text-sky-600 border-b-2 border-sky-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('preferences')}
          >
            Your Preferences
          </button>
        </div>

        {/* Tab Content */}
        <div class={activeTab() === 'schedule' ? 'block' : 'hidden'}>
          <WeeklySchedule schedule={props.schedule} />
        </div>

        <div class={activeTab() === 'preferences' ? 'block' : 'hidden'}>
          <UserPreferencesForm 
            initialPreferences={props.userPreferences}
            onSave={props.onSavePreferences}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
