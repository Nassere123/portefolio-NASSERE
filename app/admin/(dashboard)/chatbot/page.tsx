"use client"

import React, { useState } from "react"
import {
  BotMessageSquare,
  Sparkles,
  ShieldCheck,
  Send,
  RefreshCw,
  Sliders,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react"

export default function AdminChatbotPage() {
  const [testInput, setTestInput] = useState("")
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string; source?: string }[]
  >([
    {
      sender: "bot",
      text: "Bonjour Nassere ! Je suis votre assistant virtuel IA. Vous pouvez me poser une question de test ici pour vérifier mes réponses.",
      source: "system",
    },
  ])
  const [loading, setLoading] = useState(false)

  const handleTestChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testInput.trim() || loading) return

    const userText = testInput.trim()
    setTestInput("")
    setMessages((prev) => [...prev, { sender: "user", text: userText }])
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "Aucune réponse retournée.",
          source: data.source || "openrouter",
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Erreur de communication avec l'API.",
          source: "error",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Top Header ── */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Assistant IA & Chatbot
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Gemma 4 31B
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Supervisez le modèle d'intelligence artificielle et testez les réponses fournies aux recruteurs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Service Opérationnel</span>
          </span>
        </div>
      </div>

      {/* ── Configuration & Statut Cartes ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="w-9 h-9 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Modèle Actif</h3>
          <p className="text-xs text-slate-500 mt-1">Google Gemma 4 31B Instruct</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Fournisseur</span>
            <span className="font-semibold text-slate-700">OpenRouter</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Mode Résilient</h3>
          <p className="text-xs text-slate-500 mt-1">Secours local intelligent</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Disponibilité</span>
            <span className="font-semibold text-emerald-600">100% Sans coupure</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="w-9 h-9 rounded-md bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Connaissances</h3>
          <p className="text-xs text-slate-500 mt-1">Parcours, Projets, Contact</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Mise à jour</span>
            <span className="font-semibold text-slate-700">Synchronisé</span>
          </div>
        </div>
      </div>

      {/* ── Console de Test en Direct ── */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Console de Test Interactive</h2>
            <p className="text-xs text-slate-500">
              Discutez directement avec l'IA pour vérifier ses réponses et son comportement
            </p>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  sender: "bot",
                  text: "Conversation réinitialisée.",
                  source: "system",
                },
              ])
            }
            className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            title="Réinitialiser"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="p-5 space-y-4 max-h-96 overflow-y-auto bg-slate-50/30">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-2.5 rounded-lg text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-slate-200 text-slate-800 shadow-xs"
                }`}
              >
                {m.text}
              </div>
              {m.source && (
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  Source : {m.source}
                </span>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white border border-slate-200 px-3 py-2 rounded-lg w-fit shadow-xs">
              <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span>Gemma 4 génère la réponse...</span>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleTestChat} className="p-4 border-t border-slate-200 bg-white flex gap-2">
          <input
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Posez une question à votre bot (ex: Quels sont tes projets récents ?)..."
            className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={loading || !testInput.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Envoyer</span>
          </button>
        </form>
      </div>
    </div>
  )
}
