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

  const exampleQuestions = [
    "Qual produto vendeu mais?",
    "Quanto foi vendido no total?",
    "Quais vendas foram parceladas?",
    "Qual é a média de valor por produto?",
    "Mostre as vendas dos últimos 30 dias"
  ]

  return (
    <div className="card">
      <div className="card-header">Consulta de Dados</div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-2 align-items-center mb-3">
          <div className="col">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Digite sua pergunta sobre os dados de vendas..."
              className="form-control"
              disabled={loading}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="btn btn-primary"
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <span>Consultar</span>
              )}
            </button>
          </div>
        </form>

        <div className="mb-2">
          <strong>Perguntas de exemplo:</strong>
          <ul className="list-group list-group-flush mt-1">
            {exampleQuestions.map((example, index) => (
              <li key={index} className="list-group-item p-2">
                <button
                  type="button"
                  className="btn btn-link p-0"
                  style={{ textDecoration: 'none' }}
                  onClick={() => setQuestion(example)}
                  disabled={loading}
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="alert alert-secondary mt-3 mb-0 p-2 small" role="alert">
          <strong>Dicas:</strong> Seja específico, use termos como "total", "média", "maior", "menor" e pergunte sobre tendências ou agrupamentos.
        </div>
      </div>
    </div>
  )
}