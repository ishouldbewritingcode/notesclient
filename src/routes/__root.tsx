import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useState } from 'react'
import Header from '#/components/Header'
import { Login } from '#/components/Login'

import '../styles.css'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [userId, setUserId] = useState<string | null>(() =>
    sessionStorage.getItem('userId'),
  )

  const handleLogout = () => {
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userId')
    setUserId(null)
  }

  if (!userId) {
    return <Login onLogin={(id) => setUserId(id)} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8">
        <Header handleLogout={handleLogout} />
        <Outlet />
      </div>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </QueryClientProvider>
  )
}
