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
  if (rows.length === 0) return null

  // Detectar tipo de gráfico
  const hasDate = columns.some(col => col.toLowerCase().includes('data'))
  const hasCategory = columns.some(col => col.toLowerCase().includes('produto') || col.toLowerCase().includes('categoria'))
  const hasValue = columns.some(col => col.toLowerCase().includes('total') || col.toLowerCase().includes('valor'))

  let chartType: 'bar' | 'line' | 'pie' = 'bar'
  let labels: string[] = []
  let data: number[] = []

  if (hasDate && hasValue) {
    // Gráfico de linha para datas
    chartType = 'line'
    const dateIndex = columns.findIndex(col => col.toLowerCase().includes('data'))
    const valueIndex = columns.findIndex(col => col.toLowerCase().includes('total') || col.toLowerCase().includes('valor'))
    if (dateIndex !== -1 && valueIndex !== -1) {
      labels = rows.map(row => row[dateIndex])
      data = rows.map(row => parseFloat(row[valueIndex]) || 0)
    }
  } else if (hasCategory && hasValue) {
    // Gráfico de barras para categorias
    chartType = 'bar'
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
    labels = rows.map((_, index) => `Item ${index + 1}`)
    data = rows.map(row => parseFloat(row[1]) || 0) // Assumir segunda coluna como valor
  } else {
    // Fallback para barras
    labels = rows.map((_, index) => `Item ${index + 1}`)
    data = rows.map(row => parseFloat(row[1]) || 0)
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Dados',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Visualização dos Dados',
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Gráfico</h2>
      {chartType === 'bar' && <Bar data={chartData} options={options} />}
      {chartType === 'line' && <Line data={chartData} options={options} />}
      {chartType === 'pie' && <Pie data={chartData} options={options} />}
    </div>
  )
}