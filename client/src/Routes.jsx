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
import Spinner from './components/common/Spinner';
import { useSelector } from 'react-redux';
import LoginHeader from './components/login_component/Head';
import Login from './pages/Userpages/Login';
import Register from './pages/Userpages/Register';


function RootLayout() {

  const isLoading = useSelector((state) => state?.commonState?.loading);


  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* The Outlet component will render the matched child route */}
        <Outlet />
        {isLoading && <Spinner />}
      </main>
      <Footer />
    </div>
  );
}


function LoginLayout() {
  const isLoading = useSelector((state) => state?.commonState?.loading);
  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      <main className="flex-1">
        <Outlet />
        {isLoading && <Spinner />}
      </main>
      <Footer />
    </div>
  );
}




const Routes = createBrowserRouter([
  {
    element: <LoginLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
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
