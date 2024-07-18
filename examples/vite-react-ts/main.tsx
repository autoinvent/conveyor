import { createRoot } from 'react-dom/client';

import '@autoinvent/conveyor/styles.css';

import App from './App';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);

  root.render(<App />);
};

initSPA();
