import { render } from 'react-dom';
import { App } from './App';

(async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    await worker.start();
  }

  render(<App />, document.getElementById('root'));
})();
