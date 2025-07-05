import { RunningSchedule, ScheduleInstance, WorkoutDay, CompletedWorkout } from '../types';

export interface WorkoutWithSchedule {
  workoutKey: string;
  workout: WorkoutDay;
  week: number;
  dayInWeek: number;
  scheduledDate: Date;
  isCompleted: boolean;
  isPast: boolean;
  isToday: boolean;
  completedData?: CompletedWorkout;
}

export const getWorkoutKey = (week: number, day: number): string => {
  return `${week}-${day}`;
};

export const parseWorkoutKey = (key: string): { week: number; day: number } => {
  const [week, day] = key.split('-').map(Number);
  return { week, day };
};

export const getScheduledDate = (startDate: Date, week: number, dayInWeek: number): Date => {
  const date = new Date(startDate);
  // Week 1 starts on startDate, so week 1 = 0 days offset, week 2 = 7 days offset, etc.
  const weekOffset = (week - 1) * 7;
  // Day offset within the week (day 1 = 0 offset, day 2 = 1 offset, etc.)
  const dayOffset = dayInWeek - 1;
  date.setDate(date.getDate() + weekOffset + dayOffset);
  return date;
};

export const getRecentWorkouts = (
  schedule: RunningSchedule,
  instance: ScheduleInstance,
  daysToShow: number = 14
): WorkoutWithSchedule[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startDate = new Date(instance.startDate);
  startDate.setHours(0, 0, 0, 0);
  
  const workouts: WorkoutWithSchedule[] = [];
  
  // Group workouts by week
  const workoutsByWeek: { [week: number]: WorkoutDay[] } = {};
  schedule.workouts.forEach(workout => {
    const week = Math.ceil(workout.day / 7);
    if (!workoutsByWeek[week]) {
      workoutsByWeek[week] = [];
    }
    workoutsByWeek[week].push(workout);
  });
  
  // Generate workout list with dates
  Object.entries(workoutsByWeek).forEach(([weekStr, weekWorkouts]) => {
    const week = parseInt(weekStr);
    weekWorkouts.forEach(workout => {
      const dayInWeek = ((workout.day - 1) % 7) + 1;
      const scheduledDate = getScheduledDate(startDate, week, dayInWeek);
      const workoutKey = getWorkoutKey(week, dayInWeek);
      
      const daysDiff = Math.ceil((scheduledDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      // Only include workouts within the specified range
      if (daysDiff >= -daysToShow && daysDiff <= daysToShow) {
        const isCompleted = instance.completedWorkouts.has(workoutKey);
        const completedData = instance.workoutHistory?.find(w => w.workoutKey === workoutKey);
        
        workouts.push({
          workoutKey,
          workout,
          week,
          dayInWeek,
          scheduledDate,
          isCompleted,
          isPast: daysDiff < 0,
          isToday: daysDiff === 0,
          completedData
        });
      }
    });
  });
  
  // Sort by scheduled date (most recent first for past, chronological for future)
  return workouts.sort((a, b) => {
    if (a.isPast && b.isPast) {
      return b.scheduledDate.getTime() - a.scheduledDate.getTime(); // Recent past first
    }
    return a.scheduledDate.getTime() - b.scheduledDate.getTime(); // Chronological for future
  });
};

export const markWorkoutComplete = (
  instance: ScheduleInstance,
  workoutKey: string,
  rating?: number,
  notes?: string
): ScheduleInstance => {
  const completedWorkout: CompletedWorkout = {
    workoutKey,
    completedDate: new Date(),
    rating,
    notes
  };
  
  return {
    ...instance,
    completedWorkouts: new Set([...instance.completedWorkouts, workoutKey]),
    workoutHistory: [
      ...(instance.workoutHistory || []).filter(w => w.workoutKey !== workoutKey),
      completedWorkout
    ]
  };
};

export const getWorkoutTypeColor = (type: string): string => {
  switch (type) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'tempo': return 'bg-orange-100 text-orange-800';
    case 'intervals': return 'bg-red-100 text-red-800';
    case 'long': return 'bg-blue-100 text-blue-800';
    case 'rest': return 'bg-gray-100 text-gray-800';
    case 'race': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getWorkoutTypeIcon = (type: string): string => {
  switch (type) {
    case 'easy': return '🚶‍♂️';
    case 'tempo': return '⏱️';
    case 'intervals': return '🔄';
    case 'long': return '🏃‍♀️';
    case 'rest': return '😴';
    case 'race': return '🏆';
    default: return '🏃';
  }
};