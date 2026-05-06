import { useState } from 'react'
import { graphqlRequest } from '#/lib/graphql'

interface LoginResponse {
  login: {
    token: string
    requiresName: boolean
    user: {
      id: string
      email: string
    } | null
  }
}

const LOGIN_MUTATION = `
  mutation Login($email: String!, $name: String) {
    login(email: $email, name: $name) {
      token
      requiresName
      user {
        id
        email
      }
    }
  }
`

interface LoginProps {
  onLogin: (userId: string) => void
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [step, setStep] = useState<'email' | 'name'>('email')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const variables: Record<string, unknown> = { email }
      if (step === 'name') variables.name = name

      const data = await graphqlRequest<LoginResponse>(LOGIN_MUTATION, variables)

      if (data.login.requiresName) {
        setStep('name')
        return
      }

      sessionStorage.setItem('authToken', data.login.token)
      sessionStorage.setItem('userId', data.login.user!.id)
      onLogin(data.login.user!.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
            {step === 'email' ? 'Sign in to your account' : 'Welcome! What should we call you?'}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={step === 'name'}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {step === 'name' && (
              <div>
                <label htmlFor="name" className="sr-only">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  autoFocus
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : step === 'name' ? 'Create account' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
