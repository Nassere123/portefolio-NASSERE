// Source de données partagée pour les projets de Nassere Yacouba

export interface ProjectData {
  id: string
  num: string
  category: string
  filterKeys: ("web" | "mobile" | "backend")[]
  title: string
  description: string
  technologies: string[]
  learnings: string
  gradient: string
  image: string | null
  iconName: "Smartphone" | "Laptop" | "Server" | "Globe" | "Database"
  link: string
  github: string | null
  status: string
  isProduction: boolean
  createdAt?: string
}

export const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: "proj-01",
    num: "01",
    category: "Mobile",
    filterKeys: ["mobile"],
    title: "Application de Livraison",
    description:
      "Application mobile de logistique permettant l'acheminement et le suivi de colis depuis une gare jusqu'au domicile du destinataire.",
    technologies: ["React Native", "Expo", "NestJS", "PostgreSQL"],
    learnings: "Architecture backend REST, géolocalisation, gestion de stage académique",
    gradient: "from-sky-500 to-blue-600",
    image: null,
    iconName: "Smartphone",
    link: "#",
    github: "https://github.com/Nassere123",
    status: "Projet Académique",
    isProduction: false,
  },
  {
    id: "proj-02",
    num: "02",
    category: "Web",
    filterKeys: ["web"],
    title: "Cerise Communication & Marketing",
    description:
      "Développement et déploiement en production du site web institutionnel de l'agence Cerise Communication & Marketing durant mon stage à LONIYA TECH.",
    technologies: ["React.js", "EmailJS", "TailwindCSS"],
    learnings: "Déploiement en production, relation client, intégration de formulaires dynamiques",
    gradient: "from-rose-500 to-red-600",
    image: "/images/cerisecm.png",
    iconName: "Laptop",
    link: "https://cerisecm.com",
    github: null,
    status: "En Production",
    isProduction: true,
  },
  {
    id: "proj-03",
    num: "03",
    category: "Web",
    filterKeys: ["web"],
    title: "Hub Formations et Conseil",
    description:
      "Plateforme web moderne présentant le catalogue des formations et les solutions de conseil d'entreprise du cabinet HCF Conseil.",
    technologies: ["React.js", "EmailJS", "Responsive UI"],
    learnings: "Conception d'interfaces soignées, optimisation SEO, satisfaction client",
    gradient: "from-violet-500 to-purple-600",
    image: "/images/hub.png",
    iconName: "Laptop",
    link: "https://hcfconseil.com",
    github: null,
    status: "En Production",
    isProduction: true,
  },
  {
    id: "proj-04",
    num: "04",
    category: "Mobile & Système",
    filterKeys: ["mobile", "backend"],
    title: "SGA-UTA — Gestion des Présences",
    description:
      "Application de gestion et suivi des présences et absences permettant à l'université d'optimiser le suivi rigoureux de l'assiduité étudiante.",
    technologies: ["Java", "PostgreSQL", "Architecture MVC"],
    learnings: "Gestion de projet, modélisation de données académiques, maîtrise de Java",
    gradient: "from-emerald-500 to-teal-600",
    image: null,
    iconName: "Smartphone",
    link: "#",
    github: "https://github.com/Nassere123",
    status: "Système Universitaire",
    isProduction: false,
  },
  {
    id: "proj-05",
    num: "05",
    category: "Web",
    filterKeys: ["web"],
    title: "Gestion des Notes Scolaires",
    description:
      "Application web permettant la saisie des notes, le calcul automatisé des moyennes et la génération de relevés pour l'UTA avec interface intuitive.",
    technologies: ["PHP", "Laravel", "JavaScript", "MySQL"],
    learnings: "Architecture MVC Laravel, intégrité des données scolaires, sécurité",
    gradient: "from-orange-500 to-amber-600",
    image: null,
    iconName: "Laptop",
    link: "#",
    github: "https://github.com/Nassere123",
    status: "Application Web",
    isProduction: false,
  },
  {
    id: "proj-06",
    num: "06",
    category: "Backend & Système",
    filterKeys: ["backend"],
    title: "Système de Gestion de Bibliothèque",
    description:
      "Solution complète d'informatisation de bibliothèque permettant la gestion des adhérents, des fiches d'ouvrages et le suivi précis des emprunts.",
    technologies: ["Java", "MySQL", "JDBC"],
    learnings: "Bases de données relationnelles, logique métier robuste, respect des délais",
    gradient: "from-indigo-500 to-violet-600",
    image: null,
    iconName: "Server",
    link: "#",
    github: "https://github.com/Nassere123",
    status: "Système & BDD",
    isProduction: false,
  },
]
