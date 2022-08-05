import { describe, expect, it } from 'vitest';
import App from './App';
import { render, screen } from '../__tests__/utils';

describe('Simple working test for App', () => {
  it('brand text to be visible', () => {
    render(<App />);
    expect(screen.getByText('Moebius UI Starter')).toBeInTheDocument();
  });
});
