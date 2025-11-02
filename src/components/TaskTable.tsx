"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { useData } from "@/context/DataContext"
import Pagination from "@/components/ui/pagination"


const statusVariant = (status: string) => {
  switch (status) {
    case "Completado":
      return "default"
    case "En progreso":
      return "secondary"
    case "Pendiente":
      return "outline"
    default:
      return "outline"
  }
}

const priorityVariant = (priority: string) => {
  switch (priority) {
    case "Urgente":
      return "destructive"
    case "Alta":
      return "default"
    case "Media":
      return "secondary"
    case "Baja":
      return "outline"
    default:
      return "outline"
  }
}

export function TasksTable() {
  const { tasks, deleteTask, projects, team } = useData()
  const [page, setPage] = useState(1)
  const perPage = 5

  const total = Math.max(1, Math.ceil(tasks.length / perPage))
  const start = (page - 1) * perPage
  const pageItems = tasks.slice(start, start + perPage)

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Lista de todas las tareas del proyecto</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>Tarea</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Fecha límite</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{task.description}</TableCell>
              <TableCell>{projects.find((p) => p.id === task.projectId)?.title ?? "-"}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(task.status ?? "")}>{task.status ?? "-"}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={priorityVariant(task.priority ?? "")}>{task.priority ?? "-"}</Badge>
              </TableCell>
              <TableCell>{team.find((m) => m.userId === task.userId)?.name ?? "-"}</TableCell>
              <TableCell>{task.dateline ?? "-"}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => {}}>
                  Editar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4">
        <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
      </div>
    </div>
  )
}
