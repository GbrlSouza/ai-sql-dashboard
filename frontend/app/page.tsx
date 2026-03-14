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

  const handleQuery = async (question: string) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })
      if (!response.ok) {
        throw new Error('Erro na consulta')
      }
      const data: QueryResult = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao processar a consulta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">AI SQL Dashboard</h1>
        <Chat onQuery={handleQuery} loading={loading} />
        {result && (
          <div className="mt-8 space-y-8">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Resumo</h2>
              <p>{result.summary}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">SQL Gerado</h3>
              <pre className="bg-gray-100 p-2 rounded">{result.sql}</pre>
            </div>
            <Table columns={result.columns} rows={result.rows} />
            <Chart columns={result.columns} rows={result.rows} />
          </div>
        )}
      </div>
    </div>
  )
}