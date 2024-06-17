import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import { App } from './App';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.scss';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <BrowserRouter>
          <App />
          <ToastContainer autoClose={30000} />
        </BrowserRouter>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
);
