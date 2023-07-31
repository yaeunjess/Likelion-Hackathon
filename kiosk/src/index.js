import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import Home from './pages/Home';
import Order from './pages/Order';
import Done from './pages/Done';

const router = createBrowserRouter([
  {
    path: '/',
    element : <App />,
    errorElement: <Error />,
    children : [
      { index: true, path: '/', element: <Home />},
      { path: '/order', element: <Order />},
      { path: '/done', element: <Done />}
      //완료 화면 
      //{ path: '/done', element : },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

reportWebVitals();
