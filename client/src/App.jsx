import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';   // this is the router you exported

export default function App() {
  return <RouterProvider router={router} />;
}
