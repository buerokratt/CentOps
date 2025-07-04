import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  type QueryFunction,
} from '@tanstack/react-query';
import App from 'App';
import api from 'services/api';
import { ToastProvider } from 'context/ToastContext';
import 'i18n';

if (import.meta.env.DEV) {
  try {
    await (await import('./dev')).auth();
  } catch (e) {
    console.error('[DEV] Failed to load dev module:', e);
  }
}

const defaultQueryFn: QueryFunction = async ({ queryKey: [url] }) =>
  (await api.get(url as string)).data;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      queryFn: defaultQueryFn,
      // staleTime: 5 * 60 * 1000, // 5 minutes
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
