export const GRAPHQL_URL = 'http://localhost:5300/graphql'

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
) {
  const token = sessionStorage.getItem('authToken')
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })

  const json = (await response.json()) as {
    data?: T
    errors?: Array<{ message: string }>
  }

  if (!response.ok || json.errors?.length) {
    throw new Error(json.errors?.[0]?.message ?? 'GraphQL request failed')
  }

  return json.data as T
}
