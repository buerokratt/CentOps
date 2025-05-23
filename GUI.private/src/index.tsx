import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  type QueryFunction,
} from '@tanstack/react-query';
import App from 'App';
import api from 'services/api';
import { ToastProvider } from '@centopsmodule/shared/context/ToastContext';
import 'i18n';

const defaultQueryFn: QueryFunction | undefined = async ({ queryKey }) => {
  const { data } = await api.get(queryKey[0] as string);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>
);
