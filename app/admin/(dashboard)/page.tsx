"use client"

import React, { useState, useEffect } from "react"
import {
  FolderGit2,
  CheckCircle2,
  Code2,
  BotMessageSquare,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Laptop,
  Smartphone,
  Server,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Filter,
  ShieldCheck,
  RotateCcw,
} from "lucide-react"
import { INITIAL_PROJECTS, ProjectData } from "@/lib/projects-data"
import ProjectModal from "@/components/admin/ProjectModal"
import ActivityChart from "@/components/admin/ActivityChart"

export default function AdminDashboardPage() {
  // Mode 100% Front-End : Les projets sont gérés uniquement dans l'état React local
  // Vos projets réels déployés restent strictement protégés et intouchables
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState<ProjectData | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleSaveProject = async (projectData: Partial<ProjectData>) => {
    if (projectToEdit) {
      // Modification locale dans le state front
      setProjects((prev) =>
        prev.map((p) => (p.id === projectToEdit.id ? ({ ...p, ...projectData } as ProjectData) : p))
      )
      showToast("Simulation Front-End : Projet mis à jour (aucun impact en ligne)")
    } else {
      // Ajout local dans le state front
      const nextIndex = projects.length + 1
      const newProj: ProjectData = {
        id: "proj-" + Date.now(),
        num: nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`,
        category: projectData.category || "Web",
        filterKeys: projectData.filterKeys || ["web"],
        title: projectData.title || "Nouveau Projet",
        description: projectData.description || "",
        technologies: Array.isArray(projectData.technologies)
          ? projectData.technologies
          : (projectData.technologies || "").split(",").map((t: string) => t.trim()).filter(Boolean),
        learnings: projectData.learnings || "",
        gradient: projectData.gradient || "from-indigo-500 to-violet-600",
        image: projectData.image || null,
        iconName: projectData.iconName || "Laptop",
        link: projectData.link || "#",
        github: projectData.github || null,
        status: projectData.status || "En Développement",
        isProduction: Boolean(projectData.isProduction),
        createdAt: new Date().toISOString(),
      }
      setProjects((prev) => [newProj, ...prev])
      showToast("Simulation Front-End : Nouveau projet ajouté (aucun impact en ligne)")
    }
  }

  const handleDeleteProject = (id: string, title: string) => {
    if (
      !confirm(
        `[Mode Démo Front-End]\n\nVoulez-vous retirer visuellement le projet "${title}" de cette session d'administration ?\n\n(Rassurez-vous : vos projets réels déployés restent 100% intacts et protégés).`
      )
    ) {
      return
    }

    setProjects((prev) => prev.filter((p) => p.id !== id))
    showToast("Projet retiré de la vue locale (aucun impact sur votre site déployé)")
  }

  const handleResetProjects = () => {
    setProjects(INITIAL_PROJECTS)
    showToast("Liste réinitialisée avec vos 6 projets officiels par défaut.")
  }

  const handleOpenAdd = () => {
    setProjectToEdit(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (p: ProjectData) => {
    setProjectToEdit(p)
    setIsModalOpen(true)
  }

  // Filtrage
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory =
      filterCategory === "all" ||
      p.category.toLowerCase().includes(filterCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const prodCount = projects.filter((p) => p.isProduction).length

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-800 flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Top Welcome & Action Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Tableau de bord
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Admin Nassere
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gérez vos réalisations en ligne, vos compétences et surveillez les interactions visiteurs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={handleResetProjects}
            title="Réinitialiser la liste avec les 6 projets officiels"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md border border-slate-300 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Réinitialiser</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-md shadow-xs transition-all hover:shadow-indigo-200 hover:shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Projet</span>
          </button>
        </div>
      </div>

      {/* ── Bannière de Protection & Mode Front-End ── */}
      <div className="flex items-start sm:items-center gap-3 bg-emerald-50/90 border border-emerald-200 text-emerald-950 px-4 py-3 rounded-lg text-xs shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 leading-relaxed">
          <strong className="font-bold text-emerald-900">Mode Front-End Sécurisé :</strong> Vos projets réels en production sont 100% verrouillés et protégés. Toute action effectuée ici (ajout, modification, suppression) reste strictement confinée à cette session d'administration locale sans jamais impacter votre portfolio en ligne.
        </div>
      </div>

      {/* ── 4 Widgets Statistiques CoreUI ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Widget 1 : Total Projets */}
        <div className="bg-indigo-600 rounded-lg p-5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-black">{projects.length}</div>
              <div className="text-xs font-medium text-indigo-100 uppercase tracking-wider mt-0.5">
                Projets Totaux
              </div>
            </div>
            <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center text-white">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-indigo-100">
            <span>Web, Mobile & Backend</span>
            <span className="font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +100%
            </span>
          </div>
        </div>

        {/* Widget 2 : En Production */}
        <div className="bg-emerald-600 rounded-lg p-5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-black">{prodCount}</div>
              <div className="text-xs font-medium text-emerald-100 uppercase tracking-wider mt-0.5">
                En Production
              </div>
            </div>
            <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-100">
            <span>Cerise CM & Hub Conseil</span>
            <span className="font-bold">Actifs</span>
          </div>
        </div>

        {/* Widget 3 : Stack & Compétences */}
        <div className="bg-slate-800 rounded-lg p-5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-black">16</div>
              <div className="text-xs font-medium text-slate-300 uppercase tracking-wider mt-0.5">
                Technologies
              </div>
            </div>
            <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
            <span>Java, React, Next, PHP...</span>
            <span className="font-bold">Opérationnel</span>
          </div>
        </div>

        {/* Widget 4 : Assistant IA Chatbot */}
        <div className="bg-violet-600 rounded-lg p-5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-black">Gemma 4</div>
              <div className="text-xs font-medium text-violet-100 uppercase tracking-wider mt-0.5">
                Assistant IA
              </div>
            </div>
            <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center text-white">
              <BotMessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-violet-100">
            <span>Google 31B It • Connecté</span>
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Actif
            </span>
          </div>
        </div>
      </div>

      {/* ── Graphique d'activité CoreUI ── */}
      <ActivityChart />

      {/* ── Section Gestion des Réalisations (Tableau CoreUI) ── */}
      <div id="projects-section" className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Gestion des Réalisations ({filteredProjects.length})
            </h2>
            <p className="text-xs text-slate-500">
              Modifiez, ajoutez ou retirez des projets visibles sur votre portfolio public
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 bg-white w-44 sm:w-56"
              />
            </div>

            {/* Category filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 bg-white text-slate-600 font-medium"
            >
              <option value="all">Toutes catégories</option>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="backend">Backend & Système</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Projet</th>
                <th className="py-3.5 px-4">Catégorie</th>
                <th className="py-3.5 px-4">Technologies</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <span>Chargement des projets...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Aucun projet ne correspond à votre recherche.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {p.num}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {p.image ? (
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white text-xs`}>
                              {p.category.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors">
                            {p.title}
                          </p>
                          <p className="text-slate-500 text-[11px] line-clamp-1 max-w-xs sm:max-w-md">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-600 border border-indigo-100"
                          >
                            {t}
                          </span>
                        ))}
                        {p.technologies.length > 3 && (
                          <span className="px-1 py-0.5 rounded text-[10px] text-slate-400 font-medium">
                            +{p.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                          p.isProduction
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.isProduction ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        <span>{p.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {p.link && p.link !== "#" && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Voir en ligne"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id, p.title)}
                          className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Affichage de {filteredProjects.length} sur {projects.length} projet(s)</span>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Vos projets réels en ligne restent 100% protégés (Mode Front-End isolé)
          </span>
        </div>
      </div>

      {/* Modal Ajout / Modification */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />
    </div>
  )
}
