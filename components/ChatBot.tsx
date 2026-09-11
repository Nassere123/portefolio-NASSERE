"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Maximize2,
  Minimize2,
  ExternalLink,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Bonjour ! Je suis l'Assistant IA de **Nassere Yacouba**, Développeur Web & Mobile Fullstack basé à Abidjan.\n\nQue souhaitez-vous explorer ?",
  },
]

const QUICK_QUESTIONS = [
  "Quels sont tes projets récents ?",
  "Quelles technologies maîtrises-tu ?",
  "Comment contacter Nassere ?",
  "Es-tu disponible pour une opportunité ?",
]

// Convertit le markdown [texte](url) et **gras**
function FormattedMessage({ text }: { text: string }) {
  const parseMarkdown = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g)

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        )
      }

      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
      if (linkMatch) {
        const [, linkText, href] = linkMatch
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-indigo-600 font-medium underline underline-offset-2 hover:text-indigo-800 transition-colors"
          >
            {linkText}
            <ExternalLink className="w-2.5 h-2.5 inline-block" />
          </a>
        )
      }

      return part
    })
  }

  const lines = text.split("\n")

  return (
    <div className="space-y-1 leading-relaxed">
      {lines.map((line, i) => (
        <p key={i} className="min-h-[1.15em]">
          {parseMarkdown(line)}
        </p>
      ))}
    </div>
  )
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, messages, isLoading])

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const historyToSend = messages
        .filter((m) => m.id !== "welcome-1")
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyToSend, message: textToSend }),
      })

      const data = await res.json()
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "Désolé, je n'ai pas pu obtenir de réponse.",
      }

      setMessages((prev) => [...prev, botReply])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Une petite coupure est survenue. N'hésitez pas à contacter directement Nassere sur [WhatsApp](https://wa.me/2250707632140) !",
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Fenêtre de discussion compacte (style inspiré de la maquette) */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-xl border border-gray-200/80 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 mb-3 ${
            isExpanded
              ? "w-[94vw] sm:w-[460px] h-[580px] max-h-[88vh]"
              : "w-[90vw] sm:w-[350px] h-[480px] max-h-[78vh]"
          }`}
          style={{ boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)" }}
        >
          {/* Header avec la couleur de la charte Indigo/Violet */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              {/* Badge avec icône Robot */}
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xs shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <line x1="12" y1="5" x2="12" y2="2" />
                  <circle cx="12" cy="2" r="1" fill="currentColor" />
                  <rect x="4" y="5" width="16" height="13" rx="3.5" fill="currentColor" fillOpacity="0.15" />
                  <circle cx="9" cy="10.5" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="10.5" r="1.5" fill="currentColor" />
                  <path d="M9 14.5c.8.8 2.2.8 3 0" />
                  <path d="M12 14.5c.8.8 2.2.8 3 0" />
                  <path d="M2 11.5a1.5 1.5 0 0 1 2 0" />
                  <path d="M22 11.5a1.5 1.5 0 0 0-2 0" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm leading-tight">
                  Assistant IA de NASSERE YACOUBA
                </h3>
                <p className="text-[11px] text-indigo-100 leading-tight">
                  Dev Fullstack • Abidjan
                </p>
              </div>
            </div>

            {/* Boutons d'action du header en blanc translucide */}
            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={handleReset}
                title="Recommencer"
                className="p-1 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Recommencer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Réduire la taille" : "Agrandir"}
                className="p-1 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Agrandir/Réduire"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Fermer"
                className="p-1 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Fermer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Zone des messages */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-white">
            {messages.map((m) => {
              const isAssistant = m.role === "assistant"
              return (
                <div
                  key={m.id}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                      isAssistant
                        ? "bg-gray-50/70 border border-gray-100 text-gray-800 shadow-2xs"
                        : "bg-indigo-600 text-white shadow-2xs"
                    }`}
                  >
                    <FormattedMessage text={m.content} />
                  </div>
                </div>
              )
            })}

            {/* Indicateur de réflexion */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-2xl shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Suggestions de questions rapides en liste de pilules (style photo 2) */}
            {messages.length <= 2 && (
              <div className="flex flex-col items-start gap-1.5 pt-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className="text-left text-xs bg-white hover:bg-indigo-50/60 border border-indigo-100 hover:border-indigo-300 text-indigo-900 font-medium px-3.5 py-1.5 rounded-full transition shadow-2xs disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Barre d'input aux couleurs Indigo */}
          <div className="p-2.5 bg-white border-t border-gray-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez une question sur son profil..."
                className="flex-1 text-xs bg-gray-50/70 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all duration-150"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center disabled:opacity-40 transition-all duration-200 shadow-xs shadow-indigo-200 shrink-0"
                aria-label="Envoyer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bouton d'ouverture / fermeture flottant (Taille normale conservée w-14 h-14) */}
      {isOpen ? (
        // Bouton sombre avec croix blanche
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Fermer l'assistant"
          className="w-14 h-14 rounded-full bg-gray-900 hover:bg-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <X className="w-6 h-6" />
        </button>
      ) : (
        // Bouton Robot pleine taille w-14 h-14 avec ondes sortantes
        <div className="relative flex items-center justify-center animate-bot-float">
          {/* Ondes qui sortent du robot */}
          <span className="absolute inset-0 rounded-full bg-indigo-500/35 ring-2 ring-indigo-400/50 animate-radar-wave-1 pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-violet-500/30 ring-2 ring-violet-400/40 animate-radar-wave-2 pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-indigo-400/25 ring-1 ring-indigo-300/30 animate-radar-wave-3 pointer-events-none" />

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir l'assistant virtuel"
            className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-110 active:scale-95 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 shadow-indigo-300 ring-4 ring-indigo-100"
          >
            {/* Icône Robot pleine taille w-7 h-7 */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              {/* Antenne */}
              <line x1="12" y1="5" x2="12" y2="2" />
              <circle cx="12" cy="2" r="1" fill="currentColor" />
              {/* Tête */}
              <rect x="4" y="5" width="16" height="13" rx="3.5" fill="currentColor" fillOpacity="0.15" />
              {/* Yeux */}
              <circle cx="9" cy="10.5" r="1.5" fill="currentColor" />
              <circle cx="15" cy="10.5" r="1.5" fill="currentColor" />
              {/* Sourire */}
              <path d="M9 14.5c.8.8 2.2.8 3 0" />
              <path d="M12 14.5c.8.8 2.2.8 3 0" />
              {/* Oreilles */}
              <path d="M2 11.5a1.5 1.5 0 0 1 2 0" />
              <path d="M22 11.5a1.5 1.5 0 0 0-2 0" />
            </svg>
            {/* Point vert actif */}
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-xs" />
          </button>
        </div>
      )}
    </div>
  )
}
