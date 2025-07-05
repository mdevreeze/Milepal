import { Component, Show, createSignal, createEffect } from 'solid-js';
import { WorkoutWithSchedule } from '../utils/workoutUtils';

interface WorkoutRatingModalProps {
  isOpen: boolean;
  workout: WorkoutWithSchedule | null;
  onClose: () => void;
  onSubmit: (rating: number, notes?: string) => void;
}

const WorkoutRatingModal: Component<WorkoutRatingModalProps> = (props) => {
  const [selectedRating, setSelectedRating] = createSignal<number>(0);
  const [hoverRating, setHoverRating] = createSignal<number>(0);
  const [notes, setNotes] = createSignal<string>('');

  // Prevent background scrolling when modal is open
  createEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  const handleSubmit = () => {
    props.onSubmit(selectedRating(), notes().trim() || undefined);
    resetForm();
    props.onClose();
  };


  const resetForm = () => {
    setSelectedRating(0);
    setHoverRating(0);
    setNotes('');
  };

  const getRatingText = (rating: number): string => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Great';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <Show when={props.isOpen && props.workout}>
      <div 
        class="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-8"
        style="position: fixed; top: 0; left: 0; right: 0; bottom: 0;"
      >
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        />
        
        <div class="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all">
          {/* Header */}
          <button
            onClick={props.onClose}
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="p-6 border-b border-gray-200">
            <div class="mb-4">
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Rate Your Workout</h2>
              <div class="text-gray-600">
                <div class="text-sm mb-1">
                  {props.workout?.scheduledDate.toLocaleDateString()}
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-lg">{props.workout && ['🚶‍♂️', '⏱️', '🔄', '🏃‍♀️', '😴', '🏆'][['easy', 'tempo', 'intervals', 'long', 'rest', 'race'].indexOf(props.workout.workout.type)] || '🏃'}</span>
                  <span class="font-medium capitalize">{props.workout?.workout.type} Run</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div class="p-6">
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">
                How did your workout feel? (optional)
              </label>
              <div class="flex justify-center space-x-2">
                {Array.from({ length: 5 }, (_, i) => {
                  const starNumber = i + 1;
                  const isSelected = starNumber <= selectedRating();
                  const isHovered = starNumber <= hoverRating();
                  
                  return (
                    <button
                      onClick={() => setSelectedRating(starNumber)}
                      onMouseEnter={() => setHoverRating(starNumber)}
                      onMouseLeave={() => setHoverRating(0)}
                      class={`p-2 transition-colors hover:scale-110 transform transition-transform ${
                        isSelected || isHovered ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <svg 
                        class="h-8 w-8" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  );
                })}
              </div>
              <Show when={selectedRating() > 0 || hoverRating() > 0}>
                <div class="text-center mt-2">
                  <span class="text-sm font-medium text-gray-700">
                    {getRatingText(hoverRating() || selectedRating())}
                  </span>
                </div>
              </Show>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes()}
                onInput={(e) => setNotes(e.target.value)}
                placeholder="How did you feel? Any highlights or challenges?"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div class="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={props.onClose}
              class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              class="flex-1 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
            >
              Complete Workout
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default WorkoutRatingModal;