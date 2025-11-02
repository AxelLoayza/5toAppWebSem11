"use client"

import React from "react"

export function Calendar({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  return (
    <input
      type="date"
      className="border p-2 rounded-md"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  )
}

export default Calendar
