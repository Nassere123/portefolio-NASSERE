"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faLightbulb, faComments, faBolt, faGraduationCap, faBriefcase, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faWhatsapp, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ChatBot from "@/components/ChatBot"
import ContactSection from "@/components/ContactSection"
import JourneySection from "@/components/JourneySection"
import ProjectsBentoSection from "@/components/ProjectsBentoSection"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
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
  Smartphone,
  Laptop,
  Server,
  Lock,
} from "lucide-react"
import { INITIAL_PROJECTS, ProjectData } from "@/lib/projects-data"

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
    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
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

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 180)
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
                    className="p-1.5 text-slate-500 hover:text-indigo-600 transition-colors flex items-center justify-center"
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

      {/* ── Hero Monumental Style CodeurAuChapeau ── */}
      <HeroSection onScrollTo={scrollTo} />

      {/* ── Section À propos (Style Bento Aquidev) ── */}
      <AboutSection />




      {/* ── Section Réalisations & Projets Bento Grid ── */}
      <ProjectsBentoSection />

      {/* ── Section Parcours : Expériences & Formations ── */}
      <JourneySection />

      {/* ── Section Contact & Devis ── */}
      <ContactSection />

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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-gray-400 text-xs">
          <p>© 2025 Nassere Yacouba. Tous droits réservés.</p>
          <span className="hidden sm:inline text-gray-300">•</span>
          <a
            href="/admin"
            className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1 text-[11px] text-gray-400 hover:underline"
          >
            <Lock className="w-3 h-3" />
            <span>Espace Admin</span>
          </a>
        </div>
      </footer>

      {/* Assistant Virtuel Chatbot */}
      <ChatBot />
    </div>
  )
}
