"use client"

import React, { createContext, useContext, useState } from "react"

export type Project = {
  id: string
  title: string
  description?: string
  status?: string
  progress?: number
  team?: number
  members?: string[]
}

export type TeamMember = {
  userId: string
  role: string
  name: string
  email: string
  position?: string
  birthdate?: string
  phone?: string
  projectId?: string
  isActive?: boolean
}

export type Task = {
  id: string
  description: string
  projectId?: string
  status?: string
  priority?: string
  userId?: string
  dateline?: string
}

type DataContextType = {
  projects: Project[]
  addProject: (p: Omit<Project, "id">) => Promise<Project>
  deleteProject: (id: string) => Promise<void>
  team: TeamMember[]
  addTeamMember: (m: TeamMember) => Promise<void>
  updateTeamMember: (m: TeamMember) => Promise<void>
  deleteTeamMember: (id: string) => Promise<void>
  tasks: Task[]
  addTask: (t: Omit<Task, "id">) => Promise<Task>
  deleteTask: (id: string) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const initialProjects: Project[] = [
  {
    id: "p1",
    title: "E-commerce Platform",
    description: "Plataforma de comercio electrónico con Next.js",
    status: "En progreso",
    progress: 65,
    team: 5,
    members: ["m1", "m2"],
  },
  {
    id: "p2",
    title: "Mobile App",
    description: "Aplicación móvil con React Native",
    status: "En revisión",
    progress: 90,
    team: 3,
    members: ["m3"],
  },
]

const initialTeam: TeamMember[] = [
  { userId: "m1", role: "Frontend", name: "María García", email: "maria@example.com", position: "Dev", birthdate: "1990-05-10", phone: "123456789", projectId: "p1", isActive: true },
  { userId: "m2", role: "Backend", name: "Juan Pérez", email: "juan@example.com", position: "DevOps", birthdate: "1988-11-02", phone: "987654321", projectId: "p1", isActive: true },
  { userId: "m3", role: "Designer", name: "Ana López", email: "ana@example.com", position: "UI/UX", birthdate: "1992-01-20", phone: "555555555", projectId: "p2", isActive: true },
]

const initialTasks: Task[] = [
  { id: "t1", description: "Implementar autenticación", projectId: "p1", status: "En progreso", priority: "Alta", userId: "m1", dateline: "2025-11-15" },
  { id: "t2", description: "Diseñar pantalla de perfil", projectId: "p2", status: "Pendiente", priority: "Media", userId: "m3", dateline: "2025-11-20" },
]

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [team, setTeam] = useState<TeamMember[]>(initialTeam)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const simulate = <T,>(fn: () => T, delay = 700) =>
    new Promise<T>((resolve) => setTimeout(() => resolve(fn()), delay))

  const addProject = (p: Omit<Project, "id">) =>
    simulate(() => {
      const newProject: Project = { ...p, id: `p${Date.now()}` }
      setProjects((s) => [newProject, ...s])
      return newProject
    })

  const deleteProject = (id: string) =>
    simulate(() => {
      setProjects((s) => s.filter((x) => x.id !== id))
      // also unlink tasks and team members
      setTasks((s) => s.filter((t) => t.projectId !== id))
      setTeam((s) => s.map((m) => (m.projectId === id ? { ...m, projectId: undefined } : m)))
    })

  const addTeamMember = (m: TeamMember) =>
    simulate(() => {
      setTeam((s) => [{ ...m }, ...s])
    })

  const updateTeamMember = (m: TeamMember) =>
    simulate(() => {
      setTeam((s) => s.map((x) => (x.userId === m.userId ? m : x)))
    })

  const deleteTeamMember = (id: string) =>
    simulate(() => {
      setTeam((s) => s.filter((x) => x.userId !== id))
      setTasks((s) => s.map((t) => (t.userId === id ? { ...t, userId: undefined } : t)))
    })

  const addTask = (t: Omit<Task, "id">) =>
    simulate(() => {
      const newTask: Task = { ...t, id: `t${Date.now()}` }
      setTasks((s) => [newTask, ...s])
      return newTask
    })

  const deleteTask = (id: string) =>
    simulate(() => {
      setTasks((s) => s.filter((x) => x.id !== id))
    })

  return (
    <DataContext.Provider value={{ projects, addProject, deleteProject, team, addTeamMember, updateTeamMember, deleteTeamMember, tasks, addTask, deleteTask }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useData must be used within DataProvider")
  return ctx
}

export default DataContext
