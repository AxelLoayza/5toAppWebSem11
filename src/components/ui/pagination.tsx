"use client"

import React from "react"

export function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(total, page + 1))

  return (
    <div className="flex items-center justify-between mt-4">
      <button onClick={prev} className="px-3 py-1 border rounded disabled:opacity-50" disabled={page === 1}>
        Anterior
      </button>
      <div className="text-sm text-muted-foreground">Página {page} de {total}</div>
      <button onClick={next} className="px-3 py-1 border rounded disabled:opacity-50" disabled={page === total}>
        Siguiente
      </button>
    </div>
  )
}

export default Pagination
