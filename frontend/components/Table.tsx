'use client'

interface TableProps {
  columns: string[]
  rows: any[][]
}

export default function Table({ columns, rows }: TableProps) {
  if (rows.length === 0) {
    return (
      <div className="alert alert-info text-center my-2" role="alert">
        Nenhum resultado encontrado. Tente reformular sua pergunta.
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-sm align-middle mb-0">
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="align-middle">
                  {typeof cell === 'number'
                    ? cell.toLocaleString('pt-BR')
                    : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end text-muted small mt-1">
        {rows.length} resultado{rows.length !== 1 ? 's' : ''} encontrado{rows.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}