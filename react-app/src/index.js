import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ModalProvider } from "./context/Modal"

const Root = () => (

  <ModalProvider>

    <App />

  </ModalProvider>

);


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
