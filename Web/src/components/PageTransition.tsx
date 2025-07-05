import { Component, createSignal, onMount, children, createEffect } from 'solid-js';

interface PageTransitionProps {
  pageKey: string;
  children: any;
}

const PageTransition: Component<PageTransitionProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [currentKey, setCurrentKey] = createSignal(props.pageKey);
  const resolved = children(() => props.children);

  // Handle page key changes with smooth transition
  createEffect(() => {
    if (props.pageKey !== currentKey()) {
      setIsVisible(false);
      setCurrentKey(props.pageKey);
      
      // Trigger enter animation after a brief delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    }
  });

  onMount(() => {
    // Initial fade in
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  });

  return (
    <div 
      class={`w-full transition-all duration-300 ease-out ${
        isVisible() 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-3'
      }`}
    >
      {resolved()}
    </div>
  );
};

export default PageTransition;