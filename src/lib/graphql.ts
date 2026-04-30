export const GRAPHQL_URL = 'http://localhost:5300/graphql'

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
