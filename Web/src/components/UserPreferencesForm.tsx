import { Component, createSignal, createEffect } from 'solid-js';
import { UserPreferences } from '../types';

interface UserPreferencesFormProps {
  onSave: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences;
}

const UserPreferencesForm: Component<UserPreferencesFormProps> = (props) => {
  const defaultPreferences: UserPreferences = {
    preferredUnit: 'km',
    restDays: [0, 6], // Sunday and Saturday by default
  };

  const [preferences, setPreferences] = createSignal<UserPreferences>(
    props.initialPreferences || defaultPreferences
  );

  const [weeklyDistance, setWeeklyDistance] = createSignal<string>(
    preferences().weeklyDistance?.toString() || ''
  );

  const [savedSuccess, setSavedSuccess] = createSignal(false);

  createEffect(() => {
    if (props.initialPreferences) {
      setPreferences(props.initialPreferences);
      setWeeklyDistance(props.initialPreferences.weeklyDistance?.toString() || '');
    }
  });

  const handleUnitChange = (unit: 'km' | 'mi') => {
    setPreferences(prev => ({ ...prev, preferredUnit: unit }));
  };

  const handleDistanceChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setWeeklyDistance(target.value);

    const distance = parseInt(target.value);
    if (!isNaN(distance)) {
      setPreferences(prev => ({ ...prev, weeklyDistance: distance }));
    } else {
      setPreferences(prev => {
        const { weeklyDistance, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleRestDayToggle = (day: number) => {
    setPreferences(prev => {
      const restDays = [...prev.restDays];
      const index = restDays.indexOf(day);

      if (index >= 0) {
        restDays.splice(index, 1);
      } else {
        restDays.push(day);
      }

      return { ...prev, restDays };
    });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSave(preferences());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-6">Your Preferences</h2>

      <form onSubmit={handleSubmit} class="bg-white rounded-lg shadow-md p-6">
        {savedSuccess() && (
          <div class="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Your preferences have been saved successfully!
          </div>
        )}

        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2" for="weeklyDistance">
            Weekly Distance Goal
          </label>
          <div class="flex">
            <input
              id="weeklyDistance"
              type="number"
              min="0"
              value={weeklyDistance()}
              onInput={handleDistanceChange}
              class="flex-1 rounded-l-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="Enter distance"
            />
            <div class="inline-flex rounded-r-md border border-l-0 border-gray-300">
              <button 
                type="button" 
                onClick={() => handleUnitChange('km')}
                class={`px-3 py-2 ${preferences().preferredUnit === 'km' ? 'bg-sky-100 text-sky-800' : 'bg-gray-50'}`}
              >
                km
              </button>
              <button 
                type="button" 
                onClick={() => handleUnitChange('mi')}
                class={`px-3 py-2 rounded-r-md ${preferences().preferredUnit === 'mi' ? 'bg-sky-100 text-sky-800' : 'bg-gray-50'}`}
              >
                mi
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-1">Set your target weekly running distance</p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            Preferred Rest Days
          </label>
          <div class="flex flex-wrap gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <button
                type="button"
                onClick={() => handleRestDayToggle(index)}
                class={`px-3 py-1 rounded-full text-sm ${preferences().restDays.includes(index) 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {day}
              </button>
            ))}
          </div>
          <p class="text-sm text-gray-500 mt-1">Select days when you prefer not to run</p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            Experience Level
          </label>
          <div class="grid grid-cols-3 gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <label class="flex items-center bg-gray-50 p-3 rounded-md cursor-pointer hover:bg-gray-100">
                <input 
                  type="radio" 
                  name="experience" 
                  value={level.toLowerCase()}
                  class="mr-2"
                />
                {level}
              </label>
            ))}
          </div>
          <p class="text-sm text-gray-500 mt-1">This helps customize workouts to your level</p>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setPreferences(defaultPreferences);
              setWeeklyDistance(defaultPreferences.weeklyDistance?.toString() || '');
            }}
            class="mr-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            class="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-md transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>

      <div class="mt-8 bg-sky-50 p-4 rounded-md">
        <h3 class="font-medium mb-2">How Your Preferences Are Used</h3>
        <p class="text-sm text-gray-600 mb-3">
          Your preferences help us customize your running plan to better fit your lifestyle and goals.
          We'll adapt workout schedules around your rest days and use your preferred units for all measurements.
        </p>
        <p class="text-sm text-gray-600">
          Changes to your preferences will be applied to your current and future training plans.
        </p>
      </div>
    </div>
  );
};

export default UserPreferencesForm;
