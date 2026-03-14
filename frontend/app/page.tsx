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
    <div className="container-fluid p-0">
      {/* Header ERP padrão */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-3">
        <div className="container-fluid px-3">
          <span className="navbar-brand fw-bold">AI SQL Dashboard</span>
        </div>
      </nav>

      <div className="container">
        {/* Error Notification */}
        {error && (
          <div className="row mb-3">
            <div className="col">
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Erro:</strong> {error}
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setError(null)}></button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Component */}
        <div className="row mb-3">
          <div className="col">
            <Chat onQuery={handleQuery} loading={loading} />
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="row">
            <div className="col-12 col-lg-4 mb-3 gap-3 d-flex flex-column">
              <div className="card h-25">
                <div className="card-header">Resumo</div>
                <div className="card-body">
                  <p className="card-text small">{result.summary}</p>
                </div>
              </div>
              <div className="card h-25">
                <div className="card-header">Consulta SQL</div>
                <div className="card-body">
                  <pre className="bg-light p-2 border rounded"><code>{result.sql}</code></pre>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 mb-3">
              <div className="card h-100 d-flex flex-column">
                <div className="card-header">Resultados</div>
                <div className="card-body p-2">
                  <Table columns={result.columns} rows={result.rows} />
                  <div className="mt-3">
                    <Chart columns={result.columns} rows={result.rows} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}