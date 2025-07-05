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
  const [showFilters, setShowFilters] = createSignal(false);

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

      return true;
    });
  });

  const hasActiveFilters = createMemo(() => {
    return difficultyFilter() !== 'all' || durationFilter() !== null;
  });

  const clearFilters = () => {
    setDifficultyFilter('all');
    setDurationFilter(null);
  };

  const availableDurations = createMemo(() => {
    const durations = new Set<number>();
    props.schedules.forEach(schedule => durations.add(schedule.duration));
    return Array.from(durations).sort((a, b) => a - b);
  });

  return (
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">Choose a Running Plan</h2>
        <button
          onClick={() => setShowFilters(!showFilters())}
          class={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            hasActiveFilters() || showFilters()
              ? 'bg-sky-100 text-sky-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
          <Show when={hasActiveFilters()}>
            <span class="ml-1 px-1.5 py-0.5 bg-sky-500 text-white rounded-full text-xs min-w-[16px] text-center">
              {(difficultyFilter() !== 'all' ? 1 : 0) + (durationFilter() !== null ? 1 : 0)}
            </span>
          </Show>
        </button>
      </div>

      <Show when={showFilters()}>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDifficultyFilter('all')}
                  class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    difficultyFilter() === 'all'
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => setDifficultyFilter('beginner')}
                  class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    difficultyFilter() === 'beginner'
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setDifficultyFilter('intermediate')}
                  class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    difficultyFilter() === 'intermediate'
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setDifficultyFilter('advanced')}
                  class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    difficultyFilter() === 'advanced'
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Advanced
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDurationFilter(null)}
                  class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    durationFilter() === null
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Any Duration
                </button>
                <For each={availableDurations()}>
                  {(duration) => (
                    <button
                      onClick={() => setDurationFilter(duration)}
                      class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        durationFilter() === duration
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {duration} weeks
                    </button>
                  )}
                </For>
              </div>
            </div>

            <Show when={hasActiveFilters()}>
              <div class="flex justify-end pt-2">
                <button
                  onClick={clearFilters}
                  class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </Show>
          </div>
        </div>
      </Show>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Show
          when={filteredSchedules().length > 0}
          fallback={
            <div class="col-span-full text-center py-8">
              <p class="text-gray-500">No running plans match your filters.</p>
              <button
                onClick={clearFilters}
                class="mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors"
              >
                Clear Filters
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