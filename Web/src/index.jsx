import { render } from 'solid-js/web';
import './styles/index.css';
import './styles/app.css';
import App from './App';

// Expose app functions globally for HTML access
window.app = {
  startNewPlan: () => {
    const appInstance = document.querySelector('#app')?.__SOLID_APP_CONTEXT__;
    if (appInstance) {
      appInstance.startNewPlan();
    }
  },
  selectPlan: (plan) => {
    const appInstance = document.querySelector('#app')?.__SOLID_APP_CONTEXT__;
    if (appInstance) {
      appInstance.selectPlan(plan);
    }
  }
};
console.log("uhaiudhe");
render(() => <App />, document.getElementById('app'));
