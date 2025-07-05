import { Component, createSignal } from 'solid-js';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasActiveSchedule: boolean;
}

const BottomNavigation: Component<BottomNavigationProps> = (props) => {
  const tabs = [
    {
      id: 'schedules',
      label: 'Schedules',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="flex justify-around items-center h-16 safe-area-inset-bottom">
        {tabs.map((tab) => (
          <button
            onClick={() => props.onTabChange(tab.id)}
            class={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
              props.activeTab === tab.id
                ? 'text-sky-600 bg-sky-50'
                : tab.id === 'progress' && !props.hasActiveSchedule
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-sky-600'
            }`}
            disabled={tab.id === 'progress' && !props.hasActiveSchedule}
          >
            <div class="mb-1">
              {tab.icon}
            </div>
            <span class="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;