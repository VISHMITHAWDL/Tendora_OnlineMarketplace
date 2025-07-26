import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Navigation from './components/Home_component/Navigationbar';
import Footer from './components/common/Footer';

import Home              from './pages/Home';
import Kidsection   from './pages/productpages/Kidsection';
import Menfashion        from './pages/productpages/Menfashion';
import Womenfashion      from './pages/productpages/Womenfashion';
import Specialdeals      from './pages/productpages/Specialdeals';
import Notfound          from './pages/Notfound';
import About            from './pages/About';
import Contact          from './pages/Contact';
import ProductDetail from './pages/productpages/ProductDetail';

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
      { path: '/kidssection',  element: <Kidsection /> },
      { path: '/menfashion',        element: <Menfashion /> },
      { path: '/womenfashion',      element: <Womenfashion /> },
      { path: '/special-deals',      element: <Specialdeals /> },
      { path: '*',                   element: <Notfound /> },
      { path: '/about',              element: <About /> },
      { path: '/contact',            element: <Contact /> },
      { path: '/productdetail/:id',       element: <ProductDetail /> },
      
    ],
  },
]);

export default Routes;
