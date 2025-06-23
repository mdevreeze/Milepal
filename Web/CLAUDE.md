# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (accessible on all network interfaces)
npm run dev
# or
npm run dev:maui

# Build for production
npm run build

# Preview production build
npm run serve
```

The development server runs on port 3000 with HMR on port 3001, configured to accept connections from any IP address for device testing.

## Project Architecture

This is a **SolidJS** running schedule application with the following key architectural patterns:

### State Management
- Uses SolidJS signals for reactive state management
- Main app state managed in `App.tsx` with `createSignal`
- Key state: `selectedSchedule`, `activeSchedule` for started training plans
- No external state management library - relies on SolidJS reactivity

### Data Structure
- **Running schedules** defined in `src/data/schedules.ts` with comprehensive workout plans
- **Types** centralized in `src/types/index.ts` with TypeScript interfaces
- Each schedule contains detailed day-by-day workout descriptions across multiple weeks
- **Schedule instances** track started plans with start dates and progress

### Component Architecture
- **Pages**: `Home.tsx` (schedule selection), `ScheduleDetail.tsx` (workout details with calendar view)
- **Components**: Reusable UI components for schedule cards, workout items, headers, date picker, calendar
- **Key Components**: `DatePicker` for start date selection, `CalendarView` for training calendar
- Uses SolidJS `Show` component for conditional rendering
- Props passed down from App.tsx to child components

### Styling & UI
- **Tailwind CSS 4.0.7** for styling with custom color palette (sky colors)
- **Ark UI for SolidJS** for accessible component primitives
- Mobile-first responsive design
- Custom Tailwind config extends sky color palette

### Build Configuration
- **Vite 6.0.0** as build tool with SolidJS plugin
- **TypeScript 5.7.2** with strict configuration
- Build output goes to `../Resources/Raw/wwwroot/` (suggests integration with .NET MAUI)
- Development server configured for network access (0.0.0.0 binding)

### Key Features
- **Schedule Selection**: Multiple difficulty levels (beginner 5K, beginner 10K, beginner half-marathon, intermediate 10K, intermediate half-marathon)
- **Plan Scheduling**: "Start this plan" feature with custom start date selection
- **Calendar View**: Visual calendar showing all workouts mapped to actual dates after starting a plan
- **Workout Management**: Each schedule contains 8-16 weeks of detailed daily workouts
- **Workout Types**: Color-coded easy, tempo, intervals, long, rest, race workouts
- **Progress Tracking**: Visual indicators for today, past workouts, and upcoming sessions
- **Responsive Design**: Works on desktop and mobile devices

## Development Notes

- The app appears designed for hybrid mobile deployment (likely .NET MAUI based on build output path)
- No testing framework currently configured
- No linting configuration present
- Uses pnpm for dependency management but supports npm/yarn
- Build targets modern ES modules (esnext)