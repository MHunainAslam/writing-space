import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { PersistGate } from 'redux-persist/integration/react'
// import store, { persistor } from "./Store";
import { Provider } from "react-redux";
import store, { persistor } from './Store';
import { PersistGate } from 'redux-persist/lib/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode >
);

reportWebVitals();
