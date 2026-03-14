'use client'

import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { FontSpec } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface ChartProps {
  columns: string[]
  rows: any[][]
}

export default function Chart({ columns, rows }: ChartProps) {
  if (rows.length === 0) {
    return (
      <div className="alert alert-info text-center my-2" role="alert">
        Nenhum dado para visualizar. Faça uma consulta para gerar gráficos.
      </div>
    )
  }

  // Detectar tipo de gráfico
  const hasDate = columns.some(col => col.toLowerCase().includes('data'))
  const hasCategory = columns.some(col => col.toLowerCase().includes('produto') || col.toLowerCase().includes('categoria'))
  const hasValue = columns.some(col => col.toLowerCase().includes('total') || col.toLowerCase().includes('valor'))

  let chartType: 'bar' | 'line' | 'pie' = 'bar'
  let labels: string[] = []
  let data: number[] = []
  let title = 'Visualização Inteligente dos Dados'

  if (hasDate && hasValue) {
    // Gráfico de linha para datas
    chartType = 'line'
    title = '📈 Evolução Temporal dos Valores'
    const dateIndex = columns.findIndex(col => col.toLowerCase().includes('data'))
    const valueIndex = columns.findIndex(col => col.toLowerCase().includes('total') || col.toLowerCase().includes('valor'))
    if (dateIndex !== -1 && valueIndex !== -1) {
      labels = rows.map(row => row[dateIndex])
      data = rows.map(row => parseFloat(row[valueIndex]) || 0)
    }
  } else if (hasCategory && hasValue) {
    // Gráfico de barras para categorias
    chartType = 'bar'
    title = '📊 Comparação por Categoria'
    const categoryIndex = columns.findIndex(col => col.toLowerCase().includes('produto'))
    const valueIndex = columns.findIndex(col => col.toLowerCase().includes('total') || col.toLowerCase().includes('valor'))
    if (categoryIndex !== -1 && valueIndex !== -1) {
      const aggregated: { [key: string]: number } = {}
      rows.forEach(row => {
        const cat = row[categoryIndex]
        const val = parseFloat(row[valueIndex]) || 0
        aggregated[cat] = (aggregated[cat] || 0) + val
      })
      labels = Object.keys(aggregated)
      data = Object.values(aggregated)
    }
  } else if (rows.length <= 10) {
    // Gráfico de pizza para poucos dados
    chartType = 'pie'
    title = '🥧 Distribuição dos Dados'
    labels = rows.map((_, index) => `Item ${index + 1}`)
    data = rows.map(row => parseFloat(row[1]) || 0) // Assumir segunda coluna como valor
  } else {
    // Fallback para barras
    labels = rows.map((_, index) => `Item ${index + 1}`)
    data = rows.map(row => parseFloat(row[1]) || 0)
  }

  // Cores Bootstrap
  const bootstrapColors = [
    '#0d6efd', // primary
    '#6c757d', // secondary
    '#198754', // success
    '#dc3545', // danger
    '#ffc107', // warning
    '#0dcaf0', // info
    '#212529', // dark
    '#f8f9fa', // light
  ]

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Valor',
        data,
        backgroundColor: chartType === 'pie' ? bootstrapColors.slice(0, data.length) : '#0d6efd',
        borderColor: chartType === 'pie' ? bootstrapColors.slice(0, data.length) : '#0d6efd',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
      },
      x: {},
    } : {},
  }

  return (
    <div>
      <div className="mb-2 fw-bold">{title}</div>
      <div style={{ minHeight: 250 }}>
        {chartType === 'bar' && <Bar data={chartData} options={options} />}
        {chartType === 'line' && <Line data={chartData} options={options} />}
        {chartType === 'pie' && <Pie data={chartData} options={options} />}
      </div>
    </div>
  )
}