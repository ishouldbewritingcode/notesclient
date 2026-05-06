import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { NotesList } from '#/components/NotesList'
import { Login } from '#/components/Login'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [userId, setUserId] = useState<string | null>(() => sessionStorage.getItem('userId'))

  const handleLogout = () => {
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userId')
    setUserId(null)
  }

  if (!userId) {
    return <Login onLogin={(id) => setUserId(id)} />
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">The Notes App</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
        >
          Sign out
        </button>
      </div>
      <NotesList userId={userId} />
    </div>
  )
}
