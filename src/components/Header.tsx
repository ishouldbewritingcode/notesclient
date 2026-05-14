import { Link } from '@tanstack/react-router'

const Header: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  return (
    <header className="flex p-4 gap-4 items-end">
      <h1 className="text-4xl font-bold m-0 mr-4">React TanStack Notes</h1>
      <nav className="ml-8 mr-auto justify-items-start flex gap-4 text-2xl items-end">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="/about" className="ml-4 text-blue-500 hover:underline">
          About
        </Link>
      </nav>
      <div className="flex items-center justify-between">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}

export default Header
