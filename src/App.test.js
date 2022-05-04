import { render, screen } from '@testing-library/react';
import App from './App';

test('TIMELOGS', () => {
  render(<App />);
  const linkElement = screen.getByText(/TIMELOGS/i);
  expect(linkElement).toBeInTheDocument();
});

