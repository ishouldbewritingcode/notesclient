import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const Header: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="p-4">
      <div className="flex gap-4 items-end">
        <h1 className="text-xl min-[500px]:text-4xl font-bold m-0 mr-4">React TanStack Notes</h1>

        <nav className="hidden min-[500px]:flex ml-8 mr-auto gap-4 text-2xl items-end">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <Link to="/about" className="ml-4 text-blue-500 hover:underline">
            About
          </Link>
        </nav>

        <div className="hidden min-[500px]:flex items-center">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            Sign out
          </button>
        </div>

        <button
          className="ml-auto min-[500px]:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="min-[500px]:hidden flex flex-col gap-4 text-xl mt-4 pb-2">
          <Link to="/" className="text-blue-500 hover:underline" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="text-blue-500 hover:underline" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 w-fit"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
