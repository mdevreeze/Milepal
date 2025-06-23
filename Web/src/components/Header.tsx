import { Component } from 'solid-js';

const Header: Component = () => {
  return (
    <header class="bg-sky-500 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 class="text-xl font-bold">RunScheduler</h1>
        </div>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <a href="#" class="hover:text-sky-100 font-medium">Schedules</a>
            </li>
            <li>
              <a href="#" class="hover:text-sky-100 font-medium">My Plan</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
