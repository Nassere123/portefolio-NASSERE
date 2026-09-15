"use client"

import React, { useState } from "react"

interface JourneyRow {
  companyOrSchool: string
  roleOrDegree: string
  date: string
  current?: boolean
}

const EXPERIENCES: JourneyRow[] = [
  {
    companyOrSchool: "Odace Consulting",
    roleOrDegree: "Développeur Full-Stack",
    date: "Mai 2026 – Aujourd'hui",
    current: true,
  },
  {
    companyOrSchool: "Neopy Academy",
    roleOrDegree: "Formateur & Lead Dev",
    date: "Depuis 2025",
  },
  {
    companyOrSchool: "LONIYA TECH",
    roleOrDegree: "Stagiaire Dev Fullstack",
    date: "Sept. 2025 – Fév. 2026",
  },
  {
    companyOrSchool: "Genius Academy",
    roleOrDegree: "Membre Actif & Ateliers Tech",
    date: "2022 – 2023",
  },
]

const FORMATIONS: JourneyRow[] = [
  {
    companyOrSchool: "HackerRank Academy",
    roleOrDegree: "Certificat HackerRank — Angular",
    date: "2026",
  },
  {
    companyOrSchool: "Université de Technologie d'Abidjan",
    roleOrDegree: "Licence en Informatique (Génie Logiciel)",
    date: "2022 – 2025",
  },
  {
    companyOrSchool: "Orange Digital Center",
    roleOrDegree: "Certificat Arduino & Objets Connectés",
    date: "2025",
  },
  {
    companyOrSchool: "Lycée Moderne Charles Bauza Donwahi",
    roleOrDegree: "Baccalauréat Série D (Sciences)",
    date: "2022",
  },
]

export default function JourneySection() {
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "formation">("all")

  return (
    <section id="education" className="py-24 scroll-mt-20 bg-[#fbfbfb] relative overflow-hidden text-slate-900">
      {/* Halos très discrets en arrière-plan */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── En-tête de section éditoriale ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-indigo-600 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-900">
              Mon Parcours
            </span>
            <span className="w-8 h-[2px] bg-indigo-600 rounded-full" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Expériences &{" "}
            <span className="font-serif italic font-normal text-indigo-600">
              Formations.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Un aperçu chronologique de mes étapes académiques, mes certifications techniques et mon évolution professionnelle sur le terrain.
          </p>

          {/* Sélecteur d'affichage */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs mt-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "experience"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              /EXPÉRIENCE
            </button>
            <button
              onClick={() => setActiveTab("formation")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "formation"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              /FORMATION
            </button>
          </div>
        </div>

        {/* ── Cartes Minimalistes Noires Style Signature ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ══════════════ CARTE 1 : /EXPÉRIENCE ══════════════ */}
          {(activeTab === "all" || activeTab === "experience") && (
            <div
              className={`bg-[#18181b] border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 ${
                activeTab === "experience" ? "lg:col-span-2 max-w-4xl mx-auto w-full" : ""
              }`}
            >
              {/* Filigrane discret en arrière-plan */}
              <div className="absolute -right-4 top-2 text-7xl sm:text-8xl md:text-9xl font-black text-white/[0.03] select-none pointer-events-none tracking-tighter uppercase font-mono">
                RIENCE
              </div>

              {/* En-tête de la carte */}
              <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800/80 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-1 font-sans">
                  <span className="text-indigo-400">/</span>EXPÉRIENCE
                </h3>
                <span className="text-xs sm:text-sm font-medium text-zinc-400 tracking-wide">
                  3+ ans d'expérience
                </span>
              </div>

              {/* Liste minimaliste avec séparateurs fins */}
              <div className="divide-y divide-zinc-800/70 relative z-10">
                {EXPERIENCES.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group hover:bg-white/[0.02] px-2 -mx-2 rounded-xl transition-colors duration-200"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                          {item.companyOrSchool}
                        </h4>
                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            En poste
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-0.5">
                        {item.roleOrDegree}
                      </p>
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-zinc-400 sm:text-right whitespace-nowrap shrink-0">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════ CARTE 2 : /FORMATION ══════════════ */}
          {(activeTab === "all" || activeTab === "formation") && (
            <div
              className={`bg-[#18181b] border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 ${
                activeTab === "formation" ? "lg:col-span-2 max-w-4xl mx-auto w-full" : ""
              }`}
            >
              {/* Filigrane discret en arrière-plan */}
              <div className="absolute -right-4 top-2 text-7xl sm:text-8xl md:text-9xl font-black text-white/[0.03] select-none pointer-events-none tracking-tighter uppercase font-mono">
                MATION
              </div>

              {/* En-tête de la carte */}
              <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800/80 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-1 font-sans">
                  <span className="text-violet-400">/</span>FORMATION
                </h3>
                <span className="text-xs sm:text-sm font-medium text-zinc-400 tracking-wide">
                  Cursus & Certificats
                </span>
              </div>

              {/* Liste minimaliste avec séparateurs fins */}
              <div className="divide-y divide-zinc-800/70 relative z-10">
                {FORMATIONS.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group hover:bg-white/[0.02] px-2 -mx-2 rounded-xl transition-colors duration-200"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors">
                        {item.companyOrSchool}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-0.5">
                        {item.roleOrDegree}
                      </p>
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-zinc-400 sm:text-right whitespace-nowrap shrink-0">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
