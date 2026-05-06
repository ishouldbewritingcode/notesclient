import { Pencil, Trash2 } from 'lucide-react'

interface NoteCardProps {
  id: string
  title: string
  text: string
  onEdit: () => void
  onDelete: () => void
}

export function NoteCard({ title, text, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={onEdit}
            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded"
            aria-label="Edit note"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded"
            aria-label="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="mt-2 text-slate-700">{text}</p>
    </div>
  )
}
