"use client"

import React, { useState, useEffect } from "react"
import {
  Mail,
  MessageCircle,
  Clock,
  CheckCircle2,
  Trash2,
  Archive,
  RefreshCw,
  Search,
  ExternalLink,
  Phone,
  Building2,
  Sparkles,
  Inbox,
  Filter,
  Check,
} from "lucide-react"

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  objective?: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  created_at: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied" | "archived">("all")
  const [search, setSearch] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/messages")
      const data = await res.json()
      if (res.ok && data.success) {
        setMessages(data.messages || [])
        if (data.messages?.length > 0 && !selectedMessage) {
          setSelectedMessage(data.messages[0])
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleUpdateStatus = async (id: string, newStatus: ContactMessage["status"]) => {
    setUpdatingId(id)
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        )
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null))
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        if (selectedMessage?.id === id) {
          const remaining = messages.filter((m) => m.id !== id)
          setSelectedMessage(remaining[0] || null)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredMessages = messages.filter((m) => {
    const matchesFilter = filter === "all" ? true : m.status === filter
    const matchesSearch =
      search.trim() === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.objective && m.objective.toLowerCase().includes(search.toLowerCase())) ||
      m.message.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const newCount = messages.filter((m) => m.status === "new").length
  const repliedCount = messages.filter((m) => m.status === "replied").length

  const getCleanPhone = (phone?: string) => {
    if (!phone) return null
    return phone.replace(/[^0-9]/g, "")
  }

  return (
    <div className="space-y-6">
      {/* ── En-tête de la page ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Boîte de réception
            </h1>
            {newCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                {newCount} nouveau{newCount > 1 ? "x" : ""}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Consultez les demandes de projets et répondez directement aux clients par WhatsApp ou Email.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchMessages}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* ── Cartes de résumé KPI ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reçu</p>
            <p className="text-2xl font-black text-slate-900">{messages.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">À Traiter</p>
            <p className="text-2xl font-black text-amber-600">{newCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Traités / Répondus</p>
            <p className="text-2xl font-black text-emerald-600">{repliedCount}</p>
          </div>
        </div>
      </div>

      {/* ── Barre de filtre et recherche ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Onglets statut */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(
            [
              { key: "all", label: "Tous", badge: 0 },
              { key: "new", label: "Nouveaux", badge: newCount },
              { key: "read", label: "Lus", badge: 0 },
              { key: "replied", label: "Traités", badge: 0 },
              { key: "archived", label: "Archivés", badge: 0 },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                filter === t.key
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{t.label}</span>
              {t.badge ? (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    filter === t.key ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Barre de recherche */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher nom, email..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none transition-colors"
          />
        </div>
      </div>

      {/* ── Interface 2 colonnes (Liste + Détail) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Liste des messages */}
        <div className="lg:col-span-5 space-y-3">
          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-500">Chargement des messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Aucun message trouvé</p>
              <p className="text-xs text-slate-400 mt-1">
                Les demandes reçues via le formulaire s'afficheront ici.
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg)
                    if (msg.status === "new") {
                      handleUpdateStatus(msg.id, "read")
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-50/50 border-indigo-300 shadow-sm"
                      : "bg-white hover:bg-slate-50/80 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {msg.name}
                      </span>
                      {msg.status === "new" && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {new Date(msg.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-500 truncate mb-1">
                    {msg.objective || "Demande de contact"}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              )
            })
          )}
        </div>

        {/* Détail du message sélectionné */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              {/* En-tête détail */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-slate-900">
                      {selectedMessage.name}
                    </h2>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        selectedMessage.status === "new"
                          ? "bg-indigo-100 text-indigo-700"
                          : selectedMessage.status === "replied"
                          ? "bg-emerald-100 text-emerald-700"
                          : selectedMessage.status === "archived"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {selectedMessage.status === "new"
                        ? "Nouveau"
                        : selectedMessage.status === "replied"
                        ? "Traité / Répondu"
                        : selectedMessage.status === "archived"
                        ? "Archivé"
                        : "Lu"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      Reçu le{" "}
                      {new Date(selectedMessage.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>

                {/* Statut actions */}
                <div className="flex items-center gap-2">
                  {selectedMessage.status !== "replied" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                      disabled={updatingId === selectedMessage.id}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Marquer traité</span>
                    </button>
                  )}

                  {selectedMessage.status !== "archived" ? (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, "archived")}
                      disabled={updatingId === selectedMessage.id}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Archiver"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, "read")}
                      disabled={updatingId === selectedMessage.id}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium cursor-pointer"
                    >
                      Désarchiver
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    disabled={updatingId === selectedMessage.id}
                    className="p-2 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Adresse Email
                  </span>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Réponse%20à%20votre%20demande%20-%20Nassere%20Yacouba`}
                    className="text-xs sm:text-sm font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1.5 break-all"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>{selectedMessage.email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Numéro de Téléphone
                  </span>
                  {selectedMessage.phone ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {selectedMessage.phone}
                      </span>
                      {getCleanPhone(selectedMessage.phone) && (
                        <a
                          href={`https://wa.me/${getCleanPhone(selectedMessage.phone)}?text=Bonjour%20${encodeURIComponent(
                            selectedMessage.name
                          )},%20j'ai%20bien%20reçu%20votre%20demande%20sur%20mon%20portfolio.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[11px] font-bold hover:bg-emerald-200 transition-colors inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Non renseigné</span>
                  )}
                </div>
              </div>

              {/* Objectif */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Objectif du projet
                </span>
                <span className="inline-block px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100/60">
                  {selectedMessage.objective || "Général"}
                </span>
              </div>

              {/* Contenu du message */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Description du projet & Impact attendu
                </span>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap shadow-inner font-sans">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Boutons d'actions rapides de réponse */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {selectedMessage.phone && getCleanPhone(selectedMessage.phone) && (
                  <a
                    href={`https://wa.me/${getCleanPhone(selectedMessage.phone)}?text=Bonjour%20${encodeURIComponent(
                      selectedMessage.name
                    )},%20j'ai%20bien%20reçu%20votre%20demande%20concernant%20"${encodeURIComponent(
                      selectedMessage.objective || "votre projet"
                    )}"%20sur%20mon%20portfolio.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Répondre sur WhatsApp</span>
                  </a>
                )}

                <a
                  href={`mailto:${selectedMessage.email}?subject=Réponse%20à%20votre%20demande%20de%20projet%20-%20Nassere%20Yacouba&body=Bonjour%20${encodeURIComponent(
                    selectedMessage.name
                  )},%0A%0AMerci%20pour%20votre%20message.%20`}
                  onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span>Répondre par Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
              Sélectionnez un message pour afficher les détails.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
