import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

const pageTitles = {
  '/': 'Home',
  '/storymap': 'Story Map',
  '/webgis': 'WebGIS',
  '/quiz': 'Quiz',
  '/simulation': 'Simulation',
  '/about': 'About',
};

export default function AppLayout() {
  const location = useLocation();
  const isWebGISPage = location.pathname === '/webgis';
  usePageTitle(pageTitles[location.pathname] ?? 'Halaman');

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="focus-ring sr-only z-[100] rounded-md bg-carbon-950 px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Lewati navigasi
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      {isWebGISPage ? null : <Footer />}
    </div>
  );
}
