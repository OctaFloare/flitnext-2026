'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const client = new QueryClient();

export const ReactQueryProvider = ({ children }: {children: React.ReactNode }) => 
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>