const API_BASE_URL = 'http://localhost:8000'

export const queryData = async (question: string) => {
  const response = await fetch(`${API_BASE_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })
  if (!response.ok) {
    throw new Error('Erro na consulta')
  }
  return response.json()
}