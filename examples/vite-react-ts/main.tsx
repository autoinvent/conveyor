import { createRoot } from 'react-dom/client';

import '@autoinvent/conveyor/style.css';

import App from './App';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);

  root.render(<App />);
};

initSPA();
