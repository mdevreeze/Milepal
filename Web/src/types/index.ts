export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutType = 'easy' | 'tempo' | 'intervals' | 'long' | 'rest' | 'race';

export interface WorkoutDay {
  day: number;
  type: WorkoutType;
  distance?: number; // in kilometers
  duration?: number; // in minutes
  description: string;
}

export interface RunningSchedule {
  id: string;
  name: string;
  difficulty: DifficultyLevel;
  duration: number; // in weeks
  goal: string;
  workouts: WorkoutDay[];
}

export interface CompletedWorkout {
  workoutKey: string; // Format: "week-day" e.g., "1-3"
  completedDate: Date;
  rating?: number; // 1-5 stars
  notes?: string;
}

export interface ScheduleInstance {
  id: string;
  scheduleId: string;
  startDate: Date;
  isActive: boolean;
  completedWorkouts: Set<string>; // Keep for backwards compatibility
  workoutHistory: CompletedWorkout[]; // New detailed tracking
}