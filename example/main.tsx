import { createRoot } from 'react-dom/client';

import App from './App';

import '../public/styles/index.css';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);

  root.render(<App />);
};

initSPA();
