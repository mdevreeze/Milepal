import { ScheduleInstance, RunningSchedule } from '../types';
import { DistanceUnit, convertDistance } from './userPreferences';

export interface RunningStats {
  totalRuns: number;
  totalDistance: number;
  plansStarted: number;
  plansCompleted: number;
  currentStreak: number;
  longestStreak: number;
  averageRating: number;
}

export const calculateRunningStats = (
  activeSchedule: ScheduleInstance | null,
  schedule: RunningSchedule | null,
  distanceUnit: DistanceUnit = 'km'
): RunningStats => {
  const stats: RunningStats = {
    totalRuns: 0,
    totalDistance: 0,
    plansStarted: 0,
    plansCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageRating: 0
  };

  if (!activeSchedule || !schedule) {
    return stats;
  }

  // Calculate total runs and distance
  stats.totalRuns = activeSchedule.completedWorkouts.size;
  stats.plansStarted = 1; // Current active schedule

  // Calculate total distance from completed workouts
  let totalDistanceKm = 0;
  let totalRatings = 0;
  let ratingSum = 0;

  // Get completed workout details
  activeSchedule.completedWorkouts.forEach(workoutKey => {
    // Parse workout key to find the workout
    const [weekStr, dayStr] = workoutKey.split('-');
    const week = parseInt(weekStr);
    const dayInWeek = parseInt(dayStr);
    
    // Find the workout in the schedule
    const workoutDay = ((week - 1) * 7) + dayInWeek;
    const workout = schedule.workouts.find(w => w.day === workoutDay);
    
    if (workout && workout.distance) {
      totalDistanceKm += workout.distance;
    }

    // Get rating if available
    const completedData = activeSchedule.workoutHistory?.find(w => w.workoutKey === workoutKey);
    if (completedData?.rating) {
      ratingSum += completedData.rating;
      totalRatings++;
    }
  });

  stats.totalDistance = convertDistance(totalDistanceKm, distanceUnit);
  stats.averageRating = totalRatings > 0 ? Math.round((ratingSum / totalRatings) * 10) / 10 : 0;

  // Calculate streaks (simplified - consecutive completed workouts)
  stats.currentStreak = calculateCurrentStreak(activeSchedule, schedule);
  stats.longestStreak = stats.currentStreak; // For now, same as current

  // Check if plan is completed (simplified check)
  const totalWorkouts = schedule.workouts.filter(w => w.type !== 'rest').length;
  if (stats.totalRuns >= totalWorkouts) {
    stats.plansCompleted = 1;
  }

  return stats;
};

const calculateCurrentStreak = (
  activeSchedule: ScheduleInstance,
  schedule: RunningSchedule
): number => {
  if (!activeSchedule.workoutHistory || activeSchedule.workoutHistory.length === 0) {
    return 0;
  }

  // Sort workout history by completion date (most recent first)
  const sortedHistory = [...activeSchedule.workoutHistory]
    .sort((a, b) => b.completedDate.getTime() - a.completedDate.getTime());

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check for consecutive days (simplified streak calculation)
  for (let i = 0; i < sortedHistory.length; i++) {
    const workoutDate = new Date(sortedHistory[i].completedDate);
    workoutDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= i + 1) { // Allow for some flexibility in streak calculation
      streak++;
    } else {
      break;
    }
  }

  return streak;
};