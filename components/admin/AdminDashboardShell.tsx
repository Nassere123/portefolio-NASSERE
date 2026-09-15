"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FolderGit2,
  BotMessageSquare,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  Search,
  LogOut,
  User,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Sparkles,
  Mail,
} from "lucide-react"

interface Props {
  children: React.ReactNode
}

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  active?: boolean
  external?: boolean
  badge?: string
}

interface NavGroup {
  group: string
  items: NavItem[]
}

export default function AdminDashboardShell({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      router.push("/admin/login")
      router.refresh()
    } catch (e) {
      console.error(e)
    } finally {
      setLoggingOut(false)
    }
  }

  const navItems: NavGroup[] = [
    {
      group: "TABLEAU DE BORD",
      items: [
        {
          name: "Vue d'ensemble",
          href: "/admin",
          icon: <LayoutDashboard className="w-4 h-4" />,
          active: pathname === "/admin",
        },
      ],
    },
    {
      group: "GESTION DE CONTENU",
      items: [
        {
          name: "Projets & Réalisations",
          href: "/admin#projects-section",
          icon: <FolderGit2 className="w-4 h-4" />,
          active: pathname.includes("projects") || pathname === "/admin",
          badge: "6",
        },
        {
          name: "Messages & Devis",
          href: "/admin/messages",
          icon: <Mail className="w-4 h-4" />,
          active: pathname.includes("messages"),
          badge: "Nouveau",
        },
        {
          name: "Assistant IA Chatbot",
          href: "/admin/chatbot",
          icon: <BotMessageSquare className="w-4 h-4" />,
          active: pathname.includes("chatbot"),
          badge: "Gemma 4",
        },
      ],
    },
    {
      group: "SITE PUBLIC",
      items: [
        {
          name: "Voir le Portfolio",
          href: "/",
          icon: <ExternalLink className="w-4 h-4" />,
          external: true,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800 antialiased font-sans">
      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar CoreUI Style ── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-all duration-300 ease-in-out lg:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* CoreUI Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/90 bg-slate-950/50">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md shadow-indigo-600/30">
              NY
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white tracking-wide leading-tight">
                  NASSERE
                </span>
                <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">
                  Admin Console
                </span>
              </div>
            )}
          </Link>

          {!collapsed && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              v1.0
            </span>
          )}
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed ? (
                <p className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">
                  {group.group}
                </p>
              ) : (
                <div className="h-2" />
              )}

              {group.items.map((item) => {
                const isActive = item.active
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors group relative ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
                    } ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? item.name : undefined}
                  >
                    <span className={`shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}>
                      {item.icon}
                    </span>

                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-slate-800 text-slate-300 border border-slate-700"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer & Collapse Toggle */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 hidden lg:flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Système Opérationnel</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
            title={collapsed ? "Agrandir" : "Réduire"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* ── Main Layout Column ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Header CoreUI Style ── */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Left: Mobile menu toggle & Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/admin" className="hover:text-indigo-600 transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Tableau de bord</span>
            </nav>
          </div>

          {/* Center/Right: Actions & User Menu */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-all"
            >
              <span>Voir le portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="w-px h-6 bg-slate-200 hidden md:block" />

            {/* Admin User Profile */}
            <div className="flex items-center gap-3 pl-2">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-indigo-500/40 overflow-hidden flex items-center justify-center text-white font-semibold text-xs">
                  <img
                    src="/images/image demoi.jpeg"
                    alt="Nassere Yacouba"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image path fails
                      ;(e.target as HTMLElement).style.display = "none"
                    }}
                  />
                  <span>NY</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  Nassere Yacouba
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Administrateur
                </span>
              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                title="Se déconnecter"
                className="p-2 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* ── Body Content ── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
