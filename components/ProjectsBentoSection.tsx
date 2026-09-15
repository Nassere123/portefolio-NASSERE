"use client"

import React, { useState, useEffect } from "react"
import {
  ExternalLink,
  Github,
  Laptop,
  Smartphone,
  Server,
  Database,
  Globe,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  X,
  Code2,
  BookOpen,
} from "lucide-react"
import { INITIAL_PROJECTS, ProjectData } from "@/lib/projects-data"

export default function ProjectsBentoSection() {
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS)
  const [filter, setFilter] = useState<"all" | "web" | "mobile" | "backend">("all")
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  // Chargement des données à jour depuis l'API (avec fallback automatique)
  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects)
        }
      })
      .catch(() => {})
  }, [])

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.filterKeys.includes(filter))

  const filterCounts = {
    all: projects.length,
    web: projects.filter((p) => p.filterKeys.includes("web")).length,
    mobile: projects.filter((p) => p.filterKeys.includes("mobile")).length,
    backend: projects.filter((p) => p.filterKeys.includes("backend")).length,
  }

  const getProjectIcon = (name?: string) => {
    switch (name) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />
      case "Server":
        return <Server className="w-5 h-5" />
      case "Globe":
        return <Globe className="w-5 h-5" />
      case "Database":
        return <Database className="w-5 h-5" />
      case "Laptop":
      default:
        return <Laptop className="w-5 h-5" />
    }
  }

  return (
    <section id="projects" className="py-24 scroll-mt-20 bg-[#fafafa] relative overflow-hidden text-slate-900">
      {/* Halos subtils d'ambiance */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Motif décoratif en micro-grille */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── En-tête éditorial ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-indigo-600 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-900">
              Portfolio & Réalisations
            </span>
            <span className="w-8 h-[2px] bg-indigo-600 rounded-full" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Conceptions &{" "}
            <span className="font-serif italic font-normal text-indigo-600">
              Innovations.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Une sélection de solutions web, mobiles et d'architectures logicielles développées avec rigueur, performance et sens du détail.
          </p>

          {/* Filtres doux par onglets */}
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs mt-8 gap-1">
            {[
              { id: "all", label: "Tous", count: filterCounts.all },
              { id: "web", label: "Web & SaaS", count: filterCounts.web },
              { id: "mobile", label: "Mobile", count: filterCounts.mobile },
              { id: "backend", label: "Backend & Systèmes", count: filterCounts.backend },
            ].map((tab) => {
              const active = filter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Grille de Réalisations Uniforme & Symétrique ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id || project.title}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden col-span-1"
              >
                {/* En-tête de la carte Bento */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* Badge catégorie & Numéro */}
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 flex items-center justify-center shrink-0">
                        {getProjectIcon(project.iconName)}
                      </span>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        {project.category} · {project.num}
                      </span>
                    </div>

                    {/* Statut de production rectangle */}
                    <div>
                      {project.isProduction ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          En production
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                          {project.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mockup visuel (Fenêtre navigateur ou Aperçu mobile) */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 overflow-hidden mb-6 relative shadow-inner group-hover:border-slate-300 transition-colors">
                    {/* Barre de navigation style navigateur */}
                    <div className="bg-slate-100/90 border-b border-slate-200/70 px-3.5 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 bg-white px-3 py-0.5 rounded-md border border-slate-200/60 max-w-[200px] truncate">
                        {project.link !== "#" ? project.link.replace("https://", "") : `${project.title.toLowerCase().replace(/\s+/g, "-")}.app`}
                      </div>
                      <div className="w-6" />
                    </div>

                    {/* Image ou Dégradé élégant */}
                    <div className="h-48 sm:h-52 relative overflow-hidden bg-slate-900/5">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${project.gradient} flex flex-col items-center justify-center p-6 text-white text-center select-none relative`}
                        >
                          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                            {getProjectIcon(project.iconName)}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                            {project.title}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Titre & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                    <span>{project.title}</span>
                    {project.link !== "#" && (
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    )}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Pied de carte : Technologies & Liens */}
                <div>
                  {/* Tags Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50/70 text-slate-600 hover:text-indigo-700 text-xs font-semibold border border-slate-200/70 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-slate-50 text-slate-400 text-xs font-semibold">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Boutons d'action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Détails & Impact</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Code source GitHub"
                          className="w-9 h-9 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center shadow-xs"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.link !== "#" ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          <span>Visiter</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-xs font-medium cursor-pointer"
                        >
                          <span>Aperçu</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>

      {/* ── Modal Détails & Impact du Projet ── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6">
            {/* Bouton fermeture */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* En-tête Modal */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                {selectedProject.isProduction && (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    En production
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {selectedProject.title}
              </h3>
            </div>

            {/* Description détaillée */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                À propos de la réalisation
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Apprentissages clés & Défis */}
            {selectedProject.learnings && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80">
                <div className="flex items-center gap-2 mb-1.5 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Défis techniques & Apports clés</span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-950/80 leading-relaxed font-medium">
                  {selectedProject.learnings}
                </p>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Stack & Technologies employées
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions du Modal */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Voir le Code</span>
                </a>
              )}

              {selectedProject.link !== "#" ? (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Consulter en ligne</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
