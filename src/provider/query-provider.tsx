"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { IntegrationsProvider } from '@/hooks/useIntegrations'

interface IQueryProviderProps {
    children: ReactNode
}

export function QueryProvider({ children }: IQueryProviderProps) {
    const [queryClientState] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
            }
        }
    }))
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <QueryClientProvider client={queryClientState}>
                <IntegrationsProvider>
                    {children}
                </IntegrationsProvider>
                <Toaster />
            </QueryClientProvider>
        </ThemeProvider>
    )
}