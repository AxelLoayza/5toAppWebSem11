import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center gap-12 px-6 py-16">
        {/* Logo y Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-primary"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <h1 className="text-5xl font-bold text-slate-900">
              Gestor de Proyectos
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-slate-600">
            Sistema completo de gestión de proyectos con shadcn/ui. 
            Administra tus proyectos, tareas y equipo de manera eficiente.
          </p>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-3 bg-primary/10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900">Gestión de Equipo</h3>
            <p className="text-sm text-slate-600 text-center">
              Administra miembros del equipo con roles y asignaciones
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-3 bg-accent/10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-accent"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900">Proyectos</h3>
            <p className="text-sm text-slate-600 text-center">
              Crea y monitorea proyectos con progreso en tiempo real
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-3 bg-primary/10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900">Tareas</h3>
            <p className="text-sm text-slate-600 text-center">
              Organiza tareas con prioridades y fechas límite
            </p>
          </div>
        </div>

        {/* Botón principal */}
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          Ir al Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

        {/* Footer con tecnologías */}
        <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
          <span>Desarrollado con:</span>
          <div className="flex items-center gap-2">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js"
              width={60}
              height={12}
            />
          </div>
          <span>+</span>
          <span className="font-semibold">shadcn/ui</span>
        </div>
      </main>
    </div>
  );
}
