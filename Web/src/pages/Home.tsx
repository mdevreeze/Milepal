import { Component } from 'solid-js';
import { defaultSchedules } from '../data/schedules';
import ScheduleList from '../components/ScheduleList';
import { RunningSchedule } from '../types';

interface HomeProps {
  onSelectSchedule: (schedule: RunningSchedule) => void;
}

const Home: Component<HomeProps> = (props) => {
  return (
    <div>
      <div class="bg-sky-500 text-white py-12 px-4">
        <div class="container mx-auto text-center">
          <h1 class="text-3xl font-bold mb-4">Plan Your Running Success</h1>
          <p class="text-xl mb-6 max-w-2xl mx-auto">Choose from professionally designed training plans to help you achieve your running goals.</p>
          <div class="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => document.getElementById('schedules')?.scrollIntoView({ behavior: 'smooth' })}
              class="px-6 py-3 bg-white text-sky-700 rounded-md font-medium hover:bg-sky-50 transition-colors"
            >
              Browse Plans
            </button>
            <button 
              onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              class="px-6 py-3 bg-sky-700 text-white rounded-md font-medium hover:bg-sky-600 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div id="schedules" class="scroll-mt-16">
        <ScheduleList 
          schedules={defaultSchedules} 
          onSelectSchedule={props.onSelectSchedule} 
        />
      </div>

      <div id="benefits" class="container mx-auto px-4 py-10 scroll-mt-16">
        <h2 class="text-2xl font-bold mb-6 text-center">Why Use a Running Schedule?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div class="mb-3 text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2">Prevent Injuries</h3>
            <p class="text-gray-600">Structured training plans ensure gradual progression, reducing the risk of overtraining and injuries.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div class="mb-3 text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2">Improve Performance</h3>
            <p class="text-gray-600">Scientific training principles help you build endurance, speed, and strength in a balanced way.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div class="mb-3 text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2">Stay Consistent</h3>
            <p class="text-gray-600">Having a plan helps you stay accountable and consistent with your training throughout the week.</p>
          </div>
        </div>

        <div class="mt-12 bg-sky-50 rounded-lg p-6">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="md:w-1/3">
              <img src="https://via.placeholder.com/300x200" alt="Running progress" class="rounded-lg shadow-md w-full" />
            </div>
            <div class="md:w-2/3">
              <h3 class="text-xl font-bold mb-3">Track Your Progress</h3>
              <p class="text-gray-700 mb-4">With our running scheduler, you can track your progress, adjust your training based on your performance, and stay motivated throughout your journey.</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Follow professionally designed plans for your specific goals</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Customize your rest days and distance preferences</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Stay motivated with clear weekly goals and progression</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-10">
        <h2 class="text-xl font-bold mb-4">Why Use a Running Schedule?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="mb-3 text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2">Prevent Injuries</h3>
            <p class="text-gray-600">Structured training plans ensure gradual progression, reducing the risk of overtraining and injuries.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="mb-3 text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2">Improve Performance</h3>
            <p class="text-gray-600">Scientific training principles help you build endurance, speed, and strength in a balanced way.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="mb-3 text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2">Stay Consistent</h3>
            <p class="text-gray-600">Having a plan helps you stay accountable and consistent with your training throughout the week.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
