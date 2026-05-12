import { createFileRoute } from '@tanstack/react-router'
import { NotesList } from '#/components/NotesList'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const userId = sessionStorage.getItem('userId')!
  return <NotesList userId={userId} />
}
