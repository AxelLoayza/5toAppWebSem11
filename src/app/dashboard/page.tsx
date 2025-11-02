"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ProjectForm } from "@/components/ProjectForm"
import { TasksTable } from "@/components/TaskTable"
import { TeamForm } from "@/components/TeamForm"
import { TaskForm } from "@/components/TaskForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"
import { Alert } from "@/components/ui/alert"
import { useData } from "@/context/DataContext"

export default function DashboardPage() {
  const { projects, tasks, team, deleteProject, deleteTeamMember } = useData()
  
  // Estado para el formulario de configuración
  const [settings, setSettings] = useState({
    appName: "Dashboard de Proyectos",
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: "es",
    timezone: "America/Lima",
  })
  const [savingSettings, setSavingSettings] = useState(false)
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null)

  const handleSaveSettings = () => {
    setSavingSettings(true)
    setSettingsMessage(null)
    // Simular guardado
    setTimeout(() => {
      setSavingSettings(false)
      setSettingsMessage("Configuración guardada exitosamente")
      setTimeout(() => setSettingsMessage(null), 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard de Proyectos</h1>
          <p className="text-slate-600">Gestiona tus proyectos y tareas con shadcn/ui</p>
          <div className="pt-4">
            <ProjectForm />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tareas Completadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.filter((t) => t.status === "Completado").length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horas Trabajadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.length * 4}h</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Miembros Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{team.filter((m) => m.isActive).length}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge variant={project.status === "Completado" ? "default" : project.status === "En revisión" ? "secondary" : "outline"}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{project.progress ?? 0}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${project.progress ?? 0}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">{project.team ?? project.members?.length ?? 0} miembros</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => alert(JSON.stringify(project, null, 2))}>
                            Ver detalles
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Tareas</CardTitle>
                    <CardDescription>Administra todas las tareas de tus proyectos</CardDescription>
                  </div>
                  <TaskForm />
                </div>
              </CardHeader>
              <CardContent>
                <TasksTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Miembros del Equipo</CardTitle>
                    <CardDescription>Gestiona los miembros de tu equipo y sus roles</CardDescription>
                  </div>
                  <TeamForm />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team.map((member) => (
                    <div key={member.userId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{member.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.isActive ? "default" : "secondary"}>{member.isActive ? "Activo" : "Inactivo"}</Badge>
                        <TeamForm member={member} />
                        <Button size="sm" variant="destructive" onClick={() => deleteTeamMember(member.userId)}>
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>Administra las preferencias de tu aplicación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {settingsMessage && (
                    <Alert type="success">{settingsMessage}</Alert>
                  )}

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="appName">Nombre de la aplicación</Label>
                      <Input
                        id="appName"
                        value={settings.appName}
                        onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="language">Idioma</Label>
                      <select
                        id="language"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                      </select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Zona horaria</Label>
                      <select
                        id="timezone"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      >
                        <option value="America/Lima">Lima (GMT-5)</option>
                        <option value="America/New_York">Nueva York (GMT-5)</option>
                        <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
                        <option value="Europe/Madrid">Madrid (GMT+1)</option>
                      </select>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-medium">Notificaciones</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailNotifications">Notificaciones por email</Label>
                          <p className="text-xs text-muted-foreground">Recibe actualizaciones por correo electrónico</p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pushNotifications">Notificaciones push</Label>
                          <p className="text-xs text-muted-foreground">Recibe notificaciones en el navegador</p>
                        </div>
                        <Switch
                          id="pushNotifications"
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="darkMode">Modo oscuro</Label>
                          <p className="text-xs text-muted-foreground">Cambiar al tema oscuro</p>
                        </div>
                        <Switch
                          id="darkMode"
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleSaveSettings} disabled={savingSettings}>
                        {savingSettings && <Spinner className="h-4 w-4 mr-2" />}
                        Guardar Configuración
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
