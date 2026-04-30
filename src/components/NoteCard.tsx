interface NoteCardProps {
  title: string
  text: string
}

export function NoteCard({ title, text }: NoteCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-700">{text}</p>
    </div>
  )
}
