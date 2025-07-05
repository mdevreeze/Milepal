import { Component } from 'solid-js';
import { defaultSchedules } from '../data/schedules';
import ScheduleList from '../components/ScheduleList';
import { RunningSchedule } from '../types';

interface SchedulesProps {
  onSelectSchedule: (schedule: RunningSchedule) => void;
}

const Schedules: Component<SchedulesProps> = (props) => {
  return (
    <div class="pb-20">
      <div class="px-4 py-6">
        <ScheduleList 
          schedules={defaultSchedules} 
          onSelectSchedule={props.onSelectSchedule} 
        />
      </div>
    </div>
  );
};

export default Schedules;