import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">About This App</h1>
      <p className="mt-4 text-lg">This is a simple about page for the app.</p>
    </div>
  )
}
