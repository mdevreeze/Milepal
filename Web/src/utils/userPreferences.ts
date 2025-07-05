export type DistanceUnit = 'km' | 'miles';

export interface UserPreferences {
  distanceUnit: DistanceUnit;
}

const USER_PREFERENCES_KEY = 'runScheduler_userPreferences';

const defaultPreferences: UserPreferences = {
  distanceUnit: 'km'
};

export const saveUserPreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences to localStorage:', error);
  }
};

export const loadUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(USER_PREFERENCES_KEY);
    if (!stored) return defaultPreferences;

    const parsed = JSON.parse(stored);
    return {
      ...defaultPreferences,
      ...parsed
    };
  } catch (error) {
    console.error('Error loading user preferences from localStorage:', error);
    return defaultPreferences;
  }
};

export const convertDistance = (distanceKm: number, unit: DistanceUnit): number => {
  if (unit === 'miles') {
    return Math.round(distanceKm * 0.621371 * 100) / 100; // Convert km to miles, round to 2 decimals
  }
  return distanceKm;
};

export const getDistanceUnitLabel = (unit: DistanceUnit): string => {
  return unit === 'km' ? 'km' : 'mi';
};