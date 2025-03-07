import { ErrorBoundary, render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import { Error } from './components/Error.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

const root = document.getElementById('root')

render(() => {
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
      });
      return (
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={(error, reset) => {
          return (
              <Error {...{error, reset}}/>
            )
          }}>
          <App />
        </ErrorBoundary>
      </QueryClientProvider>
      )}, root!)
