import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactGA from 'react-ga4';
import Header from './Components/Header';
import ErrorBoundary from './Components/ErrorBoundary';
import { ART_PATH, NOTEBOOK_PATH, WRITING_PATH } from './config/navigation';
import { scrollToId } from './utils/scrollToId';

const Home       = lazy(() => import('./Contents/Home'));
const About      = lazy(() => import('./Contents/About'));
const Project    = lazy(() => import('./Contents/Project'));
const Skill      = lazy(() => import('./Contents/Skill'));
const Contact    = lazy(() => import('./Contents/Contact'));
const Art        = lazy(() => import('./Contents/Art'));
const Writing    = lazy(() => import('./Contents/Writing'));
const Footer     = lazy(() => import('./Components/Footer'));

function SectionFallback() {
  return (
    <div role="status" aria-label="Loading page" className="min-h-[50vh] flex items-center justify-center bg-canvas">
      <div aria-hidden="true" className="w-8 h-8 rounded-full border-2 border-line border-t-foreground animate-spin" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-canvas">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
        <p className="text-2xl text-foreground/60 mb-8">Page not found</p>
        <Link to="/" className="btn-pill-accent">
          Go Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 64, easing: 'ease-out-cubic' });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  useEffect(() => {
    const pages = {
      [ART_PATH]: {
        title: 'Art — Harshal Pinge',
        description: 'Paintings and sketches by Harshal Pinge, collected outside the editor.',
      },
      [WRITING_PATH]: {
        title: 'Writing — Harshal Pinge',
        description: 'Essays by Harshal Pinge on books, ideas, and the questions that stay with us.',
      },
    };
    const metadata = pages[location.pathname] || {
      title: location.pathname === '/' ? 'Harshal Pinge — Frontend & Full-Stack Developer' : 'Page not found — Harshal Pinge',
      description: 'Computer Engineering graduate in Pune building web applications with React, Next.js, and Node.js.',
    };
    const canonicalUrl = new URL(location.pathname, window.location.origin).href;

    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
  }, [location.pathname]);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.hash });

    const hash = location.hash;
    if (hash) {
      const id = hash.substring(1);
      const t = setTimeout(() => {
        scrollToId(id);
      }, 100);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App bg-canvas min-h-screen">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-tile bg-foreground px-5 py-3 text-[14px] font-semibold text-canvas transition-transform duration-200 focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <Header />

      <ErrorBoundary>
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <About />
                    <Project />
                    <Skill />
                    <Writing limit={3} />
                    <Art limit={3} />
                    <Contact />
                  </>
                }
              />
              <Route path={ART_PATH} element={<Art />} />
              <Route path={WRITING_PATH} element={<Writing />} />
              <Route path={NOTEBOOK_PATH} element={<Navigate to={WRITING_PATH} replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </ErrorBoundary>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
}

export default App;
