import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { graphqlRequest } from '#/lib/graphql'

export const Route = createFileRoute('/')({ component: Home })

const NOTES_QUERY = `
  query Notes {
    notes {
      id
      title
      text
    }
  }
`

function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['GetAllNotes'],
    queryFn: async () => {
      const response = await graphqlRequest<{
        notes: Array<{
          id: string
          title: string
          text: string
        }>
      }>(NOTES_QUERY)
      return response.notes
    },
  })

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">The Notes App</h1>
      <p className="mt-4 text-lg">
        This is a simple notes app built with React and TanStack Router. You can
        create, edit, and delete notes.
      </p>

      {isLoading ? (
        <div className="mt-6 text-sm text-slate-500">Loading notes...</div>
      ) : isError ? (
        <div className="mt-6 text-sm text-red-600">
          Failed to load notes: {String(error)}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {data?.length ? (
            data.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm"
              >
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="mt-2 text-slate-700">{note.text}</p>
              </div>
            ))
          ) : (
            <div className="text-slate-500">
              No notes yet. Create one in your GraphQL server.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
