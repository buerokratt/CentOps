import React from 'react';
import { createRoot } from 'react-dom/client';
import type { QueryFunction } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from 'App';
import api from 'services/api';
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
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
