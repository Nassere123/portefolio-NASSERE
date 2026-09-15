"use client"

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faLightbulb, faComments, faBolt } from "@fortawesome/free-solid-svg-icons"
import {
  Code2,
  Rocket,
  GraduationCap,
  Sparkles,
} from "lucide-react"

export default function AboutSection() {
  const softSkills = [
    {
      icon: <FontAwesomeIcon icon={faUsers} className="text-3xl text-indigo-500" />,
      title: "Travail en équipe",
      desc: "Collaborer efficacement, partager les responsabilités et avancer ensemble vers un objectif commun.",
    },
    {
      icon: <FontAwesomeIcon icon={faLightbulb} className="text-3xl text-amber-500" />,
      title: "Résolution créative",
      desc: "Analyser les situations complexes et proposer des solutions innovantes adaptées aux contraintes.",
    },
    {
      icon: <FontAwesomeIcon icon={faComments} className="text-3xl text-sky-500" />,
      title: "Communication",
      desc: "Exprimer clairement les idées, écouter activement et maintenir un dialogue constructif.",
    },
    {
      icon: <FontAwesomeIcon icon={faBolt} className="text-3xl text-emerald-500" />,
      title: "Adaptabilité",
      desc: "S'adapter aux nouvelles technologies et environnements de travail avec agilité et curiosité.",
    },
  ]

  const approachPillars = [
    {
      icon: <Code2 className="w-5 h-5 text-indigo-600" />,
      title: "Architecture & Code Propre",
      desc: "Structure modulaire, typage TypeScript strict et solutions maintenables dans le temps.",
    },
    {
      icon: <Rocket className="w-5 h-5 text-rose-500" />,
      title: "Pragmatisme de Production",
      desc: "Expérience concrète sur des applications réelles déployées et orientées utilisateurs.",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
      title: "Pédagogie & Transmission",
      desc: "Formateur et lead chez Neopy Academy : capacité à vulgariser et fédérer autour des choix techniques.",
    },
  ]

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#fafafa] relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* ── En-tête de section style Aquidev ── */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-indigo-600" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              PRÉSENTATION & PHILOSOPHIE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            À propos de moi
          </h2>
        </div>

        {/* ── Grille Bento asymétrique à 2 grandes cartes ── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ── Carte Gauche : Mon Approche & Vision (Col 7) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-[2rem] bg-white border border-slate-200/80 p-6 sm:p-9 lg:p-10 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10">
            <div>
              <span className="inline-block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-3">
                MON APPROCHE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight">
                Concevoir des solutions fiables qui répondent aux vrais besoins.
              </h3>

              <div className="h-px w-full bg-slate-100 my-6" />

              <p className="text-slate-600 leading-relaxed text-sm sm:text-[15px] font-normal">
                Mon rôle dépasse la simple écriture de lignes de code. En tant que développeur fullstack et formateur, je m&apos;attache à concevoir des architectures logicielles pérennes, robustes et intuitives. Du prototypage d&apos;interfaces jusqu&apos;au déploiement en production, chaque décision technique est guidée par l&apos;impact concret pour l&apos;utilisateur final et l&apos;évolutivité du produit.
              </p>
            </div>

            {/* 3 piliers d'ingénierie */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              {approachPillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Carte Droite : Soft Skills & Piliers (Col 5) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[2rem] bg-white border border-slate-200/80 p-6 sm:p-9 lg:p-10 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10">
            <div>
              <span className="inline-block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-3">
                VALEURS & MÉTHODOLOGIE
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Soft Skills & Forces
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6 leading-relaxed">
                Les qualités humaines et méthodologiques qui renforcent l&apos;efficacité technique sur chaque projet.
              </p>

              {/* Grille 2x2 des 4 Soft Skills */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                {softSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-3">
                        {skill.icon}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {skill.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {skill.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bandeau méthodologies en bas de la carte droite */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-2">
                Principes clés
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Agile / Scrum", "Clean Code", "Autonomie", "Transmission"].map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
