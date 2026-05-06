import { useForm } from 'react-hook-form'

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({
    defaultValues: note ? { title: note.title, text: note.text } : { title: '', text: '' },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-primary-200 bg-white p-4 shadow-sm space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-900">
        {note ? 'Edit note' : 'New note'}
      </h3>

      <div>
        <input
          {...register('title', { required: 'Title is required' })}
          type="text"
          placeholder="Title"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('text', { required: 'Note text is required' })}
          rows={4}
          placeholder="Write your note here..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
        {errors.text && (
          <p className="mt-1 text-xs text-red-600">{errors.text.message}</p>
        )}
      </div>

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
    </form>
  )
}
