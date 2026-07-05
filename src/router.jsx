import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import LoadingFallback from './components/LoadingFallback.jsx';

const About = lazy(() => import('./pages/About.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Quiz = lazy(() => import('./pages/Quiz.jsx'));
const Simulation = lazy(() => import('./pages/Simulation.jsx'));
const StoryMap = lazy(() => import('./pages/StoryMap.jsx'));
const WebGIS = lazy(() => import('./pages/WebGIS.jsx'));

function lazyPage(Page) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Page />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: lazyPage(Home) },
      { path: '/storymap', element: lazyPage(StoryMap) },
      { path: '/webgis', element: lazyPage(WebGIS) },
      { path: '/quiz', element: lazyPage(Quiz) },
      { path: '/simulation', element: lazyPage(Simulation) },
      { path: '/dashboard', element: <Navigate to="/webgis" replace /> },
      { path: '/learn', element: <Navigate to="/storymap" replace /> },
      { path: '/explore', element: <Navigate to="/quiz" replace /> },
      { path: '/about', element: lazyPage(About) },
      { path: '*', element: lazyPage(NotFound) },
    ],
  },
]);
