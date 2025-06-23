import { Component, For, Show, createSignal, createMemo } from 'solid-js';
import { DifficultyLevel, RunningSchedule } from '../types';
import ScheduleCard from './ScheduleCard';

interface ScheduleListProps {
  schedules: RunningSchedule[];
  onSelectSchedule: (schedule: RunningSchedule) => void;
}

const ScheduleList: Component<ScheduleListProps> = (props) => {
  const [difficultyFilter, setDifficultyFilter] = createSignal<DifficultyLevel | 'all'>('all');
  const [durationFilter, setDurationFilter] = createSignal<number | null>(null);
  const [searchQuery, setSearchQuery] = createSignal('');

  const filteredSchedules = createMemo(() => {
    return props.schedules.filter(schedule => {
      // Apply difficulty filter
      if (difficultyFilter() !== 'all' && schedule.difficulty !== difficultyFilter()) {
        return false;
      }

      // Apply duration filter
      if (durationFilter() !== null && schedule.duration !== durationFilter()) {
        return false;
      }

      // Apply search query
      const query = searchQuery().toLowerCase().trim();
      if (query && !schedule.name.toLowerCase().includes(query) && 
          !schedule.goal.toLowerCase().includes(query)) {
        return false;
      }

      return true;
    });
  });

  const availableDurations = createMemo(() => {
    const durations = new Set<number>();
    props.schedules.forEach(schedule => durations.add(schedule.duration));
    return Array.from(durations).sort((a, b) => a - b);
  });

  return (
    <div class="container mx-auto px-4 py-6">
      <h2 class="text-xl font-bold mb-6">Choose a Running Plan</h2>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by name or goal"
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div class="w-full md:w-1/4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={difficultyFilter()}
              onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel | 'all')}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div class="w-full md:w-1/4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select
              value={durationFilter() || ''}
              onChange={(e) => setDurationFilter(e.target.value ? parseInt(e.target.value) : null)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="">Any Duration</option>
              {availableDurations().map(duration => (
                <option value={duration}>{duration} weeks</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Show
          when={filteredSchedules().length > 0}
          fallback={
            <div class="col-span-full text-center py-8">
              <p class="text-gray-500">No running plans match your filters. Try adjusting your search criteria.</p>
              <button
                onClick={() => {
                  setDifficultyFilter('all');
                  setDurationFilter(null);
                  setSearchQuery('');
                }}
                class="mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          }
        >
          <For each={filteredSchedules()}>
            {(schedule) => (
              <ScheduleCard 
                schedule={schedule} 
                onSelect={props.onSelectSchedule} 
              />
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default ScheduleList;