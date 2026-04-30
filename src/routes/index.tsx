import { createFileRoute } from '@tanstack/react-router'
import { NotesList } from '#/components/NotesList'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">The Notes App</h1>
      <p className="mt-4 text-lg">
        This is a simple notes app built with React and TanStack Router. You can
        create, edit, and delete notes.
      </p>
      <NotesList />
    </div>
  )
}
