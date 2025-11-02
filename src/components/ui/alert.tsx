"use client"

import { ReactNode } from "react"

export function Alert({ children, type = "info" }: { children: ReactNode; type?: "info" | "error" | "success" | "warning" }) {
  const base = "p-3 rounded-md border flex items-start gap-3"
  const cls =
    type === "error"
      ? `${base} bg-destructive/10 border-destructive text-destructive`
      : type === "success"
      ? `${base} bg-green-50 border-green-200 text-green-700`
      : `${base} bg-muted/10 border-muted text-muted-foreground`

  return <div className={cls}>{children}</div>
}

export default Alert
