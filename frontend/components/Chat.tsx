'use client'

import { useState } from 'react'

interface ChatProps {
  onQuery: (question: string) => void
  loading: boolean
}

export default function Chat({ onQuery, loading }: ChatProps) {
  const [question, setQuestion] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      onQuery(question)
      setQuestion('')
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Faça uma pergunta sobre os dados de vendas</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: Qual produto vendeu mais?"
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Consultando...' : 'Perguntar'}
        </button>
      </form>
    </div>
  )
}