import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { connectRoutes } from 'redux-first-router';
import { createBrowserHistory as createHistory } from 'rudy-history';
import { SystemProvider } from './components/SystemContext';

import customersViewSlice from './state/customersView.slice';
import customerViewSlice from './state/customerView.slice';
import ordersViewSlice from './state/ordersView.slice';
import navigationSlice, {
  customersView,
  ordersView,
  customerView,
  orderView,
  aboutView,
} from './state/navigation.slice';

const routeMap = {
  [customersView.type]: '/(customers)?',
  [ordersView.type]: '/orders',
  [customerView.type]: '/customer/:id',
  [orderView.type]: '/order/:customerId/:id',
  [aboutView.type]: '/about',
};

const {
  reducer: routingReducer,
  middleware: routingMiddleware,
  enhancer: routingEnhancer,
} = connectRoutes(routeMap, {
  createHistory,
});

const store = configureStore({
  reducer: {
    location: routingReducer,
    navigation: navigationSlice,
    customersView: customersViewSlice,
    customerView: customerViewSlice,
    ordersView: ordersViewSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(routingMiddleware),
  enhancers: [routingEnhancer],
});

const readModelEndpoints = {
  customers: 'http://127.0.0.1:3003',
  orders: 'http://127.0.0.1:3005',
};

const commandEndpoint = 'http://127.0.0.1:3001/api/command';

const aggregates = {
  customer: {
    createCustomer: 'CREATE',
    updateCustomer: 'UPDATE',
  },
  order: {
    createOrder: 'CREATE',
  },
};

const container = document.getElementById('root');
const root = createRoot(container);

// Note that the `StrictMode` tag will make
// data loading Redux actions to occur twice.
// That's a known debug-only effect and can
// generally be ignored, but to observe
// correct behavior at development time, the
// tag must be removed or commented here.
root.render(
  <StrictMode>
    <SystemProvider
      readModelEndpoints={readModelEndpoints}
      commandEndpoint={commandEndpoint}
      aggregates={aggregates}
    >
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </SystemProvider>
  </StrictMode>
);
