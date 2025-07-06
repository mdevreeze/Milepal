import { Component, createSignal, createMemo, onMount, createEffect } from 'solid-js';
import { ScheduleInstance, RunningSchedule } from '../types';
import { UserPreferences, DistanceUnit, loadUserPreferences, saveUserPreferences, getDistanceUnitLabel } from '../utils/userPreferences';
import { calculateRunningStats } from '../utils/runningStats';
import { defaultSchedules } from '../data/schedules';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

interface ProfileProps {
  activeSchedule: ScheduleInstance | null;
}

const Profile: Component<ProfileProps> = (props) => {
  const [userPreferences, setUserPreferences] = createSignal<UserPreferences>(loadUserPreferences());
  const [showPrivacyPolicy, setShowPrivacyPolicy] = createSignal(false);

  // Load preferences on mount
  onMount(() => {
    const prefs = loadUserPreferences();
    setUserPreferences(prefs);
  });

  // Save preferences whenever they change
  createEffect(() => {
    saveUserPreferences(userPreferences());
  });

  const currentSchedule = createMemo(() => {
    if (!props.activeSchedule) return null;
    return defaultSchedules.find(s => s.id === props.activeSchedule!.scheduleId);
  });

  const runningStats = createMemo(() => {
    return calculateRunningStats(
      props.activeSchedule,
      currentSchedule(),
      userPreferences().distanceUnit
    );
  });

  const updateDistanceUnit = (unit: DistanceUnit) => {
    setUserPreferences(prev => ({
      ...prev,
      distanceUnit: unit
    }));
  };

  return (
    <div class="pb-20">
      <div class="px-4 py-6">
        <div class="space-y-6">
          {/* Running Stats */}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold mb-4">Running Stats</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600">{runningStats().totalRuns}</div>
                <div class="text-sm text-gray-600">Total Runs</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600">
                  {runningStats().totalDistance.toFixed(1)} {getDistanceUnitLabel(userPreferences().distanceUnit)}
                </div>
                <div class="text-sm text-gray-600">Total Distance</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600">{runningStats().plansStarted}</div>
                <div class="text-sm text-gray-600">Plans Started</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600">{runningStats().plansCompleted}</div>
                <div class="text-sm text-gray-600">Plans Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600">{runningStats().currentStreak}</div>
                <div class="text-sm text-gray-600">Current Streak</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600">
                  {runningStats().averageRating > 0 ? `${runningStats().averageRating}★` : '-'}
                </div>
                <div class="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold mb-4">Preferences</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Distance Unit</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateDistanceUnit('km')}
                    class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      userPreferences().distanceUnit === 'km'
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Kilometers (km)
                  </button>
                  <button
                    onClick={() => updateDistanceUnit('miles')}
                    class={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      userPreferences().distanceUnit === 'miles'
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Miles (mi)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold mb-4">Legal</h3>
            <div class="space-y-3">
              <button
                onClick={() => setShowPrivacyPolicy(true)}
                class="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span class="text-gray-700">Privacy Policy</span>
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold mb-4">About</h3>
            <div class="text-sm text-gray-600 space-y-2">
              <p><strong>Milepal</strong></p>
              <p>Version 1.0.0</p>
              <p>Your personal running plan assistant</p>
            </div>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={showPrivacyPolicy()}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </div>
  );
};

export default Profile;