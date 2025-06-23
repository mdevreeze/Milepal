import { RunningSchedule } from '../types';

export const defaultSchedules: RunningSchedule[] = [
  {
    id: 'beginner-5k',
    name: '5K Beginner Plan',
    difficulty: 'beginner',
    duration: 8,
    goal: 'Complete a 5K run',
    workouts: [
      // Week 1
      { day: 1, type: 'easy', distance: 1.5, duration: 20, description: 'Walk/run intervals: 1 min run, 2 min walk x 6' },
      { day: 2, type: 'rest', description: 'Rest day or gentle stretching' },
      { day: 3, type: 'easy', distance: 1.5, duration: 20, description: 'Walk/run intervals: 1 min run, 2 min walk x 6' },
      { day: 4, type: 'rest', description: 'Rest day or light cross-training' },
      { day: 5, type: 'easy', distance: 1.5, duration: 20, description: 'Walk/run intervals: 1 min run, 2 min walk x 6' },
      { day: 6, type: 'rest', description: 'Rest day' },
      { day: 7, type: 'long', distance: 2, duration: 25, description: 'Longer walk/run session at comfortable effort' },

      // Week 2
      { day: 8, type: 'easy', distance: 2, duration: 22, description: 'Walk/run intervals: 90s run, 90s walk x 7' },
      { day: 9, type: 'rest', description: 'Rest day or yoga' },
      { day: 10, type: 'easy', distance: 2, duration: 22, description: 'Walk/run intervals: 90s run, 90s walk x 7' },
      { day: 11, type: 'rest', description: 'Rest day or light activity' },
      { day: 12, type: 'easy', distance: 2, duration: 22, description: 'Walk/run intervals: 90s run, 90s walk x 7' },
      { day: 13, type: 'rest', description: 'Rest day' },
      { day: 14, type: 'long', distance: 2.5, duration: 28, description: 'Longer session with more running than walking' },

      // Week 3
      { day: 15, type: 'easy', distance: 2.2, duration: 25, description: 'Walk/run intervals: 2 min run, 1 min walk x 8' },
      { day: 16, type: 'rest', description: 'Rest day or gentle stretching' },
      { day: 17, type: 'easy', distance: 2.2, duration: 25, description: 'Walk/run intervals: 2 min run, 1 min walk x 8' },
      { day: 18, type: 'rest', description: 'Rest day or cross-training' },
      { day: 19, type: 'easy', distance: 2.2, duration: 25, description: 'Walk/run intervals: 2 min run, 1 min walk x 8' },
      { day: 20, type: 'rest', description: 'Rest day' },
      { day: 21, type: 'long', distance: 2.8, duration: 32, description: 'Continuous easy run with walk breaks as needed' },

      // Week 4
      { day: 22, type: 'easy', distance: 2.5, duration: 28, description: 'Walk/run intervals: 3 min run, 1 min walk x 7' },
      { day: 23, type: 'rest', description: 'Rest day or light yoga' },
      { day: 24, type: 'easy', distance: 2.5, duration: 28, description: 'Walk/run intervals: 3 min run, 1 min walk x 7' },
      { day: 25, type: 'rest', description: 'Rest day or gentle activity' },
      { day: 26, type: 'easy', distance: 2.5, duration: 28, description: 'Walk/run intervals: 3 min run, 1 min walk x 7' },
      { day: 27, type: 'rest', description: 'Rest day' },
      { day: 28, type: 'long', distance: 3, duration: 35, description: 'Mostly continuous running with short walk breaks' },

      // Week 5
      { day: 29, type: 'easy', distance: 2.8, duration: 30, description: 'Walk/run intervals: 5 min run, 1 min walk x 5' },
      { day: 30, type: 'rest', description: 'Rest day or stretching' },
      { day: 31, type: 'easy', distance: 2.8, duration: 30, description: 'Walk/run intervals: 5 min run, 1 min walk x 5' },
      { day: 32, type: 'rest', description: 'Rest day or cross-training' },
      { day: 33, type: 'easy', distance: 2.8, duration: 30, description: 'Walk/run intervals: 5 min run, 1 min walk x 5' },
      { day: 34, type: 'rest', description: 'Rest day' },
      { day: 35, type: 'long', distance: 3.2, duration: 38, description: 'Continuous easy run with minimal walking' },

      // Week 6
      { day: 36, type: 'easy', distance: 3, duration: 32, description: 'Walk/run intervals: 8 min run, 1 min walk x 3-4' },
      { day: 37, type: 'rest', description: 'Rest day or gentle yoga' },
      { day: 38, type: 'easy', distance: 3, duration: 32, description: 'Walk/run intervals: 8 min run, 1 min walk x 3-4' },
      { day: 39, type: 'rest', description: 'Rest day or light activity' },
      { day: 40, type: 'easy', distance: 3, duration: 32, description: 'Walk/run intervals: 8 min run, 1 min walk x 3-4' },
      { day: 41, type: 'rest', description: 'Rest day' },
      { day: 42, type: 'long', distance: 3.5, duration: 40, description: 'Continuous easy run at comfortable pace' },

      // Week 7
      { day: 43, type: 'easy', distance: 3.2, duration: 35, description: 'Continuous easy run: 15 min run, 1 min walk, 15 min run' },
      { day: 44, type: 'rest', description: 'Rest day or stretching' },
      { day: 45, type: 'easy', distance: 3.2, duration: 35, description: 'Continuous easy run: 15 min run, 1 min walk, 15 min run' },
      { day: 46, type: 'rest', description: 'Rest day or cross-training' },
      { day: 47, type: 'easy', distance: 3.2, duration: 35, description: 'Continuous easy run: 15 min run, 1 min walk, 15 min run' },
      { day: 48, type: 'rest', description: 'Rest day' },
      { day: 49, type: 'long', distance: 4, duration: 45, description: 'Continuous run building toward 5K distance' },

      // Week 8
      { day: 50, type: 'easy', distance: 3.5, duration: 38, description: 'Continuous easy run at comfortable pace' },
      { day: 51, type: 'rest', description: 'Rest day or light stretching' },
      { day: 52, type: 'easy', distance: 2.5, duration: 28, description: 'Easy shakeout run before race week' },
      { day: 53, type: 'rest', description: 'Rest day - stay hydrated and relaxed' },
      { day: 54, type: 'easy', distance: 2, duration: 20, description: 'Easy prep run with 3x30s strides' },
      { day: 55, type: 'rest', description: 'Rest day before race' },
      { day: 56, type: 'race', distance: 5, duration: 35, description: 'RACE DAY: Your first 5K! Pace yourself and enjoy!' }
    ]
  },

  {
    id: 'beginner-10k',
    name: '10K Beginner Plan',
    difficulty: 'beginner',
    duration: 12,
    goal: 'Complete a 10K run',
    workouts: [
      // Week 1
      {day: 1, type: 'easy', distance: 3, duration: 30, description: 'Easy run: 15 min run, 1 min walk, 15 min run'},
      {day: 2, type: 'rest', description: 'Rest day or gentle stretching'},
      {day: 3, type: 'easy', distance: 3, duration: 30, description: 'Easy continuous run at comfortable pace'},
      {day: 4, type: 'rest', description: 'Rest day or light cross-training'},
      {day: 5, type: 'easy', distance: 3, duration: 30, description: 'Easy run with 4x30s pickups in middle'},
      {day: 6, type: 'rest', description: 'Rest day'},
      {day: 7, type: 'long', distance: 4, duration: 40, description: 'Longer easy run building aerobic base'},

      // Week 2
      {day: 8, type: 'easy', distance: 3.2, duration: 32, description: 'Easy continuous run at comfortable effort'},
      {day: 9, type: 'rest', description: 'Rest day or yoga'},
      {day: 10, type: 'easy', distance: 3.2, duration: 32, description: 'Easy run with 5x30s strides at end'},
      {day: 11, type: 'rest', description: 'Rest day or light activity'},
      {day: 12, type: 'easy', distance: 3.2, duration: 32, description: 'Easy run focusing on relaxed form'},
      {day: 13, type: 'rest', description: 'Rest day'},
      {
        day: 14,
        type: 'long',
        distance: 4.5,
        duration: 45,
        description: 'Progressive long run - start easy, finish comfortably'
      },

      // Week 3
      {day: 15, type: 'easy', distance: 3.5, duration: 35, description: 'Easy run at conversational pace'},
      {day: 16, type: 'rest', description: 'Rest day or gentle stretching'},
      {
        day: 17,
        type: 'tempo',
        distance: 3.5,
        duration: 35,
        description: '10 min easy, 15 min tempo effort, 10 min easy'
      },
      {day: 18, type: 'rest', description: 'Rest day or cross-training'},
      {day: 19, type: 'easy', distance: 3.5, duration: 35, description: 'Easy recovery run at relaxed pace'},
      {day: 20, type: 'rest', description: 'Rest day'},
      {day: 21, type: 'long', distance: 5, duration: 50, description: 'Steady long run building endurance'},

      // Week 4
      {day: 22, type: 'easy', distance: 3.8, duration: 38, description: 'Easy run maintaining good form'},
      {day: 23, type: 'rest', description: 'Rest day or light yoga'},
      {
        day: 24,
        type: 'intervals',
        distance: 4,
        duration: 40,
        description: '10 min easy, 6x2 min at 5K effort (1 min recovery), 10 min easy'
      },
      {day: 25, type: 'rest', description: 'Rest day or gentle activity'},
      {day: 26, type: 'easy', distance: 3.5, duration: 35, description: 'Easy shakeout run'},
      {day: 27, type: 'rest', description: 'Rest day'},
      {
        day: 28,
        type: 'long',
        distance: 5.5,
        duration: 55,
        description: 'Long run with negative split (second half slightly faster)'
      },

      // Week 5
      {day: 29, type: 'easy', distance: 4, duration: 40, description: 'Comfortable easy run building base'},
      {day: 30, type: 'rest', description: 'Rest day or stretching'},
      {day: 31, type: 'tempo', distance: 4, duration: 40, description: '10 min easy, 20 min tempo, 10 min easy'},
      {day: 32, type: 'rest', description: 'Rest day or cross-training'},
      {day: 33, type: 'easy', distance: 3.5, duration: 35, description: 'Easy run with focus on breathing rhythm'},
      {day: 34, type: 'rest', description: 'Rest day'},
      {
        day: 35,
        type: 'long',
        distance: 6,
        duration: 60,
        description: 'Progressive long run - gradually increase effort'
      },

      // Week 6
      {day: 36, type: 'easy', distance: 4.2, duration: 42, description: 'Easy run at aerobic pace'},
      {day: 37, type: 'rest', description: 'Rest day or gentle yoga'},
      {
        day: 38,
        type: 'intervals',
        distance: 4.5,
        duration: 45,
        description: '10 min easy, 8x90s at 5K effort (90s recovery), 10 min easy'
      },
      {day: 39, type: 'rest', description: 'Rest day or light activity'},
      {day: 40, type: 'easy', distance: 4, duration: 40, description: 'Recovery run at very easy effort'},
      {day: 41, type: 'rest', description: 'Rest day'},
      {day: 42, type: 'long', distance: 6.5, duration: 65, description: 'Steady endurance run at comfortable effort'},

      // Week 7
      {day: 43, type: 'easy', distance: 4.5, duration: 45, description: 'Easy run building weekly mileage'},
      {day: 44, type: 'rest', description: 'Rest day or stretching'},
      {day: 45, type: 'tempo', distance: 4.5, duration: 45, description: '10 min easy, 25 min tempo, 10 min easy'},
      {day: 46, type: 'rest', description: 'Rest day or cross-training'},
      {day: 47, type: 'easy', distance: 4, duration: 40, description: 'Easy run with 6x20s hill strides'},
      {day: 48, type: 'rest', description: 'Rest day'},
      {
        day: 49,
        type: 'long',
        distance: 7,
        duration: 70,
        description: 'Long run practicing race nutrition and hydration'
      },

      // Week 8
      {day: 50, type: 'easy', distance: 5, duration: 50, description: 'Comfortable run at conversational pace'},
      {day: 51, type: 'rest', description: 'Rest day or light stretching'},
      {
        day: 52,
        type: 'intervals',
        distance: 5,
        duration: 50,
        description: '10 min easy, 5x3 min at 10K effort (90s recovery), 10 min easy'
      },
      {day: 53, type: 'rest', description: 'Rest day or gentle activity'},
      {day: 54, type: 'easy', distance: 4.5, duration: 45, description: 'Easy recovery run'},
      {day: 55, type: 'rest', description: 'Rest day'},
      {
        day: 56,
        type: 'long',
        distance: 7.5,
        duration: 75,
        description: 'Progressive long run building toward 10K distance'
      },

      // Week 9
      {day: 57, type: 'easy', distance: 5.2, duration: 52, description: 'Easy run maintaining good rhythm'},
      {day: 58, type: 'rest', description: 'Rest day or yoga'},
      {day: 59, type: 'tempo', distance: 5, duration: 50, description: '10 min easy, 30 min tempo, 10 min easy'},
      {day: 60, type: 'rest', description: 'Rest day or cross-training'},
      {day: 61, type: 'easy', distance: 4.5, duration: 45, description: 'Easy run with focus on form'},
      {day: 62, type: 'rest', description: 'Rest day'},
      {day: 63, type: 'long', distance: 8, duration: 80, description: 'Peak long run - steady effort throughout'},

      // Week 10
      {day: 64, type: 'easy', distance: 5.5, duration: 55, description: 'Comfortable aerobic run'},
      {day: 65, type: 'rest', description: 'Rest day or stretching'},
      {
        day: 66,
        type: 'intervals',
        distance: 5.5,
        duration: 55,
        description: '10 min easy, 6x2 min at 5K effort (2 min recovery), 15 min easy'
      },
      {day: 67, type: 'rest', description: 'Rest day or light activity'},
      {day: 68, type: 'easy', distance: 5, duration: 50, description: 'Easy run with 4x100m strides'},
      {day: 69, type: 'rest', description: 'Rest day'},
      {
        day: 70,
        type: 'long',
        distance: 8.5,
        duration: 85,
        description: 'Final peak long run - practice race pace sections'
      },

      // Week 11 - Taper begins
      {day: 71, type: 'easy', distance: 5, duration: 50, description: 'Easy run starting taper phase'},
      {day: 72, type: 'rest', description: 'Rest day or gentle yoga'},
      {
        day: 73,
        type: 'tempo',
        distance: 4.5,
        duration: 45,
        description: '10 min easy, 20 min at 10K pace, 10 min easy'
      },
      {day: 74, type: 'rest', description: 'Rest day or cross-training'},
      {day: 75, type: 'easy', distance: 4, duration: 40, description: 'Easy recovery run'},
      {day: 76, type: 'rest', description: 'Rest day'},
      {day: 77, type: 'long', distance: 6, duration: 60, description: 'Reduced long run maintaining fitness'},

      // Week 12 - Race Week
      {day: 78, type: 'easy', distance: 4, duration: 40, description: 'Easy run with 4x30s at race pace'},
      {day: 79, type: 'rest', description: 'Rest day or light stretching'},
      {day: 80, type: 'easy', distance: 3, duration: 30, description: 'Easy shakeout run with 3x20s strides'},
      {day: 81, type: 'rest', description: 'Rest day - hydrate and prepare mentally'},
      {day: 82, type: 'easy', distance: 2.5, duration: 25, description: 'Very easy prep run with 3x30s at race pace'},
      {day: 83, type: 'rest', description: 'Rest day before race - stay relaxed'},
      {
        day: 84,
        type: 'race',
        distance: 10,
        duration: 65,
        description: 'RACE DAY: Your first 10K! Start conservatively and finish strong!'
      }
    ]
  },
  {
    id: 'beginner-half-marathon',
    name: 'Half Marathon Beginner Plan',
    difficulty: 'beginner',
    duration: 16,
    goal: 'Complete a half marathon (21.1K)',
    workouts: [
      // Week 1 - Base Building
      { day: 1, type: 'easy', distance: 5, duration: 50, description: 'Easy run building from 10K fitness base' },
      { day: 2, type: 'rest', description: 'Rest day or gentle stretching' },
      { day: 3, type: 'easy', distance: 4, duration: 40, description: 'Comfortable easy run' },
      { day: 4, type: 'rest', description: 'Rest day or light cross-training' },
      { day: 5, type: 'easy', distance: 5, duration: 50, description: 'Easy run with 6x30s strides at end' },
      { day: 6, type: 'rest', description: 'Rest day' },
      { day: 7, type: 'long', distance: 8, duration: 80, description: 'Long run at conversational pace' },

      // Week 2
      { day: 8, type: 'easy', distance: 5.5, duration: 55, description: 'Easy aerobic run' },
      { day: 9, type: 'rest', description: 'Rest day or yoga' },
      { day: 10, type: 'easy', distance: 4.5, duration: 45, description: 'Easy run focusing on form' },
      { day: 11, type: 'rest', description: 'Rest day or light activity' },
      { day: 12, type: 'easy', distance: 5.5, duration: 55, description: 'Easy run with relaxed breathing' },
      { day: 13, type: 'rest', description: 'Rest day' },
      { day: 14, type: 'long', distance: 9, duration: 90, description: 'Progressive long run - gradually increase effort' },

      // Week 3 - Introduce Quality Work
      { day: 15, type: 'easy', distance: 6, duration: 60, description: 'Easy run building weekly volume' },
      { day: 16, type: 'rest', description: 'Rest day or gentle stretching' },
      { day: 17, type: 'tempo', distance: 6, duration: 60, description: '10 min easy, 30 min tempo effort, 20 min easy' },
      { day: 18, type: 'rest', description: 'Rest day or cross-training' },
      { day: 19, type: 'easy', distance: 5, duration: 50, description: 'Easy recovery run' },
      { day: 20, type: 'rest', description: 'Rest day' },
      { day: 21, type: 'long', distance: 10, duration: 100, description: 'Steady long run at comfortable effort' },

      // Week 4
      { day: 22, type: 'easy', distance: 6.5, duration: 65, description: 'Easy run maintaining aerobic base' },
      { day: 23, type: 'rest', description: 'Rest day or light yoga' },
      { day: 24, type: 'intervals', distance: 6.5, duration: 65, description: '15 min easy, 6x3 min at 10K effort (90s recovery), 15 min easy' },
      { day: 25, type: 'rest', description: 'Rest day or gentle activity' },
      { day: 26, type: 'easy', distance: 5.5, duration: 55, description: 'Easy shakeout run' },
      { day: 27, type: 'rest', description: 'Rest day' },
      { day: 28, type: 'long', distance: 11, duration: 110, description: 'Long run with negative split practice' },

      // Week 5
      { day: 29, type: 'easy', distance: 7, duration: 70, description: 'Comfortable easy run extending distance' },
      { day: 30, type: 'rest', description: 'Rest day or stretching' },
      { day: 31, type: 'tempo', distance: 7, duration: 70, description: '15 min easy, 35 min tempo, 20 min easy' },
      { day: 32, type: 'rest', description: 'Rest day or cross-training' },
      { day: 33, type: 'easy', distance: 6, duration: 60, description: 'Easy run with focus on cadence' },
      { day: 34, type: 'rest', description: 'Rest day' },
      { day: 35, type: 'long', distance: 12, duration: 120, description: 'Progressive long run building endurance' },

      // Week 6
      { day: 36, type: 'easy', distance: 7.5, duration: 75, description: 'Easy run at aerobic pace' },
      { day: 37, type: 'rest', description: 'Rest day or gentle yoga' },
      { day: 38, type: 'intervals', distance: 7.5, duration: 75, description: '15 min easy, 8x2 min at 5K effort (2 min recovery), 15 min easy' },
      { day: 39, type: 'rest', description: 'Rest day or light activity' },
      { day: 40, type: 'easy', distance: 6.5, duration: 65, description: 'Recovery run at very easy effort' },
      { day: 41, type: 'rest', description: 'Rest day' },
      { day: 42, type: 'long', distance: 13, duration: 130, description: 'Steady endurance run - halfway point!' },

      // Week 7
      { day: 43, type: 'easy', distance: 8, duration: 80, description: 'Easy run building base fitness' },
      { day: 44, type: 'rest', description: 'Rest day or stretching' },
      { day: 45, type: 'tempo', distance: 8, duration: 80, description: '15 min easy, 40 min tempo, 25 min easy' },
      { day: 46, type: 'rest', description: 'Rest day or cross-training' },
      { day: 47, type: 'easy', distance: 7, duration: 70, description: 'Easy run with 8x20s hill strides' },
      { day: 48, type: 'rest', description: 'Rest day' },
      { day: 49, type: 'long', distance: 14, duration: 140, description: 'Long run practicing race nutrition strategy' },

      // Week 8
      { day: 50, type: 'easy', distance: 8.5, duration: 85, description: 'Comfortable run at conversational pace' },
      { day: 51, type: 'rest', description: 'Rest day or light stretching' },
      { day: 52, type: 'intervals', distance: 8.5, duration: 85, description: '15 min easy, 5x4 min at half marathon effort (2 min recovery), 20 min easy' },
      { day: 53, type: 'rest', description: 'Rest day or gentle activity' },
      { day: 54, type: 'easy', distance: 7.5, duration: 75, description: 'Easy recovery run' },
      { day: 55, type: 'rest', description: 'Rest day' },
      { day: 56, type: 'long', distance: 15, duration: 150, description: 'Progressive long run building toward race distance' },

      // Week 9
      { day: 57, type: 'easy', distance: 9, duration: 90, description: 'Easy run maintaining good rhythm' },
      { day: 58, type: 'rest', description: 'Rest day or yoga' },
      { day: 59, type: 'tempo', distance: 9, duration: 90, description: '15 min easy, 45 min tempo, 30 min easy' },
      { day: 60, type: 'rest', description: 'Rest day or cross-training' },
      { day: 61, type: 'easy', distance: 8, duration: 80, description: 'Easy run with focus on relaxation' },
      { day: 62, type: 'rest', description: 'Rest day' },
      { day: 63, type: 'long', distance: 16, duration: 160, description: 'Long run with race pace segments (3x10 min)' },

      // Week 10
      { day: 64, type: 'easy', distance: 9.5, duration: 95, description: 'Comfortable aerobic run' },
      { day: 65, type: 'rest', description: 'Rest day or stretching' },
      { day: 66, type: 'intervals', distance: 9.5, duration: 95, description: '15 min easy, 6x3 min at 10K effort (90s recovery), 25 min easy' },
      { day: 67, type: 'rest', description: 'Rest day or light activity' },
      { day: 68, type: 'easy', distance: 8.5, duration: 85, description: 'Easy run with 6x100m strides' },
      { day: 69, type: 'rest', description: 'Rest day' },
      { day: 70, type: 'long', distance: 17, duration: 170, description: 'Peak long run - steady effort throughout' },

      // Week 11
      { day: 71, type: 'easy', distance: 10, duration: 100, description: 'Easy run at peak weekly volume' },
      { day: 72, type: 'rest', description: 'Rest day or gentle yoga' },
      { day: 73, type: 'tempo', distance: 10, duration: 100, description: '20 min easy, 50 min tempo, 30 min easy' },
      { day: 74, type: 'rest', description: 'Rest day or cross-training' },
      { day: 75, type: 'easy', distance: 9, duration: 90, description: 'Easy run focusing on efficiency' },
      { day: 76, type: 'rest', description: 'Rest day' },
      { day: 77, type: 'long', distance: 18, duration: 180, description: 'Peak long run practicing race strategy' },

      // Week 12
      { day: 78, type: 'easy', distance: 10.5, duration: 105, description: 'Easy run maintaining fitness' },
      { day: 79, type: 'rest', description: 'Rest day or stretching' },
      { day: 80, type: 'intervals', distance: 10, duration: 100, description: '20 min easy, 4x5 min at half marathon pace (2 min recovery), 20 min easy' },
      { day: 81, type: 'rest', description: 'Rest day or light activity' },
      { day: 82, type: 'easy', distance: 9, duration: 90, description: 'Easy run with good form focus' },
      { day: 83, type: 'rest', description: 'Rest day' },
      { day: 84, type: 'long', distance: 19, duration: 190, description: 'Final peak long run - confidence builder' },

      // Week 13 - Begin Taper
      { day: 85, type: 'easy', distance: 9, duration: 90, description: 'Easy run starting taper phase' },
      { day: 86, type: 'rest', description: 'Rest day or gentle yoga' },
      { day: 87, type: 'tempo', distance: 8, duration: 80, description: '15 min easy, 30 min at half marathon pace, 15 min easy' },
      { day: 88, type: 'rest', description: 'Rest day or cross-training' },
      { day: 89, type: 'easy', distance: 7, duration: 70, description: 'Easy recovery run' },
      { day: 90, type: 'rest', description: 'Rest day' },
      { day: 91, type: 'long', distance: 14, duration: 140, description: 'Reduced long run maintaining feel' },

      // Week 14
      { day: 92, type: 'easy', distance: 8, duration: 80, description: 'Easy run with 6x30s at race pace' },
      { day: 93, type: 'rest', description: 'Rest day or light stretching' },
      { day: 94, type: 'intervals', distance: 7, duration: 70, description: '15 min easy, 6x90s at 10K effort (90s recovery), 15 min easy' },
      { day: 95, type: 'rest', description: 'Rest day or gentle activity' },
      { day: 96, type: 'easy', distance: 6, duration: 60, description: 'Easy shakeout run' },
      { day: 97, type: 'rest', description: 'Rest day' },
      { day: 98, type: 'long', distance: 11, duration: 110, description: 'Moderate long run staying sharp' },

      // Week 15
      { day: 99, type: 'easy', distance: 7, duration: 70, description: 'Easy run with 4x30s at race pace' },
      { day: 100, type: 'rest', description: 'Rest day or yoga' },
      { day: 101, type: 'tempo', distance: 6, duration: 60, description: '10 min easy, 20 min at race pace, 10 min easy' },
      { day: 102, type: 'rest', description: 'Rest day or light cross-training' },
      { day: 103, type: 'easy', distance: 5, duration: 50, description: 'Easy run with relaxed focus' },
      { day: 104, type: 'rest', description: 'Rest day' },
      { day: 105, type: 'long', distance: 8, duration: 80, description: 'Final long run - keep it comfortable' },

      // Week 16 - Race Week
      { day: 106, type: 'easy', distance: 6, duration: 60, description: 'Easy run with 4x20s strides' },
      { day: 107, type: 'rest', description: 'Rest day or gentle stretching' },
      { day: 108, type: 'easy', distance: 4, duration: 40, description: 'Easy shakeout with 3x30s at race pace' },
      { day: 109, type: 'rest', description: 'Rest day - focus on hydration and nutrition' },
      { day: 110, type: 'easy', distance: 3, duration: 30, description: 'Very easy prep run with 3x20s strides' },
      { day: 111, type: 'rest', description: 'Rest day before race - stay calm and confident' },
      { day: 112, type: 'race', distance: 21.1, duration: 140, description: 'RACE DAY: Your first half marathon! Start conservatively, finish strong!' }
    ]
  },
  {
    id: 'intermediate-10k',
    name: '10K Intermediate Plan',
    difficulty: 'intermediate',
    duration: 10,
    goal: 'Improve 10K time and performance',
    workouts: [
      // Week 1 - Base Building
      { day: 1, type: 'easy', distance: 6, duration: 50, description: 'Easy run building aerobic base' },
      { day: 2, type: 'intervals', distance: 7, duration: 55, description: '15 min easy, 6x800m at 5K effort (400m recovery), 15 min easy' },
      { day: 3, type: 'easy', distance: 5, duration: 42, description: 'Easy recovery run' },
      { day: 4, type: 'tempo', distance: 8, duration: 60, description: '15 min easy, 30 min tempo effort, 15 min easy' },
      { day: 5, type: 'easy', distance: 6, duration: 50, description: 'Easy run with 6x100m strides' },
      { day: 6, type: 'rest', description: 'Rest day or cross-training' },
      { day: 7, type: 'long', distance: 10, duration: 80, description: 'Long run at comfortable aerobic pace' },

      // Week 2
      { day: 8, type: 'easy', distance: 6.5, duration: 52, description: 'Easy run focusing on form' },
      { day: 9, type: 'intervals', distance: 7.5, duration: 58, description: '15 min easy, 8x400m at mile effort (200m recovery), 15 min easy' },
      { day: 10, type: 'easy', distance: 5.5, duration: 45, description: 'Easy recovery run' },
      { day: 11, type: 'tempo', distance: 8.5, duration: 63, description: '15 min easy, 35 min tempo, 15 min easy' },
      { day: 12, type: 'easy', distance: 6.5, duration: 52, description: 'Easy run with hill strides' },
      { day: 13, type: 'rest', description: 'Rest day or light cross-training' },
      { day: 14, type: 'long', distance: 11, duration: 85, description: 'Progressive long run with negative split' },

      // Week 3 - Build Phase
      { day: 15, type: 'easy', distance: 7, duration: 55, description: 'Easy run building weekly volume' },
      { day: 16, type: 'intervals', distance: 8, duration: 60, description: '15 min easy, 5x1000m at 10K effort (200m recovery), 15 min easy' },
      { day: 17, type: 'easy', distance: 6, duration: 48, description: 'Easy recovery run' },
      { day: 18, type: 'tempo', distance: 9, duration: 65, description: '15 min easy, 40 min tempo, 15 min easy' },
      { day: 19, type: 'easy', distance: 7, duration: 55, description: 'Easy run with fartlek pickups' },
      { day: 20, type: 'rest', description: 'Rest day or yoga' },
      { day: 21, type: 'long', distance: 12, duration: 90, description: 'Long run with 3x2K at marathon pace' },

      // Week 4
      { day: 22, type: 'easy', distance: 7.5, duration: 58, description: 'Easy run at aerobic pace' },
      { day: 23, type: 'intervals', distance: 8.5, duration: 63, description: '15 min easy, 6x600m at 3K effort (90s recovery), 20 min easy' },
      { day: 24, type: 'easy', distance: 6.5, duration: 50, description: 'Easy recovery run' },
      { day: 25, type: 'tempo', distance: 9.5, duration: 68, description: '15 min easy, 45 min tempo with 5 min break, 15 min easy' },
      { day: 26, type: 'easy', distance: 7.5, duration: 58, description: 'Easy run with 8x20s hill sprints' },
      { day: 27, type: 'rest', description: 'Rest day or light activity' },
      { day: 28, type: 'long', distance: 13, duration: 95, description: 'Long run practicing race nutrition' },

      // Week 5 - Peak Phase
      { day: 29, type: 'easy', distance: 8, duration: 60, description: 'Easy run maintaining base' },
      { day: 30, type: 'intervals', distance: 9, duration: 65, description: '15 min easy, 4x1200m at 5K effort (400m recovery), 20 min easy' },
      { day: 31, type: 'easy', distance: 7, duration: 52, description: 'Easy recovery run' },
      { day: 32, type: 'tempo', distance: 10, duration: 70, description: '15 min easy, 50 min tempo, 15 min easy' },
      { day: 33, type: 'easy', distance: 8, duration: 60, description: 'Easy run with rhythm changes' },
      { day: 34, type: 'rest', description: 'Rest day or cross-training' },
      { day: 35, type: 'long', distance: 14, duration: 100, description: 'Peak long run with race pace segments' },

      // Week 6
      { day: 36, type: 'easy', distance: 8.5, duration: 63, description: 'Easy run at comfortable effort' },
      { day: 37, type: 'intervals', distance: 9.5, duration: 68, description: '15 min easy, 3x1600m at 10K effort (400m recovery), 20 min easy' },
      { day: 38, type: 'easy', distance: 7.5, duration: 55, description: 'Easy recovery run' },
      { day: 39, type: 'tempo', distance: 10.5, duration: 73, description: '20 min easy, 40 min tempo, 20 min easy' },
      { day: 40, type: 'easy', distance: 8.5, duration: 63, description: 'Easy run with strides' },
      { day: 41, type: 'rest', description: 'Rest day or gentle yoga' },
      { day: 42, type: 'long', distance: 15, duration: 105, description: 'Long run building aerobic capacity' },

      // Week 7 - Sharpening
      { day: 43, type: 'easy', distance: 8, duration: 60, description: 'Easy run with good rhythm' },
      { day: 44, type: 'intervals', distance: 9, duration: 65, description: '15 min easy, 8x300m at mile effort (100m recovery), 20 min easy' },
      { day: 45, type: 'easy', distance: 7, duration: 52, description: 'Easy recovery run' },
      { day: 46, type: 'tempo', distance: 9, duration: 65, description: '15 min easy, 2x15 min at 10K pace (5 min recovery), 15 min easy' },
      { day: 47, type: 'easy', distance: 8, duration: 60, description: 'Easy run preparing for peak week' },
      { day: 48, type: 'rest', description: 'Rest day or light cross-training' },
      { day: 49, type: 'long', distance: 13, duration: 95, description: 'Long run with race simulation' },

      // Week 8 - Peak Week
      { day: 50, type: 'easy', distance: 7, duration: 52, description: 'Easy run starting peak week' },
      { day: 51, type: 'intervals', distance: 8, duration: 58, description: '15 min easy, 6x500m at 3K effort (90s recovery), 20 min easy' },
      { day: 52, type: 'easy', distance: 6, duration: 45, description: 'Easy recovery run' },
      { day: 53, type: 'tempo', distance: 8, duration: 58, description: '15 min easy, 30 min at 10K race pace, 15 min easy' },
      { day: 54, type: 'easy', distance: 6, duration: 45, description: 'Easy run with 4x100m strides' },
      { day: 55, type: 'rest', description: 'Rest day before time trial' },
      { day: 56, type: 'race', distance: 8, duration: 50, description: 'Time trial: 8K at 10K effort or tune-up race' },

      // Week 9 - Taper
      { day: 57, type: 'easy', distance: 6, duration: 45, description: 'Easy run beginning taper' },
      { day: 58, type: 'intervals', distance: 7, duration: 50, description: '15 min easy, 6x200m at mile effort (200m recovery), 15 min easy' },
      { day: 59, type: 'easy', distance: 5, duration: 38, description: 'Easy recovery run' },
      { day: 60, type: 'tempo', distance: 6, duration: 45, description: '10 min easy, 20 min at 10K pace, 10 min easy' },
      { day: 61, type: 'easy', distance: 5, duration: 38, description: 'Easy run with short strides' },
      { day: 62, type: 'rest', description: 'Rest day or light stretching' },
      { day: 63, type: 'long', distance: 8, duration: 60, description: 'Reduced long run staying sharp' },

      // Week 10 - Race Week
      { day: 64, type: 'easy', distance: 5, duration: 38, description: 'Easy run with 4x30s at race pace' },
      { day: 65, type: 'rest', description: 'Rest day or gentle movement' },
      { day: 66, type: 'easy', distance: 4, duration: 30, description: 'Easy shakeout with 3x100m strides' },
      { day: 67, type: 'rest', description: 'Rest day - mental preparation' },
      { day: 68, type: 'easy', distance: 3, duration: 25, description: 'Very easy run with 3x20s at race pace' },
      { day: 69, type: 'rest', description: 'Rest day before race' },
      { day: 70, type: 'race', distance: 10, duration: 50, description: 'RACE DAY: 10K race - execute your strategy!' }
    ]
  },
  {
    id: 'intermediate-half-marathon',
    name: 'Half Marathon Intermediate Plan',
    difficulty: 'intermediate',
    duration: 14,
    goal: 'Improve half marathon time and performance',
    workouts: [
      // Week 1 - Base Building
      { day: 1, type: 'easy', distance: 8, duration: 64, description: 'Easy run building from previous fitness' },
      { day: 2, type: 'intervals', distance: 9, duration: 68, description: '20 min easy, 6x800m at 5K effort (90s recovery), 20 min easy' },
      { day: 3, type: 'easy', distance: 6, duration: 48, description: 'Easy recovery run' },
      { day: 4, type: 'tempo', distance: 10, duration: 75, description: '15 min easy, 45 min tempo effort, 15 min easy' },
      { day: 5, type: 'easy', distance: 7, duration: 56, description: 'Easy run with 8x100m strides' },
      { day: 6, type: 'rest', description: 'Rest day or cross-training' },
      { day: 7, type: 'long', distance: 16, duration: 120, description: 'Long run at comfortable aerobic pace' },

      // Week 2
      { day: 8, type: 'easy', distance: 8.5, duration: 68, description: 'Easy run focusing on efficiency' },
      { day: 9, type: 'intervals', distance: 9.5, duration: 71, description: '20 min easy, 5x1000m at 10K effort (200m recovery), 20 min easy' },
      { day: 10, type: 'easy', distance: 6.5, duration: 52, description: 'Easy recovery run' },
      { day: 11, type: 'tempo', distance: 11, duration: 80, description: '15 min easy, 50 min tempo, 15 min easy' },
      { day: 12, type: 'easy', distance: 7.5, duration: 60, description: 'Easy run with hill strides' },
      { day: 13, type: 'rest', description: 'Rest day or light activity' },
      { day: 14, type: 'long', distance: 17, duration: 125, description: 'Progressive long run with negative split' },

      // Week 3 - Build Phase
      { day: 15, type: 'easy', distance: 9, duration: 72, description: 'Easy run building weekly volume' },
      { day: 16, type: 'intervals', distance: 10, duration: 74, description: '20 min easy, 4x1200m at 5K effort (400m recovery), 20 min easy' },
      { day: 17, type: 'easy', distance: 7, duration: 56, description: 'Easy recovery run' },
      { day: 18, type: 'tempo', distance: 12, duration: 85, description: '20 min easy, 45 min tempo, 20 min easy' },
      { day: 19, type: 'easy', distance: 8, duration: 64, description: 'Easy run with fartlek segments' },
      { day: 20, type: 'rest', description: 'Rest day or yoga' },
      { day: 21, type: 'long', distance: 18, duration: 130, description: 'Long run with 4x3K at marathon pace' },

      // Week 4
      { day: 22, type: 'easy', distance: 9.5, duration: 76, description: 'Easy run at aerobic pace' },
      { day: 23, type: 'intervals', distance: 10.5, duration: 77, description: '20 min easy, 6x600m at 3K effort (90s recovery), 25 min easy' },
      { day: 24, type: 'easy', distance: 7.5, duration: 60, description: 'Easy recovery run' },
      { day: 25, type: 'tempo', distance: 13, duration: 90, description: '20 min easy, 2x25 min tempo (5 min recovery), 20 min easy' },
      { day: 26, type: 'easy', distance: 8.5, duration: 68, description: 'Easy run with 10x20s hill sprints' },
      { day: 27, type: 'rest', description: 'Rest day or cross-training' },
      { day: 28, type: 'long', distance: 19, duration: 135, description: 'Long run practicing race nutrition' },

      // Week 5 - Build Continues
      { day: 29, type: 'easy', distance: 10, duration: 80, description: 'Easy run maintaining base' },
      { day: 30, type: 'intervals', distance: 11, duration: 80, description: '20 min easy, 3x1600m at 10K effort (400m recovery), 25 min easy' },
      { day: 31, type: 'easy', distance: 8, duration: 64, description: 'Easy recovery run' },
      { day: 32, type: 'tempo', distance: 14, duration: 95, description: '20 min easy, 55 min tempo, 20 min easy' },
      { day: 33, type: 'easy', distance: 9, duration: 72, description: 'Easy run with rhythm changes' },
      { day: 34, type: 'rest', description: 'Rest day or light cross-training' },
      { day: 35, type: 'long', distance: 20, duration: 140, description: 'Long run building endurance capacity' },

      // Week 6 - Peak Build
      { day: 36, type: 'easy', distance: 10.5, duration: 84, description: 'Easy run at comfortable effort' },
      { day: 37, type: 'intervals', distance: 11.5, duration: 83, description: '20 min easy, 8x400m at mile effort (90s recovery), 25 min easy' },
      { day: 38, type: 'easy', distance: 8.5, duration: 68, description: 'Easy recovery run' },
      { day: 39, type: 'tempo', distance: 15, duration: 100, description: '20 min easy, 60 min tempo, 20 min easy' },
      { day: 40, type: 'easy', distance: 9.5, duration: 76, description: 'Easy run with strides' },
      { day: 41, type: 'rest', description: 'Rest day or gentle yoga' },
      { day: 42, type: 'long', distance: 21, duration: 145, description: 'Peak long run with race pace practice' },

      // Week 7 - Peak Training
      { day: 43, type: 'easy', distance: 11, duration: 88, description: 'Easy run with good rhythm' },
      { day: 44, type: 'intervals', distance: 12, duration: 86, description: '20 min easy, 5x800m at 3K effort (200m recovery), 30 min easy' },
      { day: 45, type: 'easy', distance: 9, duration: 72, description: 'Easy recovery run' },
      { day: 46, type: 'tempo', distance: 14, duration: 95, description: '20 min easy, 3x15 min at half marathon pace (5 min recovery), 20 min easy' },
      { day: 47, type: 'easy', distance: 10, duration: 80, description: 'Easy run preparing for peak' },
      { day: 48, type: 'rest', description: 'Rest day or cross-training' },
      { day: 49, type: 'long', distance: 22, duration: 150, description: 'Peak long run - race simulation' },

      // Week 8 - Peak Week
      { day: 50, type: 'easy', distance: 10, duration: 80, description: 'Easy run maintaining fitness' },
      { day: 51, type: 'intervals', distance: 11, duration: 80, description: '20 min easy, 6x600m at 5K effort (90s recovery), 25 min easy' },
      { day: 52, type: 'easy', distance: 8, duration: 64, description: 'Easy recovery run' },
      { day: 53, type: 'tempo', distance: 12, duration: 85, description: '20 min easy, 45 min at half marathon pace, 20 min easy' },
      { day: 54, type: 'easy', distance: 8, duration: 64, description: 'Easy run with 6x100m strides' },
      { day: 55, type: 'rest', description: 'Rest day before tune-up' },
      { day: 56, type: 'race', distance: 10, duration: 60, description: 'Tune-up race: 10K at half marathon effort or time trial' },

      // Week 9 - Recovery Week
      { day: 57, type: 'easy', distance: 8, duration: 64, description: 'Easy run post-tune-up recovery' },
      { day: 58, type: 'intervals', distance: 9, duration: 68, description: '20 min easy, 8x200m at mile effort (200m recovery), 20 min easy' },
      { day: 59, type: 'easy', distance: 7, duration: 56, description: 'Easy recovery run' },
      { day: 60, type: 'tempo', distance: 10, duration: 75, description: '15 min easy, 30 min tempo, 15 min easy' },
      { day: 61, type: 'easy', distance: 8, duration: 64, description: 'Easy run with short pickups' },
      { day: 62, type: 'rest', description: 'Rest day or light activity' },
      { day: 63, type: 'long', distance: 18, duration: 130, description: 'Long run recovering from peak training' },

      // Week 10 - Sharpening
      { day: 64, type: 'easy', distance: 9, duration: 72, description: 'Easy run building back up' },
      { day: 65, type: 'intervals', distance: 10, duration: 74, description: '20 min easy, 4x1000m at 10K effort (200m recovery), 20 min easy' },
      { day: 66, type: 'easy', distance: 7, duration: 56, description: 'Easy recovery run' },
      { day: 67, type: 'tempo', distance: 11, duration: 80, description: '15 min easy, 50 min at half marathon pace, 15 min easy' },
      { day: 68, type: 'easy', distance: 8, duration: 64, description: 'Easy run with race pace strides' },
      { day: 69, type: 'rest', description: 'Rest day or cross-training' },
      { day: 70, type: 'long', distance: 19, duration: 135, description: 'Long run with race pace segments' },

      // Week 11 - Final Build
      { day: 71, type: 'easy', distance: 9, duration: 72, description: 'Easy run maintaining sharpness' },
      { day: 72, type: 'intervals', distance: 10, duration: 74, description: '20 min easy, 3x1200m at 5K effort (400m recovery), 20 min easy' },
      { day: 73, type: 'easy', distance: 7, duration: 56, description: 'Easy recovery run' },
      { day: 74, type: 'tempo', distance: 11, duration: 80, description: '20 min easy, 40 min tempo, 20 min easy' },
      { day: 75, type: 'easy', distance: 8, duration: 64, description: 'Easy run with confidence builders' },
      { day: 76, type: 'rest', description: 'Rest day or gentle movement' },
      { day: 77, type: 'long', distance: 16, duration: 115, description: 'Final long run before taper' },

      // Week 12 - Taper Begins
      { day: 78, type: 'easy', distance: 8, duration: 64, description: 'Easy run beginning taper' },
      { day: 79, type: 'intervals', distance: 8, duration: 60, description: '15 min easy, 6x300m at mile effort (100m recovery), 15 min easy' },
      { day: 80, type: 'easy', distance: 6, duration: 48, description: 'Easy recovery run' },
      { day: 81, type: 'tempo', distance: 8, duration: 60, description: '15 min easy, 30 min at race pace, 15 min easy' },
      { day: 82, type: 'easy', distance: 6, duration: 48, description: 'Easy run with short strides' },
      { day: 83, type: 'rest', description: 'Rest day or light stretching' },
      { day: 84, type: 'long', distance: 12, duration: 90, description: 'Reduced long run staying sharp' },

      // Week 13 - Deep Taper
      { day: 85, type: 'easy', distance: 6, duration: 48, description: 'Easy run with 4x30s at race pace' },
      { day: 86, type: 'intervals', distance: 6, duration: 45, description: '15 min easy, 4x200m at 5K effort (200m recovery), 10 min easy' },
      { day: 87, type: 'easy', distance: 5, duration: 40, description: 'Easy recovery run' },
      { day: 88, type: 'tempo', distance: 6, duration: 45, description: '10 min easy, 20 min at race pace, 10 min easy' },
      { day: 89, type: 'easy', distance: 5, duration: 40, description: 'Easy run with relaxed strides' },
      { day: 90, type: 'rest', description: 'Rest day or gentle yoga' },
      { day: 91, type: 'long', distance: 8, duration: 60, description: 'Short long run maintaining feel' },

      // Week 14 - Race Week
      { day: 92, type: 'easy', distance: 5, duration: 40, description: 'Easy run with 4x20s at race pace' },
      { day: 93, type: 'rest', description: 'Rest day or gentle movement' },
      { day: 94, type: 'easy', distance: 4, duration: 30, description: 'Easy shakeout with 3x100m strides' },
      { day: 95, type: 'rest', description: 'Rest day - mental preparation' },
      { day: 96, type: 'easy', distance: 3, duration: 25, description: 'Very easy run with 3x20s at race pace' },
      { day: 97, type: 'rest', description: 'Rest day before race' },
      { day: 98, type: 'race', distance: 21.1, duration: 105, description: 'RACE DAY: Half marathon - execute your strategy and PR!' }
    ]
  }
];
