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

export interface ScheduleInstance {
  id: string;
  scheduleId: string;
  startDate: Date;
  isActive: boolean;
  completedWorkouts: Set<string>;
}