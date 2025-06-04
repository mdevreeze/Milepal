/**
 * Native App Behavior - Enhances web app to behave more like a native app
 */

// Prevent default touch behavior to avoid delay
document.addEventListener('touchstart', function() {}, { passive: true });

// Disable pull-to-refresh
document.body.addEventListener('touchmove', function(e) {
  if (document.body.scrollTop === 0) {
    e.preventDefault();
  }
}, { passive: false });

// Handle back button for SPA navigation
window.addEventListener('popstate', function(event) {
  // Custom back navigation logic can be added here
  console.log('Back button pressed, handling navigation');
});

// Disable text selection for app-like feel
document.addEventListener('selectstart', function(e) {
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
  }
});

// Add active state for better touch feedback
document.addEventListener('touchstart', function(e) {
  if (e.target.classList.contains('btn-primary') || 
      e.target.closest('button')) {
    e.target.classList.add('active');
  }
});

document.addEventListener('touchend', function(e) {
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(el => el.classList.remove('active'));
});

// Add visibility change handling to pause/resume app appropriately
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // App went to background
    console.log('App moved to background');
    // Pause any animations, timers, etc.
  } else {
    // App came to foreground
    console.log('App moved to foreground');
    // Resume animations, refresh data if needed
  }
});

// Initialize viewport height fix for mobile browsers
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport and update on resize
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
