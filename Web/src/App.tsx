import { Component, createSignal, Show, onMount, createEffect } from 'solid-js';
import BottomNavigation from './components/BottomNavigation';
import PageTransition from './components/PageTransition';
import Schedules from './pages/Schedules';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import ScheduleDetail from './pages/ScheduleDetail';
import {RunningSchedule, ScheduleInstance} from "./types";
import { saveActiveSchedule, loadActiveSchedule } from './utils/localStorage';
import { markWorkoutComplete } from './utils/workoutUtils';

const App: Component = () => {
  const [selectedSchedule, setSelectedSchedule] = createSignal<RunningSchedule | null>(null);
  const [activeSchedule, setActiveSchedule] = createSignal<ScheduleInstance | null>(null);
  const [activeTab, setActiveTab] = createSignal<string>('schedules');

  // Load active schedule from localStorage on mount
  onMount(() => {
    const stored = loadActiveSchedule();
    if (stored) {
      setActiveSchedule(stored);
    }
  });

  // Save active schedule to localStorage whenever it changes
  createEffect(() => {
    saveActiveSchedule(activeSchedule());
  });

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
        completedWorkouts: new Set(),
        workoutHistory: []
      };
      setActiveSchedule(instance);
    }
  };

  const handleBack = () => {
    setSelectedSchedule(null);
    window.scrollTo(0, 0);
  };

  const handleClearSchedule = () => {
    setActiveSchedule(null);
    window.scrollTo(0, 0);
  };

  const handleMarkWorkoutComplete = (workoutKey: string, rating?: number, notes?: string) => {
    const current = activeSchedule();
    if (current) {
      const updated = markWorkoutComplete(current, workoutKey, rating, notes);
      setActiveSchedule(updated);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'progress' && !activeSchedule()) {
      return;
    }
    setActiveTab(tab);
    // Clear selected schedule when changing tabs to go back to main view
    setSelectedSchedule(null);
  };

  const renderCurrentView = () => {
    if (selectedSchedule()) {
      return (
        <PageTransition pageKey={`schedule-${selectedSchedule()!.id}`}>
          <ScheduleDetail
            schedule={selectedSchedule()!}
            onBack={handleBack}
            onStartSchedule={handleStartSchedule}
            activeSchedule={activeSchedule()}
          />
        </PageTransition>
      );
    }

    switch (activeTab()) {
      case 'schedules':
        return (
          <PageTransition pageKey="schedules">
            <Schedules onSelectSchedule={handleSelectSchedule} />
          </PageTransition>
        );
      case 'progress':
        return (
          <PageTransition pageKey="progress">
            <Progress 
              activeSchedule={activeSchedule()} 
              onClearSchedule={handleClearSchedule}
              onMarkWorkoutComplete={handleMarkWorkoutComplete}
            />
          </PageTransition>
        );
      case 'profile':
        return (
          <PageTransition pageKey="profile">
            <Profile activeSchedule={activeSchedule()} />
          </PageTransition>
        );
      default:
        return (
          <PageTransition pageKey="schedules">
            <Schedules onSelectSchedule={handleSelectSchedule} />
          </PageTransition>
        );
    }
  };

  return (
    <div class="min-h-screen bg-gray-50">
      <main class="pb-16 relative">
        {renderCurrentView()}
      </main>

      <BottomNavigation
        activeTab={activeTab()}
        onTabChange={handleTabChange}
        hasActiveSchedule={!!activeSchedule()}
      />
    </div>
  );
};

export default App;
