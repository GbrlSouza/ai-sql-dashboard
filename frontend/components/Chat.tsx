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
    "Qual é a média de valor por produto?"
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="text-2xl">💬</span>
          Faça uma pergunta sobre os dados de vendas
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Digite sua pergunta em linguagem natural..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                disabled={loading}
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <span className="text-xl">🔍</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Consultando...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🚀</span>
                  <span>Perguntar</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Example Questions */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3 font-medium">Perguntas de exemplo:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exampleQuestions.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuestion(example)}
                className="text-left px-3 py-2 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 rounded-lg transition-colors duration-200 text-sm border border-gray-200 hover:border-indigo-200"
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}