'use client'

interface TableProps {
  columns: string[]
  rows: any[][]
}

export default function Table({ columns, rows }: TableProps) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <span className="text-4xl mb-2 block">📊</span>
        <p>Nenhum resultado encontrado</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-indigo-50 transition-colors duration-150 ${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100"
                >
                  {typeof cell === 'number' ? (
                    <span className="font-mono text-indigo-600 font-medium">
                      {cell.toLocaleString('pt-BR')}
                    </span>
                  ) : (
                    <span>{String(cell)}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-500 text-center">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {rows.length} resultado{rows.length !== 1 ? 's' : ''} encontrado{rows.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}