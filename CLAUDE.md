# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Milepal** is a **hybrid mobile application** built with:
- **.NET MAUI** for native mobile app framework (root directory)
- **SolidJS web application** for the UI (Web/ directory)
- The web app is embedded in the MAUI app using WebView

## Development Commands

### Web Development (Web/ directory)
```bash
cd Web/

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

### MAUI Development (root directory)
```bash
# Build and run the MAUI app
dotnet build
dotnet run

# Run on specific platform
dotnet build -f net8.0-android
dotnet build -f net8.0-ios
```

The web development server runs on port 3000 with HMR on port 3001, configured to accept connections from any IP address for device testing with the MAUI app.

## Hybrid Architecture

**Milepal** is a **SolidJS** running schedule application embedded in a **.NET MAUI** hybrid app with the following architecture:

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
- Build output goes to `../Resources/Raw/wwwroot/` for MAUI app integration
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

### MAUI App Structure
- Main entry point: `MauiProgram.cs` configures the hybrid app
- `MainPage.xaml` hosts the WebView that loads the SolidJS web app
- Platform-specific configurations in `Platforms/` directory
- Uses `WebViewHelper.cs` utility for WebView management

### Web App Integration
- Web app is built and deployed to `Resources/Raw/wwwroot/` 
- MAUI app loads the web app through WebView at runtime
- Development server allows hot reload during development
- Production builds are embedded directly in the MAUI app

### Development Workflow
- For web development: work in `Web/` directory with `npm run dev`
- For MAUI development: use `dotnet build` and `dotnet run` from root
- Web builds automatically integrate with MAUI app
- No testing framework currently configured
- No linting configuration present
- Uses pnpm for dependency management but supports npm/yarn
- Build targets modern ES modules (esnext)