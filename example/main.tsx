/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    <Router>
      <App />
    </Router>,
  );
};

initSPA();
