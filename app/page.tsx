"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faLightbulb, faComments, faBolt, faGraduationCap, faBriefcase, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faWhatsapp, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  Monitor,
  Users,
  Lightbulb,
  MessageCircle,
  Zap,
  GraduationCap,
  Award,
  Calendar,
  Menu,
  X,
  Briefcase,
  Globe,
  Layers,
  Terminal,
  ChevronDown,
} from "lucide-react"

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsIntersecting(true)
    }, options)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isIntersecting] as const
}

function useTypewriter(text: string, speed = 80) {
  const [displayText, setDisplayText] = useState("")
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayText((p) => p + text[idx])
        setIdx((p) => p + 1)
      }, speed)
      return () => clearTimeout(t)
    }
  }, [idx, text, speed])
  return displayText
}

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
      timeout = setTimeout(() => setDeleting(true), pauseMs)
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

// ─── AnimatedSection ──────────────────────────────────────────────────────────

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1, rootMargin: "40px" })
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─── SoftSkillCards ───────────────────────────────────────────────────────────

function SoftSkillCards() {
  const items = [
    {
      icon: faUsers,
      label: "Travail en équipe",
      desc: "Collaborer efficacement, partager les responsabilités et avancer ensemble vers un objectif commun.",
      iconColor: "text-indigo-500",
      border: "border-indigo-100",
      hover: "hover:border-indigo-300 hover:shadow-indigo-100",
    },
    {
      icon: faLightbulb,
      label: "Résolution créative",
      desc: "Analyser les situations complexes et proposer des solutions innovantes adaptées aux contraintes.",
      iconColor: "text-amber-500",
      border: "border-amber-100",
      hover: "hover:border-amber-300 hover:shadow-amber-100",
    },
    {
      icon: faComments,
      label: "Communication",
      desc: "Exprimer clairement les idées, écouter activement et maintenir un dialogue constructif.",
      iconColor: "text-sky-500",
      border: "border-sky-100",
      hover: "hover:border-sky-300 hover:shadow-sky-100",
    },
    {
      icon: faBolt,
      label: "Adaptabilité",
      desc: "S'adapter aux nouvelles technologies et environnements de travail avec agilité et curiosité.",
      iconColor: "text-emerald-500",
      border: "border-emerald-100",
      hover: "hover:border-emerald-300 hover:shadow-emerald-100",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((s, i) => (
        <div
          key={i}
          className={`bg-white border ${s.border} ${s.hover} rounded-3xl p-6 shadow-sm flex flex-col gap-4 
            transition-all duration-300 ease-out
            hover:-translate-y-2 hover:shadow-lg cursor-default`}
        >
          <FontAwesomeIcon icon={s.icon} className={`text-3xl ${s.iconColor}`} />
          <div>
            <p className="font-bold text-gray-900 text-base mb-2">{s.label}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{children}</h2>
      <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full" />
    </div>
  )
}

// ─── SkillCard ────────────────────────────────────────────────────────────────

function SkillCard({
  icon,
  title,
  skills,
}: {
  icon: React.ReactNode
  title: string
  skills: string[]
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="px-3 py-1 text-sm rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition-colors duration-200"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({
  title,
  description,
  technologies,
  learnings,
  accent,
  icon,
}: {
  title: string
  description: string
  technologies: string[]
  learnings: string
  accent: string
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className={`h-1.5 ${accent}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-lg ${accent} bg-opacity-10 text-white shrink-0`}>{icon}</div>
          <h3 className="font-bold text-gray-900 text-base leading-snug">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-4 flex-1">{description}</p>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Technologies</p>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs rounded-full border border-indigo-200 text-indigo-600 bg-indigo-50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Apprentissages</p>
            <p className="text-sm text-gray-500">{learnings}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TimelineItem ─────────────────────────────────────────────────────────────

function TimelineItem({
  period,
  title,
  subtitle,
  institution,
  icon,
  last = false,
}: {
  period: string
  title: string
  subtitle?: string
  institution: string
  icon: React.ReactNode
  last?: boolean
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-indigo-600 shrink-0">
          {icon}
        </div>
        {!last && <div className="w-px flex-1 bg-indigo-100 mt-2" />}
      </div>
      <div className="pb-8">
        <span className="text-xs font-medium text-indigo-500 flex items-center gap-1 mb-1">
          <Calendar className="w-3 h-3" />
          {period}
        </span>
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        {subtitle && <p className="text-indigo-600 text-sm">{subtitle}</p>}
        <p className="text-gray-500 text-sm">{institution}</p>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [loaded, setLoaded] = useState(false)

  const typed = useTypewriterLoop([
    "Développeur Web & Mobile",
    "Développeur Fullstack",
    "Formateur & Lead Dev",
    "Créateur de solutions",
  ], 80, 40, 2000)

  useEffect(() => { setLoaded(true) }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"]
      const pos = window.scrollY + 120
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Accueil" },
    { id: "about", label: "À propos" },
    { id: "skills", label: "Compétences" },
    { id: "projects", label: "Projets" },
    { id: "education", label: "Formation" },
    { id: "contact", label: "Contact" },
  ]

  const skillGroups = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Langages",
      skills: ["Java", "Python", "PHP", "JavaScript", "TypeScript"],
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Frameworks",
      skills: ["React.js", "Angular", "React Native", "Laravel", "NestJS", "Expo"],
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Bases de données",
      skills: ["MySQL", "PostgreSQL", "MongoDB Atlas", "Oracle"],
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Systèmes & Outils",
      skills: ["Windows", "Linux", "MacOS", "Git", "GitHub", "Word", "Excel", "PowerPoint"],
    },
  ]

  const projects = [
    {
      title: "Application Mobile de Livraison",
      description:
        "Durant mon stage académique, j'ai travaillé sur une application mobile de livraison de colis depuis une gare jusqu'au domicile du client.",
      technologies: ["React Native", "Expo", "NestJS", "PostgreSQL"],
      learnings: "Développement mobile, architecture backend REST, gestion de stage en conditions réelles",
      accent: "bg-gradient-to-r from-sky-500 to-blue-600",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      title: "Sites Web — Cerise & Hub Formations",
      description:
        "Développement et déploiement des sites web de Cerise Communication & Marketing et de Hub Formations et Conseil durant mon stage à LONIYA TECH (2024-2025).",
      technologies: ["React.js", "EmailJS"],
      learnings: "Déploiement en production, relation client, intégration de formulaires de contact",
      accent: "bg-gradient-to-r from-violet-500 to-purple-600",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      title: "SGA-UTA — Gestion des Présences",
      description:
        "Application de gestion des présences et absences permettant à l'université d'optimiser le suivi de l'assiduité des étudiants.",
      technologies: ["Java", "PostgreSQL"],
      learnings: "Gestion de projet, travail en équipe, maîtrise de Java",
      accent: "bg-gradient-to-r from-emerald-500 to-teal-600",
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Application de Gestion des Notes",
      description:
        "Application web permettant de gérer les notes d'une école, développée pour l'UTA avec une interface utilisateur moderne.",
      technologies: ["PHP", "Laravel", "JavaScript"],
      learnings: "Développement Front-End, framework Laravel, MVC",
      accent: "bg-gradient-to-r from-orange-500 to-amber-600",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      title: "Système de Gestion de Bibliothèque",
      description:
        "Système complet de gestion de bibliothèque permettant l'enregistrement des utilisateurs et la gestion des emprunts de livres.",
      technologies: ["Java", "MySQL"],
      learnings: "Travail sous pression, respect des délais, gestion de base de données",
      accent: "bg-gradient-to-r from-rose-500 to-red-600",
      icon: <Database className="w-4 h-4" />,
    },
  ]

  const education = [
    {
      period: "2022 – 2025",
      title: "Licence en Informatique",
      subtitle: "Option Génie Logiciel",
      institution: "Université de Technologie d'Abidjan",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      period: "2025",
      title: "Certificat de Formation Arduino",
      institution: "Orange Digital Center",
      icon: <Terminal className="w-4 h-4" />,
    },
    {
      period: "2022",
      title: "Baccalauréat Série D",
      institution: "Lycée Moderne Charles Bauza Donwahi de Soubré",
      icon: <Award className="w-4 h-4" />,
    },
  ]

  const softSkills = [
    { icon: <Users className="w-5 h-5" />, label: "Travail en équipe" },
    { icon: <Lightbulb className="w-5 h-5" />, label: "Résolution créative de problèmes" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Communication efficace" },
    { icon: <Zap className="w-5 h-5" />, label: "Adaptabilité & apprentissage rapide" },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Loader */}
      {!loaded && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      )}

      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollTo("home")}
              className="text-xl font-bold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors"
            >
              NY<span className="text-indigo-500">.</span>
            </button>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Icônes réseaux sociaux */}
              <div className="flex items-center gap-2 ml-2">
                {[
                  {
                    href: "https://www.facebook.com/Abdelblogofficiel",
                    label: "Facebook",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://wa.me/2250707632140",
                    label: "WhatsApp",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://github.com/Nassere123/PORTFOLIO-NASSERE",
                    label: "GitHub",
                    icon: <Github className="w-4 h-4" />,
                  },
                  {
                    href: "mailto:moktarnassere@gmail.com",
                    label: "Email",
                    icon: <Mail className="w-4 h-4" />,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-md border border-indigo-200 flex items-center justify-center text-indigo-500 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              menuOpen ? "max-h-80 pb-4" : "max-h-0"
            } border-t border-gray-100`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left py-2.5 text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Blob violet en haut à droite */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-gradient-to-bl from-violet-200 via-indigo-100 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
        {/* Blob bleu en bas à gauche */}
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-sky-100 to-transparent rounded-full blur-2xl opacity-50 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full pt-20 pb-16">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

            {/* Photo gauche */}
            <AnimatedSection delay={100} className="shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-black overflow-hidden shadow-2xl shadow-indigo-200/60 ring-4 ring-white">
                <img
                  src="/images/image demoi.jpeg"
                  alt="Nassere Yacouba"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
              </div>
            </AnimatedSection>

            {/* Texte droite */}
            <div className="flex-1 text-center md:text-left">
              <AnimatedSection delay={200}>
                <p className="text-gray-500 text-base md:text-lg font-medium mb-2">
                  Hey, <span className="text-gray-900 font-semibold">Nassere Yacouba</span>
                </p>
              </AnimatedSection>

              <AnimatedSection delay={320}>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                  <span className="text-indigo-600">{typed}</span>
                  <span className="animate-pulse text-indigo-400">|</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={560}>
                <p className="text-gray-600 max-w-lg mb-8 leading-relaxed text-sm md:text-base font-medium">
                  Développeur web et mobile, je crée des solutions performantes et centrées sur l'utilisateur.
                  Curieux et attentif aux détails, je suis en apprentissage constant pour intégrer les dernières
                  technologies.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={680}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-10">
                  <Button
                    onClick={() => scrollTo("projects")}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 text-sm font-semibold rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200"
                  >
                    Voir mes projets
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scrollTo("contact")}
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 px-7 py-3 text-sm font-semibold rounded-md bg-white"
                  >
                    Me contacter
                  </Button>
                </div>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection delay={800}>
                <div className="flex gap-10 justify-center md:justify-start">
                  {[
                    { value: "5+", label: "Projets" },
                    { value: "15+", label: "Compétences" },
                    { value: "3 ans", label: "Formation" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
            <ChevronDown className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionTitle>À propos de moi</SectionTitle>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <SoftSkillCards />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Mon <span className="text-indigo-600">Stack</span>
              </h2>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-2">
                Mes outils tech les plus utilisés
              </p>
              <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mt-4" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {[
                { name: "Java",        color: "#E76F00", icon: "https://cdn.simpleicons.org/openjdk/E76F00" },
                { name: "Python",      color: "#3776AB", icon: "https://cdn.simpleicons.org/python/3776AB" },
                { name: "PHP",         color: "#777BB4", icon: "https://cdn.simpleicons.org/php/777BB4" },
                { name: "JavaScript",  color: "#F7DF1E", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
                { name: "TypeScript",  color: "#3178C6", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
                { name: "React",       color: "#61DAFB", icon: "https://cdn.simpleicons.org/react/61DAFB" },
                { name: "Angular",     color: "#DD0031", icon: "https://cdn.simpleicons.org/angular/DD0031" },
                { name: "React Native",color: "#61DAFB", icon: "https://cdn.simpleicons.org/react/61DAFB" },
                { name: "Laravel",     color: "#FF2D20", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
                { name: "NestJS",      color: "#E0234E", icon: "https://cdn.simpleicons.org/nestjs/E0234E" },
                { name: "MySQL",       color: "#4479A1", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
                { name: "PostgreSQL",  color: "#4169E1", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
                { name: "MongoDB",     color: "#47A248", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
                { name: "Git",         color: "#F05032", icon: "https://cdn.simpleicons.org/git/F05032" },
                { name: "GitHub",      color: "#181717", icon: "https://cdn.simpleicons.org/github/181717" },
                { name: "Linux",       color: "#FCC624", icon: "https://cdn.simpleicons.org/linux/FCC624" },
              ].map((tech, i) => (
                <AnimatedSection key={tech.name} delay={i * 50}>
                  <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm group-hover:-translate-y-2 group-hover:shadow-md group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-indigo-600 transition-colors duration-200 text-center">
                      {tech.name}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Mes <span className="text-indigo-600">Projets</span> / Réalisations
              </h2>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-2">
                Solutions développées durant ma formation et mes stages
              </p>
              <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mt-4" />
            </div>
          </AnimatedSection>
        </div>

        {/* Sticky scroll stack */}
        <div className="max-w-5xl mx-auto">
          {[
            {
              num: "01",
              category: "Mobile",
              title: "Application de Livraison",
              description: "Durant mon stage académique, j'ai travaillé sur une application mobile de livraison de colis depuis une gare jusqu'au domicile du client.",
              technologies: ["React Native", "Expo", "NestJS", "PostgreSQL"],
              gradient: "from-sky-500 to-blue-600",
              emoji: "📦",
              image: null,
              link: "#",
            },
            {
              num: "02",
              category: "Web",
              title: "Cerise Communication & Marketing",
              description: "Développement et déploiement du site web de Cerise Communication & Marketing durant mon stage à LONIYA TECH (2024-2025).",
              technologies: ["React.js", "EmailJS"],
              gradient: "from-red-500 to-rose-600",
              emoji: "📣",
              image: "/images/cerisecm.png",
              link: "https://cerisecm.com",
            },
            {
              num: "03",
              category: "Web",
              title: "Hub Formations et Conseil",
              description: "Développement et déploiement du site web de Hub Formations et Conseil durant mon stage à LONIYA TECH (2024-2025).",
              technologies: ["React.js", "EmailJS"],
              gradient: "from-violet-500 to-purple-600",
              emoji: "🎯",
              image: "/images/hub.png",
              link: "https://hcfconseil.com",
            },
            {
              num: "04",
              category: "Mobile",
              title: "SGA-UTA — Gestion des Présences",
              description: "Application de gestion des présences et absences permettant à l'université d'optimiser le suivi de l'assiduité des étudiants.",
              technologies: ["Java", "PostgreSQL"],
              gradient: "from-emerald-500 to-teal-600",
              emoji: "🎓",
              image: null,
              link: "#",
            },
            {
              num: "05",
              category: "Web",
              title: "Gestion des Notes",
              description: "Application web permettant de gérer les notes d'une école, développée pour l'UTA avec une interface utilisateur moderne.",
              technologies: ["PHP", "Laravel", "JavaScript"],
              gradient: "from-orange-500 to-amber-600",
              emoji: "📝",
              image: null,
              link: "#",
            },
            {
              num: "06",
              category: "Mobile",
              title: "Système de Bibliothèque",
              description: "Système complet de gestion de bibliothèque permettant l'enregistrement des utilisateurs et la gestion des emprunts de livres.",
              technologies: ["Java", "MySQL"],
              gradient: "from-rose-500 to-red-600",
              emoji: "📚",
              image: null,
              link: "#",
            },
          ].map((p, i) => (
            <div
              key={p.title}
              className="sticky"
              style={{ top: `${80 + i * 16}px` }}
            >
              <div
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl mb-10"
                style={{ zIndex: i + 1 }}
              >
                <div className="flex flex-col md:flex-row min-h-[340px]">
                  {/* Gauche — texte */}
                  <div className="flex-1 p-10 pb-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-6xl font-black text-gray-100 select-none leading-none">{p.num}</span>
                      <span className="text-indigo-500 text-xs font-bold uppercase tracking-widest">{p.category}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.technologies.map((t) => (
                        <span key={t} className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.link !== "#" ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 w-fit"
                      >
                        Voir le projet <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-400 text-sm font-semibold rounded-md w-fit cursor-not-allowed">
                        Lien à venir <ExternalLink className="w-4 h-4" />
                      </span>
                    )}                  </div>

                  {/* Droite — image ou dégradé */}
                  {p.image ? (
                    <div className="md:w-[460px] min-h-[280px] overflow-hidden shrink-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`md:w-[460px] bg-gradient-to-br ${p.gradient} flex items-center justify-center shrink-0 min-h-[280px] rounded-r-3xl`}>
                      <span className="text-[120px] drop-shadow-lg select-none leading-none">{p.emoji}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education & Experience ── */}
      <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Parcours</h2>
              <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full" />
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16">

            {/* ── Formation ── */}
            <AnimatedSection delay={200}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faGraduationCap} className="text-indigo-600 text-xl" />
                Formation
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-indigo-100" />
                <div className="space-y-8">
                  {[
                    {
                      period: "2026",
                      title: "Certificat HackerRank — Angular",
                      subtitle: null,
                      place: "HackerRank",
                    },
                    {
                      period: "2022 – 2025",
                      title: "Licence en Informatique",
                      subtitle: "Option Génie Logiciel",
                      place: "Université de Technologie d'Abidjan",
                    },
                    {
                      period: "2025",
                      title: "Certificat de Formation Arduino",
                      subtitle: null,
                      place: "Orange Digital Center",
                    },
                    {
                      period: "2022",
                      title: "Baccalauréat Série D",
                      subtitle: null,
                      place: "Lycée Moderne Charles Bauza Donwahi de Soubré",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow flex items-center justify-center shrink-0 z-10">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="pb-2">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{item.period}</span>
                        <h4 className="font-bold text-gray-900 text-base mt-0.5">{item.title}</h4>
                        {item.subtitle && <p className="text-indigo-400 text-sm">{item.subtitle}</p>}
                        <p className="text-gray-400 text-sm">{item.place}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* ── Expériences Pro ── */}
            <AnimatedSection delay={400}>
              <div className="md:pl-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faBriefcase} className="text-violet-600 text-xl" />
                Expériences Pro
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-violet-100" />
                <div className="space-y-8">
                  {[
                    {
                      period: "Actuellement",
                      title: "Développeur Fullstack",
                      place: "Odace Consulting",
                      current: true,
                    },
                    {
                      period: "Depuis 2025",
                      title: "Formateur & Lead Dev",
                      place: "Neopy Academy",
                      current: false,
                    },
                    {
                      period: "Sept. 2025 – Fév. 2026",
                      title: "Stagiaire Dev Fullstack",
                      place: "LONIYA TECH",
                      current: false,
                    },
                    {
                      period: "2022 – 2023",
                      title: "Membre",
                      place: "Genius Academy",
                      current: false,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className={`w-8 h-8 rounded-full border-4 border-white shadow flex items-center justify-center shrink-0 z-10 ${item.current ? "bg-violet-600" : "bg-violet-400"}`}>
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">{item.period}</span>
                          {item.current && (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full font-semibold">
                              En poste
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-900 text-base mt-0.5">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.place}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="bg-white">

        {/* Discutons-en */}
        <AnimatedSection>
          <div className="bg-indigo-50 px-6 sm:px-16 lg:px-24 py-16">
            <p className="text-gray-400 text-sm mb-3">Vous avez un projet ?</p>
            <h2 className="text-6xl md:text-8xl font-black text-indigo-600 leading-none mb-6 flex flex-wrap">
              {"Discutons-en".split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block animate-wave"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
            <div className="flex justify-end">
              <a
                href="mailto:moktarnassere@gmail.com"
                className="text-indigo-500 font-semibold text-base hover:text-indigo-700 transition-colors flex items-center gap-2"
              >
                moktarnassere@gmail.com
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimatedSection>

      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-10 px-4 text-center bg-white">
        <p className="text-2xl font-bold text-gray-900 mb-1">
          Nassere <span className="text-indigo-600">Yacouba</span>
        </p>
        <p className="text-gray-400 text-sm mb-6">Informaticien Développeur Web & Mobile</p>
        <div className="flex justify-center gap-5 mb-8">
          {[
            { href: "mailto:moktarnassere@gmail.com", icon: <Mail className="w-5 h-5" /> },
            { href: "tel:+2250707632140", icon: <Phone className="w-5 h-5" /> },
            { href: "https://github.com/Nassere123/PORTFOLIO-NASSERE", icon: <Github className="w-5 h-5" /> },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-gray-300 hover:text-indigo-500 transition-colors duration-200"
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p className="text-gray-300 text-xs">© 2025 Nassere Yacouba. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
