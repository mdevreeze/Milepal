import { ScheduleInstance } from '../types';

const ACTIVE_SCHEDULE_KEY = 'milepal_activeSchedule';

// Check if localStorage is available (WebView compatibility)
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveActiveSchedule = (schedule: ScheduleInstance | null): void => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available in this WebView');
    return;
  }
  
  try {
    if (schedule) {
      // Convert Set to Array and Dates to ISO strings for JSON serialization
      const serializable = {
        ...schedule,
        completedWorkouts: Array.from(schedule.completedWorkouts),
        startDate: schedule.startDate.toISOString(),
        workoutHistory: (schedule.workoutHistory || []).map(workout => ({
          ...workout,
          completedDate: workout.completedDate.toISOString()
        }))
      };
      localStorage.setItem(ACTIVE_SCHEDULE_KEY, JSON.stringify(serializable));
    } else {
      localStorage.removeItem(ACTIVE_SCHEDULE_KEY);
    }
  } catch (error) {
    console.error('Error saving active schedule to localStorage:', error);
  }
};

export const loadActiveSchedule = (): ScheduleInstance | null => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available in this WebView');
    return null;
  }
  
  try {
    const stored = localStorage.getItem(ACTIVE_SCHEDULE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    
    // Convert back to proper types
    return {
      ...parsed,
      completedWorkouts: new Set(parsed.completedWorkouts),
      startDate: new Date(parsed.startDate),
      workoutHistory: (parsed.workoutHistory || []).map((workout: any) => ({
        ...workout,
        completedDate: new Date(workout.completedDate)
      }))
    };
  } catch (error) {
    console.error('Error loading active schedule from localStorage:', error);
    // Clear corrupted data
    try {
      localStorage.removeItem(ACTIVE_SCHEDULE_KEY);
    } catch (removeError) {
      console.error('Error clearing corrupted localStorage data:', removeError);
    }
    return null;
  }
};

export const clearActiveSchedule = (): void => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available in this WebView');
    return;
  }
  
  try {
    localStorage.removeItem(ACTIVE_SCHEDULE_KEY);
  } catch (error) {
    console.error('Error clearing active schedule from localStorage:', error);
  }
};