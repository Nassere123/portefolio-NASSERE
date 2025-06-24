"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Database,
  Monitor,
  Users,
  Lightbulb,
  MessageCircle,
  Zap,
  GraduationCap,
  Award,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react"

// Hook pour les animations au scroll
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting] as const
}

// Hook pour l'animation de typing
function useTypewriter(text: string, speed = 100) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return displayText
}

// Hook pour l'animation de compteur
function useCounter(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * (end - start) + start))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isActive, end, duration, start])

  return [count, setIsActive] as const
}

// Composant de particules flottantes
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
      ))}
    </div>
  )
}

// Composant de section animée
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  })

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)

  const typedText = useTypewriter("Informaticien & Développeur d'Applications", 80)
  const [projectsCount, setProjectsCountActive] = useCounter(3, 2000)
  const [skillsCount, setSkillsCountActive] = useCounter(15, 2000)
  const [yearsCount, setYearsCountActive] = useCounter(3, 2000)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const skills = {
    languages: ["Java", "Python", "PHP", "Laravel", "JavaScript"],
    databases: ["MySQL", "PostgreSQL", "Oracle"],
    systems: ["Windows", "Linux", "MacOS"],
    tools: ["Git", "GitHub", "Word", "Excel", "PowerPoint"],
  }

  const projects = [
    {
      title: "SGA-UTA - Gestion des Présences Étudiants",
      description:
        "Application de gestion des présences et absences permettant à l'université d'optimiser le suivi de l'assiduité des étudiants.",
      technologies: ["Java", "PostgreSQL"],
      learnings: "Gestion de projet, travail en équipe, maîtrise de Java",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Application de Gestion des Notes",
      description:
        "Application web permettant de gérer les notes d'une école, développée pour l'UTA avec une interface utilisateur moderne.",
      technologies: ["PHP", "Laravel", "JavaScript"],
      learnings: "Développement Front-End en PHP, framework Laravel",
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Système de Gestion de Bibliothèque",
      description:
        "Système complet de gestion de bibliothèque permettant l'enregistrement des utilisateurs et la gestion des emprunts de livres.",
      technologies: ["Java", "MySQL"],
      learnings: "Travail sous pression, respect des délais, gestion de base de données",
      icon: <Database className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const education = [
    {
      period: "2022 - 2025",
      title: "Licence en Informatique",
      subtitle: "Option Génie Logiciel",
      institution: "Université de Technologie d'Abidjan",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      period: "2022",
      title: "Baccalauréat Série D",
      institution: "Lycée Moderne Charles Bauza Donwahi de Soubré",
      icon: <Award className="w-5 h-5" />,
    },
    {
      period: "Certification",
      title: "Formation ARDUINO",
      institution: "Orange Digital Center",
      icon: <Code className="w-5 h-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Particules flottantes */}
      <FloatingParticles />

      {/* Loader */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Code className="w-8 h-8 text-emerald-600 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-200 transition-all duration-500 ${
          isLoaded ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900 animate-pulse-slow">Nassere Yacouba</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Accueil" },
                { id: "about", label: "À propos" },
                { id: "skills", label: "Compétences" },
                { id: "projects", label: "Projets" },
                { id: "education", label: "Formation" },
                { id: "contact", label: "Contact" },
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-emerald-600 hover:scale-105 ${
                    activeSection === item.id ? "text-emerald-600 scale-105" : "text-gray-700"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-96 py-4" : "max-h-0"
            } border-t border-gray-200`}
          >
            {[
              { id: "home", label: "Accueil" },
              { id: "about", label: "À propos" },
              { id: "skills", label: "Compétences" },
              { id: "projects", label: "Projets" },
              { id: "education", label: "Formation" },
              { id: "contact", label: "Contact" },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-2 text-sm font-medium transition-all duration-300 hover:text-emerald-600 hover:translate-x-2 ${
                  isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <AnimatedSection delay={200}>
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg animate-bounce-slow hover:scale-110 transition-transform duration-300 cursor-pointer border-4 border-emerald-400">
                  <img src="/images/profile.jpg" alt="Nassere Yacouba" className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">Nassere Yacouba</h1>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="text-xl md:text-2xl text-gray-600 mb-8 h-8">
                {typedText}
                <span className="animate-pulse">|</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 animate-fade-in">
                Développeur web et mobile passionné, je crée des solutions performantes et centrées sur l'utilisateur.
                Curieux et attentif aux détails, je suis en apprentissage constant pour intégrer les dernières
                technologies.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={1000}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-pulse-button"
                >
                  Voir mes projets
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-emerald-600 border-emerald-600 hover:bg-emerald-50 px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  onClick={() => scrollToSection("contact")}
                >
                  Me contacter
                </Button>
              </div>
            </AnimatedSection>

            {/* Stats animées */}
            <AnimatedSection delay={1200}>
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12">
                <StatsCounter count={projectsCount} label="Projets" setActive={setProjectsCountActive} />
                <StatsCounter count={skillsCount} label="Compétences" setActive={setSkillsCountActive} />
                <StatsCounter count={yearsCount} label="Années d'étude" setActive={setYearsCountActive} />
              </div>
            </AnimatedSection>

            <div className="mt-12 animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">À propos de moi</h2>
              <div className="w-20 h-1 bg-emerald-600 mx-auto animate-expand"></div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={200}>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Mes atouts principaux</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Users className="w-5 h-5" />, text: "Capacité à travailler en équipe" },
                    { icon: <Lightbulb className="w-5 h-5" />, text: "Résoudre des problèmes de façon créative" },
                    { icon: <MessageCircle className="w-5 h-5" />, text: "Bonnes compétences en communication" },
                    { icon: <Zap className="w-5 h-5" />, text: "Adaptabilité et apprentissage rapide" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform duration-300 animate-slide-in-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-emerald-600 animate-pulse-slow">{item.icon}</div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informations de contact</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Phone className="w-5 h-5" />, text: "0707632140" },
                    { icon: <Mail className="w-5 h-5" />, text: "moktarnassere@gmail.com" },
                    { icon: <MapPin className="w-5 h-5" />, text: "Abidjan, Côte d'Ivoire" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 hover:bg-emerald-50 p-2 rounded-lg transition-all duration-300 animate-slide-in-right"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-emerald-600">{item.icon}</div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}

                  <div
                    className="flex items-center space-x-3 hover:bg-emerald-50 p-2 rounded-lg transition-all duration-300 animate-slide-in-right"
                    style={{ animationDelay: "300ms" }}
                  >
                    <Github className="w-5 h-5 text-emerald-600" />
                    <a
                      href="https://github.com/Nassere123/PORTFOLIO-NASSERE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      GitHub Portfolio
                    </a>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Langues</h4>
                  <div className="flex space-x-4">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 animate-bounce-in"
                      style={{ animationDelay: "100ms" }}
                    >
                      Français
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 animate-bounce-in"
                      style={{ animationDelay: "200ms" }}
                    >
                      Anglais
                    </Badge>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compétences Techniques</h2>
              <div className="w-20 h-1 bg-emerald-600 mx-auto animate-expand"></div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={200}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Code className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Langages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-emerald-100 text-emerald-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Database className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Bases de données</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.databases.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-emerald-100 text-emerald-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Monitor className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Systèmes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.systems.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-emerald-100 text-emerald-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Code className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Outils</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-emerald-100 text-emerald-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projets Réalisés</h2>
              <div className="w-20 h-1 bg-emerald-600 mx-auto animate-expand"></div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up overflow-hidden">
                  <div
                    className={`h-2 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`text-white p-2 rounded-lg bg-gradient-to-r ${project.gradient} group-hover:scale-110 transition-transform duration-300`}
                      >
                        {project.icon}
                      </div>
                      <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Technologies utilisées:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 animate-bounce-in"
                              style={{ animationDelay: `${techIndex * 100}ms` }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Apprentissages:</h4>
                        <p className="text-sm text-gray-600">{project.learnings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Formation & Certifications</h2>
              <div className="w-20 h-1 bg-emerald-600 mx-auto animate-expand"></div>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {education.map((item, index) => (
                <AnimatedSection key={index} delay={index * 200}>
                  <Card className="hover:shadow-lg transition-all duration-500 hover:scale-105 animate-slide-in-left">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-pulse-slow">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-300">
                              {item.title}
                            </h3>
                            <div className="flex items-center text-emerald-600 text-sm font-medium animate-pulse">
                              <Calendar className="w-4 h-4 mr-1" />
                              {item.period}
                            </div>
                          </div>
                          {item.subtitle && <p className="text-gray-600 mb-1">{item.subtitle}</p>}
                          <p className="text-gray-700 font-medium">{item.institution}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contactez-moi</h2>
              <div className="w-20 h-1 bg-emerald-600 mx-auto animate-expand"></div>
              <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
                Intéressé par une collaboration ? N'hésitez pas à me contacter pour discuter de vos projets.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection delay={200}>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informations de contact</h3>
                  <div className="space-y-6">
                    {[
                      { icon: <Phone className="w-6 h-6" />, title: "Téléphone", value: "0707632140" },
                      { icon: <Mail className="w-6 h-6" />, title: "Email", value: "moktarnassere@gmail.com" },
                      { icon: <MapPin className="w-6 h-6" />, title: "Localisation", value: "Abidjan, Côte d'Ivoire" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 hover:bg-emerald-50 p-4 rounded-lg transition-all duration-300 animate-slide-in-left"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-pulse-slow">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-gray-600">{item.value}</p>
                        </div>
                      </div>
                    ))}

                    <div
                      className="flex items-center space-x-4 hover:bg-emerald-50 p-4 rounded-lg transition-all duration-300 animate-slide-in-left"
                      style={{ animationDelay: "300ms" }}
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-pulse-slow">
                        <Github className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">GitHub</p>
                        <a
                          href="https://github.com/Nassere123/PORTFOLIO-NASSERE"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 transition-colors flex items-center"
                        >
                          Voir mon profil <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Disponibilité</h3>
                  <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:shadow-lg transition-all duration-500 animate-pulse-card">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Disponible sur demande</h4>
                        <p className="text-gray-600 mb-6">
                          Je suis actuellement ouvert aux opportunités de collaboration et aux nouveaux projets.
                        </p>
                        <div className="space-y-3">
                          <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transform hover:scale-105 transition-all duration-300 animate-pulse-button"
                            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=moktarnassere@gmail.com', '_blank')}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Envoyer un email
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full bg-white text-blue-600 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
                            onClick={() => window.open('https://www.facebook.com/Abdelblogofficiel', '_blank')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                            </svg>
                            Contacter sur Facebook
                          </Button>
                          <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-all duration-300 animate-pulse-button"
                            onClick={() => window.open('https://wa.me/2250707632140', '_blank')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 14.487c-.263-.131-1.558-.77-1.799-.858-.241-.088-.417-.131-.593.132-.175.263-.678.858-.831 1.033-.153.175-.306.197-.569.066-.263-.132-1.111-.409-2.117-1.304-.782-.696-1.31-1.556-1.464-1.819-.153-.263-.016-.405.115-.536.118-.117.263-.306.395-.459.132-.153.175-.263.263-.438.088-.175.044-.329-.022-.46-.066-.132-.593-1.43-.813-1.956-.214-.514-.433-.444-.593-.453-.153-.008-.329-.01-.505-.01-.175 0-.46.066-.701.329-.241.263-.92.899-.92 2.192 0 1.293.942 2.544 1.073 2.719.131.175 1.853 2.832 4.5 3.857.63.217 1.122.346 1.505.443.632.161 1.208.138 1.663.084.508-.06 1.558-.637 1.779-1.253.22-.616.22-1.144.153-1.253-.066-.109-.241-.175-.504-.306z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25 21.75 6.615 21.75 12z" />
                            </svg>
                            Écrire sur WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 animate-fade-in">Nassere Yacouba</h3>
              <p className="text-gray-400 mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                Informaticien & Développeur d'Applications
              </p>
              <div className="flex justify-center space-x-6 mb-8">
                {[
                  { href: "mailto:moktarnassere@gmail.com", icon: <Mail className="w-6 h-6" /> },
                  { href: "tel:0707632140", icon: <Phone className="w-6 h-6" /> },
                  { href: "https://github.com/Nassere123/PORTFOLIO-NASSERE", icon: <Github className="w-6 h-6" /> },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 animate-bounce-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 text-sm animate-fade-in" style={{ animationDelay: "600ms" }}>
                  © 2024 Nassere Yacouba. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </footer>
    </div>
  )
}

// Composant pour les statistiques animées
function StatsCounter({
  count,
  label,
  setActive,
}: { count: number; label: string; setActive: (active: boolean) => void }) {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 })

  useEffect(() => {
    if (isIntersecting) {
      setActive(true)
    }
  }, [isIntersecting, setActive])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-emerald-600 mb-2 animate-pulse">{count}+</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}
