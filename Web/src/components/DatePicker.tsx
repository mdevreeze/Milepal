import { Component, createSignal } from 'solid-js';

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
  onCancel: () => void;
  minDate?: Date;
}

const DatePicker: Component<DatePickerProps> = (props) => {
  const today = new Date();
  const minDate = props.minDate || today;
  
  const [selectedDate, setSelectedDate] = createSignal<string>(
    today.toISOString().split('T')[0]
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const date = new Date(selectedDate());
    props.onDateSelect(date);
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          When do you want to start?
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div class="mb-6">
            <label for="start-date" class="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={selectedDate()}
              min={formatDateForInput(minDate)}
              onChange={(e) => setSelectedDate(e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              required
            />
            <p class="mt-2 text-sm text-gray-500">
              Choose when you want to begin your running plan
            </p>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              onClick={props.onCancel}
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors"
            >
              Start Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatePicker;