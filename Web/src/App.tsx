import { Component, createSignal, Show } from 'solid-js';
import Header from './components/Header';
import Home from './pages/Home';
import ScheduleDetail from './pages/ScheduleDetail';
import {RunningSchedule, ScheduleInstance} from "./types";

const App: Component = () => {
  const [selectedSchedule, setSelectedSchedule] = createSignal<RunningSchedule | null>(null);
  const [activeSchedule, setActiveSchedule] = createSignal<ScheduleInstance | null>(null);

  const handleSelectSchedule = (schedule: RunningSchedule) => {
    // Ensure the schedule object is complete before setting it
    if (schedule && schedule.id) {
      // Make sure all required fields are present
      const safeSchedule = {
        ...schedule,
        name: schedule.name || 'Running Plan',
        difficulty: schedule.difficulty || 'beginner',
        duration: schedule.duration || 8,
        goal: schedule.goal || 'improve your running performance',
        workouts: Array.isArray(schedule.workouts) ? schedule.workouts : []
      };

      console.log('Selected schedule:', safeSchedule);
      console.log(`Schedule has ${safeSchedule.workouts.length} workouts`);

      setSelectedSchedule(safeSchedule);
      window.scrollTo(0, 0);
    } else {
      console.error('Invalid schedule object:', schedule);
    }
  };

  const handleStartSchedule = (startDate: Date) => {
    const schedule = selectedSchedule();
    if (schedule) {
      const instance: ScheduleInstance = {
        id: crypto.randomUUID(),
        scheduleId: schedule.id,
        startDate,
        isActive: true,
        completedWorkouts: new Set()
      };
      setActiveSchedule(instance);
    }
  };

  const handleBack = () => {
    setSelectedSchedule(null);
    setActiveSchedule(null);
    window.scrollTo(0, 0);
  };

  return (
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main class="flex-1">
        <Show
          when={selectedSchedule()}
          fallback={<Home onSelectSchedule={handleSelectSchedule} />}
        >
          {(schedule) => (
            <ScheduleDetail
              schedule={schedule()}
              onBack={handleBack}
              onStartSchedule={handleStartSchedule}
              activeSchedule={activeSchedule()}
            />
          )}
        </Show>
      </main>

      <footer class="bg-gray-800 text-gray-300 py-6">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <h3 class="text-white font-bold text-lg mb-2">RunScheduler</h3>
              <p class="text-sm">Your personal running plan assistant</p>
            </div>

            <div class="text-sm">
              <p>© {new Date().getFullYear()} RunScheduler. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
