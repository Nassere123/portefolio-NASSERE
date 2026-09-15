"use client"

import React, { useState, useEffect } from "react"
import { X, Check, Laptop, Smartphone, Server, Globe, Database, Sparkles } from "lucide-react"
import { ProjectData } from "@/lib/projects-data"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Partial<ProjectData>) => Promise<void>
  projectToEdit?: ProjectData | null
}

const GRADIENT_PRESETS = [
  { label: "Indigo / Violet", value: "from-indigo-500 to-violet-600" },
  { label: "Bleu / Ciel", value: "from-sky-500 to-blue-600" },
  { label: "Rose / Rouge", value: "from-rose-500 to-red-600" },
  { label: "Violet / Pourpre", value: "from-violet-500 to-purple-600" },
  { label: "Émeraude / Teal", value: "from-emerald-500 to-teal-600" },
  { label: "Orange / Ambre", value: "from-orange-500 to-amber-600" },
]

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  projectToEdit,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<{
    title: string
    category: string
    filterKeys: ("web" | "mobile" | "backend")[]
    status: string
    isProduction: boolean
    description: string
    learnings: string
    technologies: string
    link: string
    github: string
    image: string
    iconName: ProjectData["iconName"]
    gradient: string
  }>({
    title: "",
    category: "Web",
    filterKeys: ["web"],
    status: "En Développement",
    isProduction: false,
    description: "",
    learnings: "",
    technologies: "",
    link: "",
    github: "",
    image: "",
    iconName: "Laptop",
    gradient: "from-indigo-500 to-violet-600",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title || "",
        category: projectToEdit.category || "Web",
        filterKeys: (projectToEdit.filterKeys || ["web"]) as ("web" | "mobile" | "backend")[],
        status: projectToEdit.status || "En Production",
        isProduction: Boolean(projectToEdit.isProduction),
        description: projectToEdit.description || "",
        learnings: projectToEdit.learnings || "",
        technologies: Array.isArray(projectToEdit.technologies)
          ? projectToEdit.technologies.join(", ")
          : "",
        link: projectToEdit.link || "",
        github: projectToEdit.github || "",
        image: projectToEdit.image || "",
        iconName: projectToEdit.iconName || "Laptop",
        gradient: projectToEdit.gradient || "from-indigo-500 to-violet-600",
      })
    } else {
      setFormData({
        title: "",
        category: "Web",
        filterKeys: ["web"],
        status: "En Production",
        isProduction: true,
        description: "",
        learnings: "",
        technologies: "React.js, TailwindCSS, TypeScript",
        link: "",
        github: "https://github.com/Nassere123",
        image: "",
        iconName: "Laptop",
        gradient: "from-indigo-500 to-violet-600",
      })
    }
    setError(null)
  }, [projectToEdit, isOpen])

  if (!isOpen) return null

  const handleFilterToggle = (key: "web" | "mobile" | "backend") => {
    setFormData((prev) => {
      const exists = prev.filterKeys.includes(key)
      let nextKeys: ("web" | "mobile" | "backend")[]
      if (exists) {
        nextKeys = prev.filterKeys.filter((k) => k !== key)
        if (nextKeys.length === 0) nextKeys = [key] // au moins une
      } else {
        nextKeys = [...prev.filterKeys, key]
      }
      return { ...prev, filterKeys: nextKeys }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setError("Le titre du projet est requis.")
      return
    }

    setSaving(true)
    setError(null)

    try {
      await onSave({
        ...formData,
        link: formData.link.trim() || "#",
        github: formData.github.trim() || null,
        image: formData.image.trim() || null,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean) as any,
      })
      onClose()
    } catch (err: any) {
      setError(err?.message || "Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              NY
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {projectToEdit ? "Modifier la réalisation" : "Ajouter une nouvelle réalisation"}
              </h2>
              <p className="text-xs text-slate-500">
                Configurez les métadonnées et le contenu du projet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Titre & Catégorie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Titre du projet <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Hub Conseil & Formations"
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Catégorie affichée
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Ex: Web, Mobile, Backend"
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Filtres & Statut */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Filtres de tri (Onglets du portfolio)
              </label>
              <div className="flex gap-2">
                {[
                  { key: "web", label: "Web" },
                  { key: "mobile", label: "Mobile" },
                  { key: "backend", label: "Backend" },
                ].map((f) => {
                  const active = formData.filterKeys.includes(f.key as any)
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => handleFilterToggle(f.key as any)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        active
                          ? "bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Statut du projet
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  placeholder="Ex: En Production, Projet Académique"
                  className="flex-1 px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-medium cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={formData.isProduction}
                    onChange={(e) => setFormData({ ...formData, isProduction: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>En Prod (Vert)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Description courte
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Présentation concise de l'objectif et de la solution développée..."
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Apprentissages & Défis */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Apprentissages & Défis relevés
            </label>
            <textarea
              rows={2}
              value={formData.learnings}
              onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
              placeholder="Ex: Intégration de paiements, architecture REST, gestion de production..."
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Technologies (séparées par des virgules)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="Ex: React.js, TailwindCSS, Laravel, PostgreSQL"
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Liens : Live & GitHub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Lien du site en ligne (URL)
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Dépôt GitHub (URL ou vide)
              </label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/Nassere123/..."
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Image & Style visuel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Chemin ou URL de l'image (facultatif)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/nom.png ou https://..."
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Dégradé de fond si pas d'image
              </label>
              <select
                value={formData.gradient}
                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                {GRADIENT_PRESETS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-md shadow-sm transition-all flex items-center gap-1.5"
            >
              {saving ? (
                <span>Enregistrement...</span>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{projectToEdit ? "Mettre à jour" : "Créer le projet"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
