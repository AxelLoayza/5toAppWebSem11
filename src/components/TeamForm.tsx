"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useData } from "@/context/DataContext"
import { Spinner } from "@/components/ui/spinner"
import { Alert } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import type { TeamMember } from "@/context/DataContext"

export function TeamForm({ member, onSuccess }: { member?: TeamMember; onSuccess?: () => void }) {
  const [open, setOpen] = useState(false)
  const isEdit = !!member

  const [formData, setFormData] = useState<TeamMember>(() => ({
    userId: member?.userId || `u${Date.now()}`,
    role: member?.role || "",
    name: member?.name || "",
    email: member?.email || "",
    position: member?.position || "",
    birthdate: member?.birthdate || "",
    phone: member?.phone || "",
    projectId: member?.projectId || "",
    isActive: member?.isActive ?? true,
  }))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { addTeamMember, updateTeamMember, projects } = useData()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) {
      setError("El nombre es obligatorio")
      return
    }
    if (!formData.email.trim()) {
      setError("El email es obligatorio")
      return
    }
    if (!formData.role.trim()) {
      setError("El rol es obligatorio")
      return
    }

    setLoading(true)

    const action = isEdit ? updateTeamMember(formData) : addTeamMember(formData)

    action
      .then(() => {
        setOpen(false)
        onSuccess?.()
      })
      .finally(() => setLoading(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="sm" variant="outline">
            Editar
          </Button>
        ) : (
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Agregar Miembro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Editar Miembro" : "Agregar Nuevo Miembro"}</DialogTitle>
            <DialogDescription>
              Completa la información del miembro del equipo. Los campos con * son obligatorios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {error && <Alert type="error">{error}</Alert>}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Nombre completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="María García"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="maria@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">
                  Rol <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="role"
                  placeholder="Frontend Developer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="position">Posición</Label>
                <Input
                  id="position"
                  placeholder="Senior Developer"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="+51 999 999 999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                <Calendar
                  value={formData.birthdate}
                  onChange={(v) => setFormData({ ...formData, birthdate: v })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="projectId">Proyecto asignado</Label>
              <Select
                value={formData.projectId || "none"}
                onValueChange={(value) => setFormData({ ...formData, projectId: value === "none" ? "" : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar proyecto (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin proyecto</SelectItem>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-sm font-medium">
                  Estado activo
                </Label>
                <p className="text-xs text-muted-foreground">
                  El miembro está actualmente trabajando en el equipo
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Spinner className="h-4 w-4 mr-2" />}
              {isEdit ? "Actualizar" : "Agregar"} Miembro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
