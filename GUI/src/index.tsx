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
import qs from 'qs';
import type { PaginationState } from '@tanstack/react-table';
import { type QueryFunctionContext } from '@tanstack/query-core';
import axios from 'axios';

if (import.meta.env.DEV) {
  try {
    await (await import('./dev')).auth();
  } catch (e) {
    console.error('[DEV] Failed to load dev module:', e);
  }
}

const defaultQueryFn: QueryFunction = async (context) => {
  let {
    queryKey: [url],
  } = context as QueryFunctionContext<string[]>;
  const { meta } = context;
  const { pageIndex, ...pagination } =
    (meta?.pagination as PaginationState) ?? {};
  if (Object.keys(pagination).length) {
    url = `${url}${url.includes('?') ? '&' : '?'}${qs.stringify({
      page: pageIndex + 1,
      ...pagination,
    })}`;
  }
  return (await api.get(url as string)).data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      queryFn: defaultQueryFn,
      retry: (_, error) => {
        // Check if the error is an Axios error and has a 401 status
        const unauthorized =
          axios.isAxiosError(error) && error.response?.status === 401;
        // if (unauthorized) window.location.href = '/et/log-in';
        return !unauthorized;
      },
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
