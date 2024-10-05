import ReactDOM from 'react-dom/client';
import "./styles/index.css"
import { store } from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './utils/router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const [queryClient] = useState(new QueryClient());
const browserRouter = createBrowserRouter(router);


root.render(
  <Provider store={store}>
    <RouterProvider router={browserRouter} />
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
);

