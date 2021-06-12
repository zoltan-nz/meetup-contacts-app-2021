import { render } from 'react-dom';
import { App } from './App';

(async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // Use 'warn' if you would like to see all the unhandled requests
    });

    // You can print all the active handlers with the following command
    // worker.printHandlers();
  }

  render(<App />, document.getElementById('root'));
})();
