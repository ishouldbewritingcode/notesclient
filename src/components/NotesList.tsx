import { useQuery } from '@tanstack/react-query'
import { graphqlRequest } from '#/lib/graphql'
import { NoteCard } from './NoteCard'

const NOTES_QUERY = `
  query Notes {
    notes {
      id
      title
      text
    }
  }
`

interface Note {
  id: string
  title: string
  text: string
}

export function NotesList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['GetAllNotes'],
    queryFn: async () => {
      const response = await graphqlRequest<{
        notes: Note[]
      }>(NOTES_QUERY)
      return response.notes
    },
  })

  if (isLoading) {
    return <div className="mt-6 text-sm text-slate-500">Loading notes...</div>
  }

  if (isError) {
    return (
      <div className="mt-6 text-sm text-red-600">
        Failed to load notes: {String(error)}
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="mt-6 text-slate-500">
        No notes yet. Create one in your GraphQL server.
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-4">
      {data.map((note) => (
        <NoteCard key={note.id} title={note.title} text={note.text} />
      ))}
    </div>
  )
}
