/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './app/App';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container!);
  const queryClient = new QueryClient();

  root.render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>,
  );
};

initSPA();
