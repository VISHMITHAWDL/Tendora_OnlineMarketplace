import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Navigation from './components/Home_component/Navigationbar';
import Footer from './components/common/Footer';

import Home              from './pages/Home';
import Beautyandhealth   from './pages/Beautyandhealth';
import Booksandmedia     from './pages/Booksandmedia';
import Electronic        from './pages/Electronic';
import Fashion           from './pages/Fashion';
import Menfashion        from './pages/Menfashion';
import Womenfashion      from './pages/Womenfashion';
import Specialdeals      from './pages/Specialdeals';
import Sportandoutdoors  from './pages/Sportandoutdoors';
import Homeandgarden     from './pages/Homeandgarden';
import Notfound          from './pages/Notfound';
import About            from './pages/About';
import Contact          from './pages/Contact';

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const Routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/',                 element: <Home /> },
      { path: '/beauty-and-health',  element: <Beautyandhealth /> },
      { path: '/books-and-media',    element: <Booksandmedia /> },
      { path: '/electronics',        element: <Electronic /> },
      { path: '/fashion',            element: <Fashion /> },
      { path: '/men-fashion',        element: <Menfashion /> },
      { path: '/women-fashion',      element: <Womenfashion /> },
      { path: '/special-deals',      element: <Specialdeals /> },
      { path: '/sport-and-outdoors', element: <Sportandoutdoors /> },
      { path: '/home-and-garden',    element: <Homeandgarden /> },
      { path: '*',                   element: <Notfound /> },
      { path: '/about',              element: <About /> },
      { path: '/contact',            element: <Contact /> },
    ],
  },
]);

export default Routes;
