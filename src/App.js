import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Header from './Components/Header';

const Home       = lazy(() => import('./Contents/Home'));
const About      = lazy(() => import('./Contents/About'));
const Experience = lazy(() => import('./Contents/Experience'));
const Project    = lazy(() => import('./Contents/Project'));
const Skill      = lazy(() => import('./Contents/Skill'));
const Contact    = lazy(() => import('./Contents/Contact'));
const Footer     = lazy(() => import('./Components/Footer'));

function SectionFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-slate-950">
      <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });

    const hash = location.hash;
    if (hash) {
      const id = hash.substring(1);
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(t);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="App bg-gray-900 min-h-screen">
      <Header />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Suspense fallback={<SectionFallback />}><Home /></Suspense>
              <Suspense fallback={<SectionFallback />}><About /></Suspense>
              <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
              <Suspense fallback={<SectionFallback />}><Project /></Suspense>
              <Suspense fallback={<SectionFallback />}><Skill /></Suspense>
              <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
            </>
          }
        />

        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
                <p className="text-2xl text-white mb-8">Page not found</p>
                <a
                  href="/"
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />

      </Routes>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
}

export default App;