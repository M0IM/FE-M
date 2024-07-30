import React, {ReactElement} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     throwOnError: true,
  //   },
  //   mutations: {
  //     // throwOnError: true,
  //   },
  // },
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

type ReactQueryContainerProps = {children: ReactElement};

export default function TanstackQueryContainer({
  children,
}: ReactQueryContainerProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
