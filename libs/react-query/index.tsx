'use client'
import {
  QueryClient,
  QueryClientProvider as QueryProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const QueryClientProvider = (props: any) => {
  return (
    <QueryProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  )
}
