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
  if (rows.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <span className="text-5xl mb-4 block">📈</span>
        <p className="text-lg">Nenhum dado para visualizar</p>
        <p className="text-sm">Faça uma consulta para gerar gráficos</p>
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
  let title = 'Visualização dos Dados'

  if (hasDate && hasValue) {
    // Gráfico de linha para datas
    chartType = 'line'
    title = 'Evolução Temporal dos Valores'
    const dateIndex = columns.findIndex(col => col.toLowerCase().includes('data'))
    const valueIndex = columns.findIndex(col => col.toLowerCase().includes('total') || col.toLowerCase().includes('valor'))
    if (dateIndex !== -1 && valueIndex !== -1) {
      labels = rows.map(row => row[dateIndex])
      data = rows.map(row => parseFloat(row[valueIndex]) || 0)
    }
  } else if (hasCategory && hasValue) {
    // Gráfico de barras para categorias
    chartType = 'bar'
    title = 'Comparação por Categoria'
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
    title = 'Distribuição dos Dados'
    labels = rows.map((_, index) => `Item ${index + 1}`)
    data = rows.map(row => parseFloat(row[1]) || 0) // Assumir segunda coluna como valor
  } else {
    // Fallback para barras
    labels = rows.map((_, index) => `Item ${index + 1}`)
    data = rows.map(row => parseFloat(row[1]) || 0)
  }

  const colors = [
    'rgba(99, 102, 241, 0.8)',   // Indigo
    'rgba(168, 85, 247, 0.8)',   // Purple
    'rgba(236, 72, 153, 0.8)',   // Pink
    'rgba(34, 197, 94, 0.8)',    // Green
    'rgba(251, 146, 60, 0.8)',   // Orange
    'rgba(239, 68, 68, 0.8)',    // Red
    'rgba(59, 130, 246, 0.8)',   // Blue
    'rgba(16, 185, 129, 0.8)',   // Emerald
  ]

  const borderColors = [
    'rgb(99, 102, 241)',
    'rgb(168, 85, 247)',
    'rgb(236, 72, 153)',
    'rgb(34, 197, 94)',
    'rgb(251, 146, 60)',
    'rgb(239, 68, 68)',
    'rgb(59, 130, 246)',
    'rgb(16, 185, 129)',
  ]

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Valor',
        data,
        backgroundColor: chartType === 'pie' ? colors.slice(0, data.length) : colors[0],
        borderColor: chartType === 'pie' ? borderColors.slice(0, data.length) : borderColors[0],
        borderWidth: 2,
        borderRadius: chartType === 'bar' ? 4 : 0,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              notation: 'compact'
            }).format(value);
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        }
      }
    } : {},
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  }

  const chartHeight = chartType === 'pie' ? '400px' : '350px'

  return (
    <div className="w-full">
      <div style={{ height: chartHeight }} className="relative">
        {chartType === 'bar' && <Bar data={chartData} options={options} />}
        {chartType === 'line' && <Line data={chartData} options={options} />}
        {chartType === 'pie' && <Pie data={chartData} options={options} />}
      </div>
    </div>
  )
}