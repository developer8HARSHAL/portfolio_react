import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

jest.mock('aos', () => ({ init: jest.fn(), refresh: jest.fn() }));
jest.mock('react-ga4', () => ({ send: jest.fn() }));
jest.mock('./Components/Footer', () => function FooterMock() {
  return <footer aria-label="Footer" />;
});

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: false, addListener: jest.fn(), removeListener: jest.fn() });
  window.scrollTo = jest.fn();
  global.IntersectionObserver = class IntersectionObserverMock {
    observe() {}
    disconnect() {}
  };
  global.ResizeObserver = class ResizeObserverMock {
    observe() {}
    disconnect() {}
  };
});

test('home route renders the profile and selected work sections', async () => {
  renderRoute('/');
  expect(await screen.findByRole(
    'heading',
    { level: 1, name: /Harshal\s*Pinge\.?/ },
    { timeout: 5000 }
  )).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /View selected projects/i })).toHaveAttribute('href', '#project');
});

test('Art route renders its collection and its viewer closes with Escape', async () => {
  renderRoute('/art');

  const openArtwork = await screen.findByRole('button', { name: 'View Midnight flower larger' });
  openArtwork.focus();
  fireEvent.click(openArtwork);

  expect(screen.getByRole('dialog', { name: 'Midnight flower' })).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Midnight flower' })).not.toBeInTheDocument());
  expect(openArtwork).toHaveFocus();
});

test('Writing route renders the featured essay and route-specific document title', async () => {
  renderRoute('/writing');

  expect(await screen.findByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /My Thoughts on Dark Matter/i })).toHaveAttribute(
    'href',
    'https://harshalpinge.substack.com/p/my-thoughts-on-dark-matter'
  );
  await waitFor(() => expect(document.title).toBe('Writing — Harshal Pinge'));
});
