'use client'

import { useState } from 'react'
import Chat from '../components/Chat'
import Table from '../components/Table'
import Chart from '../components/Chart'

interface QueryResult {
  sql: string
  columns: string[]
  rows: any[][]
  summary: string
}

export default function Home() {
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleQuery = async (question: string) => {
    setLoading(true)
    setResult(null) // Limpar resultados anteriores
    setError(null) // Limpar erros anteriores
    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Erro ${response.status}: ${response.statusText}`)
      }

      const data: QueryResult = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Erro:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      setError(errorMessage)
      // Mostrar erro de forma amigável nos resultados
      setResult({
        sql: '',
        columns: ['Erro'],
        rows: [[errorMessage]],
        summary: 'Ocorreu um erro ao processar sua consulta. Verifique se o backend está rodando e tente novamente.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3 animate-pulse">
              <span className="text-5xl animate-bounce">🤖</span>
              AI SQL Dashboard
            </h1>
            <p className="text-blue-100 text-lg">Pergunte em linguagem natural e obtenha insights dos seus dados</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Notification */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold">Erro na Consulta</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>
          </div>
        )}

        {/* Chat Component */}
        <div className="mb-8 animate-fade-in">
          <Chat onQuery={handleQuery} loading={loading} />
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-slide-up">
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl animate-pulse">📊</span>
                  Resumo da Consulta
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-lg leading-relaxed">{result.summary}</p>
              </div>
            </div>

            {/* SQL Query Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl animate-pulse">💻</span>
                  Consulta SQL Gerada
                </h2>
              </div>
              <div className="p-6">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700 shadow-inner">
                  {result.sql}
                </pre>
              </div>
            </div>

            {/* Table and Chart Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl animate-pulse">📋</span>
                    Resultados da Tabela
                  </h2>
                </div>
                <div className="p-6">
                  <Table columns={result.columns} rows={result.rows} />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl animate-pulse">📈</span>
                    Visualização Gráfica
                  </h2>
                </div>
                <div className="p-6">
                  <Chart columns={result.columns} rows={result.rows} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}