"use client"

import React, { useState } from "react"
import { Mail, MessageCircle, Send, CheckCircle2, AlertCircle, ArrowUpRight, Phone } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCountry: "+225",
    phoneNumber: "",
    objective: "Lancement d'un produit Web (Site, SaaS)",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const fullPhone = formData.phoneNumber
      ? `${formData.phoneCountry} ${formData.phoneNumber}`.trim()
      : ""

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          objective: formData.objective,
          message: formData.message,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
        setFormData({
          name: "",
          email: "",
          phoneCountry: "+225",
          phoneNumber: "",
          objective: "Lancement d'un produit Web (Site, SaaS)",
          message: "",
        })
      } else {
        setError(data.error || "Une erreur est survenue lors de l'envoi.")
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer ou me contacter directement par WhatsApp/Email.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Halos subtils */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Colonne Gauche : Pitch & Coordonnées directes ── */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            <div>
              {/* Badge d'en-tête */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[2px] bg-indigo-600 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-900">
                  Collaborons ensemble
                </span>
              </div>

              {/* Grand Titre avec style éditorial */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                Bâtissons votre{" "}
                <span className="font-serif italic font-normal text-indigo-600">
                  prochain produit.
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
                Afin de garantir un niveau d'engagement maximal et une qualité irréprochable, je n'accompagne qu'un nombre limité de nouveaux projets par trimestre. Discutons de votre feuille de route stratégique.
              </p>
            </div>

            {/* Cartes de contact rapide */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:moktarnassere@gmail.com"
                className="group p-5 rounded-2xl border border-slate-200/80 bg-white/80 hover:bg-white hover:border-indigo-200 transition-all shadow-xs hover:shadow-md flex items-center gap-4"
              >
                <div className="text-indigo-600 group-hover:text-indigo-700 transition-colors flex items-center justify-center shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Email Professionnel
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                    moktarnassere@gmail.com
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </a>

              {/* WhatsApp Prioritaire */}
              <a
                href="https://wa.me/2250707632140?text=Bonjour%20Nassere,%20j'ai%20vu%20votre%20portfolio%20et%20j'aimerais%20discuter%20d'un%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl border border-slate-200/80 bg-white/80 hover:bg-white hover:border-emerald-200 transition-all shadow-xs hover:shadow-md flex items-center gap-4"
              >
                <div className="text-emerald-600 group-hover:text-emerald-700 transition-colors flex items-center justify-center shrink-0">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    WhatsApp Prioritaire
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">
                    +225 07 07 63 21 40
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* ── Colonne Droite : Formulaire Moderne Épuré ── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-2xl shadow-slate-100 relative">
              {success ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Demande transmise avec succès !</h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base mb-8">
                    Merci pour votre message. Je vais analyser vos besoins et revenir vers vous sous 24 heures ouvrées.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <span>Envoyer un autre message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Ligne 1 : Nom & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Votre nom ou entreprise <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: SpaceX, Entreprise..."
                        className="w-full pb-2.5 pt-1 bg-transparent border-b border-slate-300 focus:border-slate-900 outline-none text-slate-900 text-sm sm:text-base placeholder:text-slate-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Email de contact <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full pb-2.5 pt-1 bg-transparent border-b border-slate-300 focus:border-slate-900 outline-none text-slate-900 text-sm sm:text-base placeholder:text-slate-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Ligne 2 : Numéro de téléphone */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Numéro de téléphone
                    </label>
                    <div className="flex items-center gap-3 border-b border-slate-300 focus-within:border-slate-900 transition-colors pb-1">
                      <select
                        value={formData.phoneCountry}
                        onChange={(e) => setFormData({ ...formData, phoneCountry: e.target.value })}
                        aria-label="Indicatif téléphonique"
                        className="bg-transparent text-sm font-semibold text-slate-700 outline-none py-1.5 cursor-pointer"
                      >
                        <option value="+225">CI +225</option>
                        <option value="+33">FR +33</option>
                        <option value="+1">US +1</option>
                        <option value="+221">SN +221</option>
                        <option value="+229">BJ +229</option>
                        <option value="+226">BF +226</option>
                        <option value="+237">CM +237</option>
                        <option value="+212">MA +212</option>
                      </select>
                      <span className="text-slate-300">|</span>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="07 00 00 00 00"
                        className="w-full py-1 bg-transparent outline-none text-slate-900 text-sm sm:text-base placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Ligne 3 : Objectif principal */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Objectif principal
                    </label>
                    <div className="relative border-b border-slate-300 focus-within:border-slate-900 transition-colors">
                      <select
                        value={formData.objective}
                        onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                        aria-label="Objectif principal du projet"
                        className="w-full pb-2.5 pt-1 bg-transparent outline-none text-slate-900 text-sm sm:text-base cursor-pointer appearance-none"
                      >
                        <option value="Lancement d'un produit Web (Site, SaaS)">
                          Lancement d'un produit Web (Site, SaaS, Plateforme)
                        </option>
                        <option value="Application Mobile (iOS / Android)">
                          Application Mobile (iOS / Android / Hybride)
                        </option>
                        <option value="Développement Fullstack sur-mesure">
                          Développement Fullstack sur-mesure
                        </option>
                        <option value="Intégration IA / Chatbot intelligent">
                          Intégration IA & Agents intelligents (Gemini / LLM)
                        </option>
                        <option value="Refonte, Performance & Audit">
                          Refonte, Optimisation & Audit technique
                        </option>
                        <option value="Autre demande / Consultation">
                          Autre demande / Consultation stratégique
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400 pb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Ligne 4 : Description */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Description du projet & impact attendu <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Expliquez brièvement vos objectifs, vos contraintes ou vos délais..."
                      className="w-full pb-2 pt-1 bg-transparent border-b border-slate-300 focus:border-slate-900 outline-none text-slate-900 text-sm sm:text-base placeholder:text-slate-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Erreur éventuelle */}
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Bouton d'action */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 bg-slate-950 hover:bg-slate-800 active:bg-slate-900 disabled:opacity-60 text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Envoyer la demande d'audit</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Note de réassurance */}
                  <div className="text-center pt-2">
                    <p className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                      Réponse garantie sous 24 heures • Début immédiat en cas d'accord
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
