import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { graphqlRequest } from '#/lib/graphql'
import { NoteCard } from './NoteCard'
import { NoteForm } from './NoteForm'

const NOTES_BY_USER_QUERY = `
  query NotesByUser($userId: ID!) {
    notesByUser(userId: $userId) {
      id
      title
      text
    }
  }
`

const CREATE_NOTE_MUTATION = `
  mutation CreateNote($userId: ID!, $title: String!, $text: String!) {
    createNote(userId: $userId, title: $title, text: $text) {
      id
      title
      text
    }
  }
`

const UPDATE_NOTE_MUTATION = `
  mutation UpdateNote($id: ID!, $title: String!, $text: String!) {
    updateNote(id: $id, title: $title, text: $text) {
      id
      title
      text
    }
  }
`

const DELETE_NOTE_MUTATION = `
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`

interface Note {
  id: string
  title: string
  text: string
}

interface NotesListProps {
  userId: string
}

type FormMode = null | 'add' | Note

export function NotesList({ userId }: NotesListProps) {
  const queryClient = useQueryClient()
  const [formMode, setFormMode] = useState<FormMode>(null)

  const queryKey = ['notesByUser', userId]

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await graphqlRequest<{ notesByUser: Note[] }>(
        NOTES_BY_USER_QUERY,
        { userId },
      )
      return response.notesByUser
    },
  })

  const createNote = useMutation({
    mutationFn: (vars: { title: string; text: string }) =>
      graphqlRequest(CREATE_NOTE_MUTATION, { userId, ...vars }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      setFormMode(null)
    },
  })

  const updateNote = useMutation({
    mutationFn: (vars: { id: string; title: string; text: string }) =>
      graphqlRequest(UPDATE_NOTE_MUTATION, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      setFormMode(null)
    },
  })

  const deleteNote = useMutation({
    mutationFn: (id: string) => graphqlRequest(DELETE_NOTE_MUTATION, { id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
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

  return (
    <div className="mt-6 space-y-4">
      {formMode !== null && (
        <NoteForm
          note={formMode === 'add' ? undefined : formMode}
          onSubmit={async (data) => {
            if (formMode === 'add') {
              await createNote.mutateAsync(data)
            } else {
              await updateNote.mutateAsync({ id: (formMode as Note).id, ...data })
            }
          }}
          onCancel={() => setFormMode(null)}
        />
      )}

      {formMode === null && (
        <button
          onClick={() => setFormMode('add')}
          className="px-4 py-2 text-sm font-medium text-white bg-accent-600 rounded-md hover:bg-accent-700"
        >
          + Add note
        </button>
      )}

      {!data?.length && formMode === null && (
        <div className="text-slate-500">No notes yet. Add your first one!</div>
      )}

      {data?.map((note) =>
        formMode !== null && formMode !== 'add' && (formMode as Note).id === note.id ? null : (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            onEdit={() => setFormMode(note)}
            onDelete={() => deleteNote.mutate(note.id)}
          />
        ),
      )}
    </div>
  )
}
