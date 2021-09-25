import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cabron report', () => {
  render(<App />);
  const linkElement = screen.getByText(/Carbon Report - Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
