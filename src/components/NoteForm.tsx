import { useForm } from '@tanstack/react-form'

interface NoteFormData {
  title: string
  text: string
}

interface NoteFormProps {
  note?: { id: string; title: string; text: string }
  onSubmit: (data: NoteFormData) => Promise<void>
  onCancel: () => void
}

export function NoteForm({ note, onSubmit, onCancel }: NoteFormProps) {
  const form = useForm({
    defaultValues: {
      title: note?.title ?? '',
      text: note?.text ?? '',
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="rounded-lg border border-primary-200 bg-white p-4 shadow-sm space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-900">
        {note ? 'Edit note' : 'New note'}
      </h3>

      <form.Field
        name="title"
        validators={{ onChange: ({ value }) => (!value ? 'Title is required' : undefined) }}
      >
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              type="text"
              placeholder="Title"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-1 text-xs text-red-600">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="text"
        validators={{ onChange: ({ value }) => (!value ? 'Note text is required' : undefined) }}
      >
        {(field) => (
          <div>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              rows={4}
              placeholder="Write your note here..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-1 text-xs text-red-600">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : note ? 'Save changes' : 'Add note'}
            </button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
