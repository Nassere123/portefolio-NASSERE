"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowUpRight,
  Github,
  Mail,
  MessageCircle,
  Code2,
  Sparkles,
} from "lucide-react"

// Hook typewriter loop — écrit, efface, recommence
function useTypewriterLoop(words: string[], typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, typeSpeed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => {
        setDeleting(true)
      }, pauseMs)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, deleteSpeed)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((w) => (w + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseMs])

  return displayed
}

interface HeroProps {
  onScrollTo: (id: string) => void
}

export default function HeroSection({ onScrollTo }: HeroProps) {
  const typed = useTypewriterLoop([
    "Développeur Web & Mobile",
    "Développeur Fullstack",
    "Formateur & Lead Dev",
    "Créateur de solutions",
  ], 80, 40, 2000)
  const marqueeTech = [
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
    { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "React Native", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
    { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
    { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
    { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/E76F00" },
  ]

  return (
    <section id="home" className="relative px-3 pt-3 md:px-6 md:pt-6 bg-[#eaeaea] overflow-hidden">
      {/* Halo d'ambiance supérieur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#f3f4f6,#d1d5db)]"
      />

      {/* ── Cadre Principal Blanc Inspiré de CodeurAuChapeau ── */}
      <div className="relative mx-auto flex min-h-[calc(100svh-24px)] md:min-h-[calc(100svh-48px)] max-w-[1440px] flex-col justify-between overflow-hidden rounded-[2.2rem] md:rounded-[2.8rem] bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10 p-5 sm:p-8 md:p-10 lg:p-12">
        
        {/* Halos doux internes */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />


        {/* ═══════════════════ VERSION DESKTOP (>= 1024px) ═══════════════════ */}
        <div className="hidden lg:flex flex-col justify-between h-full min-h-[calc(100svh-96px)] relative">
          
          {/* Typographie Monumentale (NASSERE YACOUBA) */}
          <div className="relative my-auto py-10 z-0">
            <h1
              className="relative z-0 select-none whitespace-nowrap text-center font-black leading-[0.88] tracking-[-0.03em] text-[clamp(2.4rem,8.3vw,10.2rem)]"
              aria-label="Nassere YACOUBA"
            >
              <span
                className="inline-block uppercase tracking-tight"
                style={{
                  WebkitTextStroke: "2px #0f172a",
                  color: "transparent",
                }}
              >
                NASSERE
              </span>

              <span className="inline-block w-[2em]" />

              <span className="inline-block uppercase text-slate-950 tracking-tight translate-y-[0.45em]">
                YACOUBA
              </span>
            </h1>
          </div>

          {/* Portrait Détouré de Nassere en Costume */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[82%] max-h-[780px] w-[min(96vw,560px)] select-none pointer-events-none flex items-end justify-center">
            <img
              src="/images/nassere-clean.png"
              alt="Portrait de Nassere Yacouba"
              className="h-full w-auto max-w-full object-contain object-bottom filter grayscale contrast-110 brightness-105 drop-shadow-2xl"
            />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
          </div>

          {/* Sceau Circulaire Rotatif (Stamp Badge) */}
          <div className="absolute right-[22%] top-[46%] z-20">
            <button
              onClick={() => onScrollTo("contact")}
              className="group relative grid size-28 md:size-32 place-items-center cursor-pointer"
              aria-label="Contacter Nassere Yacouba"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin [animation-duration:22s]">
                <defs>
                  <path id="stampCircleDesk" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
                </defs>
                <text className="fill-slate-900 font-sans text-[8.8px] font-bold uppercase tracking-[0.19em]">
                  <textPath href="#stampCircleDesk" textLength="236.7" lengthAdjust="spacing">
                    NASSERE YACOUBA • DEV FULLSTACK •{" "}
                  </textPath>
                </text>
              </svg>
              <span className="grid size-12 place-items-center rounded-full bg-slate-950 text-indigo-400 shadow-xl transition-transform duration-500 group-hover:rotate-[-18deg] group-hover:scale-110 border border-white/20">
                <Code2 className="size-5 text-indigo-400" />
              </span>
            </button>
          </div>

          {/* Bas de Carte : Bio à gauche */}
          <div className="relative z-20 flex items-end justify-between gap-6 pt-6">
            <div className="max-w-md">
              <h2 className="text-3xl lg:text-[2.6rem] font-black leading-tight tracking-tight text-indigo-600 flex items-center min-h-[1.25em]">
                <span>{typed}</span>
                <span className="inline-block w-1.5 h-[0.85em] bg-indigo-400/80 ml-1.5 animate-pulse rounded-full" />
              </h2>
              <p className="mt-3 max-w-[22rem] text-[15px] leading-relaxed text-slate-700 font-medium">
                Développeur web et mobile, je crée des solutions performantes et centrées sur l&apos;utilisateur. Curieux et attentif aux détails, je suis en apprentissage constant pour intégrer les dernières technologies.
              </p>

              <div className="mt-6 flex items-center gap-3.5">
                <button
                  onClick={() => onScrollTo("projects")}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-white transition-all shadow-md shadow-indigo-200 hover:-translate-y-0.5 active:scale-98 cursor-pointer"
                >
                  Voir mes projets
                </button>
                <button
                  onClick={() => onScrollTo("contact")}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-800 transition-all shadow-xs hover:-translate-y-0.5 active:scale-98 cursor-pointer"
                >
                  Me contacter
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ═══════════════════ VERSION MOBILE & TABLETTE (< 1024px) ═══════════════════ */}
        <div className="flex lg:hidden flex-col justify-between gap-4 py-2 sm:py-4 relative z-10">
          
          {/* 1. Titre Impactant Responsive */}
          <div className="text-center pt-1">
            <h1 className="select-none font-black tracking-tight leading-[0.92]">
              <span
                className="inline-block uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl mr-2.5 sm:mr-4"
                style={{
                  WebkitTextStroke: "1.5px #0f172a",
                  color: "transparent",
                }}
              >
                NASSERE
              </span>
              <span className="inline-block uppercase text-slate-950 tracking-tight text-3xl sm:text-5xl md:text-6xl">
                YACOUBA
              </span>
            </h1>
          </div>

          {/* 2. Portrait Centré + Badge Flottant Discret */}
          <div className="relative flex items-end justify-center my-2 select-none pointer-events-none">
            <div className="relative h-[250px] sm:h-[320px] md:h-[380px] w-auto flex items-end justify-center">
              <img
                src="/images/nassere-clean.png"
                alt="Portrait de Nassere Yacouba"
                className="h-full w-auto object-contain object-bottom filter grayscale contrast-110 brightness-105 drop-shadow-xl"
              />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white via-white/40 to-transparent" />
            </div>

            {/* Sceau Rotatif version mobile/tablette sur le côté */}
            <div className="absolute right-0 sm:right-6 md:right-12 top-0 pointer-events-auto">
              <button
                onClick={() => onScrollTo("contact")}
                className="group relative grid size-16 sm:size-20 md:size-24 place-items-center cursor-pointer"
                aria-label="Contacter Nassere Yacouba"
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin [animation-duration:22s]">
                  <defs>
                    <path id="stampCircleMob" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
                  </defs>
                  <text className="fill-slate-900 font-sans text-[8.8px] font-bold uppercase tracking-[0.19em]">
                    <textPath href="#stampCircleMob" textLength="236.7" lengthAdjust="spacing">
                      NASSERE YACOUBA • DEV FULLSTACK •{" "}
                    </textPath>
                  </text>
                </svg>
                <span className="grid size-8 sm:size-10 place-items-center rounded-full bg-slate-950 text-indigo-400 shadow-md border border-white/20">
                  <Code2 className="size-3.5 sm:size-4 text-indigo-400" />
                </span>
              </button>
            </div>
          </div>

          {/* 3. Bio & Boutons (Parfaitement lisibles en dessous, sans masquer le portrait) */}
          <div className="text-center sm:text-left max-w-lg mx-auto sm:mx-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight tracking-tight text-indigo-600 flex items-center justify-center sm:justify-start min-h-[1.25em]">
              <span>{typed}</span>
              <span className="inline-block w-1 h-[0.85em] bg-indigo-400/80 ml-1.5 animate-pulse rounded-full" />
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
              Développeur web et mobile, je crée des solutions performantes et centrées sur l&apos;utilisateur. Curieux et attentif aux détails, je suis en apprentissage constant pour intégrer les dernières technologies.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-2.5">
              <button
                onClick={() => onScrollTo("projects")}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all shadow-md shadow-indigo-200 active:scale-98 cursor-pointer"
              >
                Voir mes projets
              </button>
              <button
                onClick={() => onScrollTo("contact")}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-all shadow-xs active:scale-98 cursor-pointer"
              >
                Me contacter
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ── Bandeau Marquee Incliné Signature CodeurAuChapeau ── */}
      <div className="relative my-8 md:my-14 -rotate-[1.2deg] overflow-hidden bg-slate-950 py-4 md:py-5 text-white shadow-2xl">
        <div className="flex w-max animate-marquee space-x-12">
          {[...marqueeTech, ...marqueeTech, ...marqueeTech, ...marqueeTech].map((tech, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <img src={tech.icon} alt={tech.name} className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
              <span className="font-extrabold uppercase tracking-tight text-xl md:text-3xl text-slate-100">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
