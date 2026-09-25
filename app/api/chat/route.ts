import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const SYSTEM_PROMPT = `
Tu es l'assistant virtuel officiel de Nassere Yacouba, un développeur Web & Mobile Fullstack talentueux basé à Abidjan, Côte d'Ivoire.
Ton rôle est de répondre de façon claire, polie, professionnelle et chaleureuse aux visiteurs de son portfolio (recruteurs, clients, partenaires).

Informations complètes sur Nassere Yacouba :
- Nom : Nassere Yacouba (surnommé Abdel / NY)
- Profession : Développeur Web & Mobile, Développeur Fullstack, Formateur & Lead Dev
- Localisation : Abidjan, Côte d'Ivoire
- Coordonnées :
  * Email : moktarnassere@gmail.com
  * Téléphone & WhatsApp : +225 0707632140 (Lien direct : https://wa.me/2250707632140)
  * GitHub : https://github.com/Nassere123/PORTFOLIO-NASSERE
  * Facebook : https://www.facebook.com/Abdelblogofficiel

Expériences professionnelles :
1. Actuellement : Développeur Fullstack chez Odace Consulting (En poste).
2. Depuis 2025 : Formateur & Lead Dev chez Neopy Academy.
3. Sept. 2025 – Fév. 2026 : Stagiaire Développeur Fullstack chez LONIYA TECH (conception et déploiement de sites clients).
4. 2022 – 2023 : Membre actif chez Genius Academy.

Formations & Diplômes :
- 2026 : Certificat HackerRank — Angular
- 2022 – 2025 : Licence en Informatique, Option Génie Logiciel — Université de Technologie d'Abidjan (UTA)
- 2025 : Certificat de Formation Arduino — Orange Digital Center
- 2022 : Baccalauréat Série D — Lycée Moderne Charles Bauza Donwahi de Soubré

Compétences Techniques :
- Langages : Java, Python, PHP, JavaScript (ES6+), TypeScript
- Frameworks & Librairies : React.js, Next.js, React Native, Angular, Laravel, NestJS, Expo, TailwindCSS
- Bases de données : PostgreSQL, MySQL, MongoDB Atlas, Oracle
- Outils & Systèmes : Linux, Windows, macOS, Git, GitHub, Arduino, EmailJS
- Soft Skills : Travail en équipe, résolution créative de problèmes, communication efficace, adaptabilité et apprentissage rapide.

Projets majeurs :
1. Application Mobile de Livraison : Application mobile de transport et livraison de colis depuis une gare jusqu'au domicile (React Native, Expo, NestJS, PostgreSQL).
2. Cerise Communication & Marketing : Site web vitrine d'agence déployé en production (React.js, EmailJS) — Lien : https://cerisecm.com
3. Hub Formations et Conseil : Plateforme de formations & conseil déployée en production (React.js, EmailJS) — Lien : https://hcfconseil.com
4. SGA-UTA : Application de gestion des présences et absences des étudiants (Java, PostgreSQL).
5. Gestion des Notes : Solution de gestion scolaire et relevés de notes (PHP, Laravel, JavaScript).
6. Système de Gestion de Bibliothèque : Application de gestion des livres et emprunteurs (Java, MySQL).

Consignes de réponse :
- Réponds en français de manière fluide, concise et dynamique.
- Mets en valeur l'expertise de Nassere, son esprit d'apprentissage continu et sa disponibilité pour des projets ou missions.
- Si on demande comment le contacter, fournis directement son adresse email et son numéro WhatsApp (+225 0707632140).
- N'invente pas d'informations personnelles en dehors de ce profil.
`

// Moteur de réponse locale intelligente si aucune clé n'est fournie ou en cas d'erreur de quota
function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase()

  if (q.includes("bonjour") || q.includes("salut") || q.includes("hello") || q.includes("qui es-tu") || q.includes("qui est")) {
    return "Bonjour ! 👋 Je suis l'assistant virtuel de **Nassere Yacouba**, Développeur Web & Mobile Fullstack basé à Abidjan. Je peux vous renseigner sur ses compétences, ses projets récents, son parcours ou sur la façon de le contacter. Que souhaitez-vous savoir ?"
  }

  if (q.includes("contact") || q.includes("joindre") || q.includes("mail") || q.includes("whatsapp") || q.includes("téléphone") || q.includes("appel") || q.includes("numero")) {
    return "Vous pouvez contacter Nassere directement via :\n\n- 📱 **WhatsApp / Téléphone** : [+225 07 07 63 21 40](https://wa.me/2250707632140)\n- ✉️ **Email** : [moktarnassere@gmail.com](mailto:moktarnassere@gmail.com)\n- 💻 **GitHub** : [github.com/Nassere123](https://github.com/Nassere123/PORTFOLIO-NASSERE)\n\nIl répond généralement très rapidement !"
  }

  if (q.includes("projet") || q.includes("réalisation") || q.includes("travail") || q.includes("application")) {
    return "Nassere a développé plusieurs projets phares :\n\n1. **Application Mobile de Livraison** (React Native, Expo, NestJS, PostgreSQL) : transport de colis gare vers domicile.\n2. **Cerise Communication & Marketing** (React.js) : site en production disponible sur [cerisecm.com](https://cerisecm.com).\n3. **Hub Formations et Conseil** (React.js) : site client en production sur [hcfconseil.com](https://hcfconseil.com).\n4. **SGA-UTA** (Java, PostgreSQL) : gestion des présences universitaires.\n5. **Gestion des Notes** (Laravel, PHP) : système d'évaluation académique.\n\nVous pouvez les explorer directement dans la section **Projets** du portfolio !"
  }

  if (q.includes("competence") || q.includes("compétence") || q.includes("stack") || q.includes("techno") || q.includes("langage") || q.includes("framework")) {
    return "Nassere maîtrise une stack complète et moderne :\n\n- **Frontend & Mobile** : React.js, Next.js, React Native, Expo, Angular, TypeScript, TailwindCSS\n- **Backend & APIs** : NestJS, Laravel, PHP, Java, Python\n- **Bases de données** : PostgreSQL, MySQL, MongoDB Atlas, Oracle\n- **Outils** : Git/GitHub, Linux, Arduino\n\nPolyvalent, il s'adapte rapidement à toute nouvelle stack technologique."
  }

  if (q.includes("formation") || q.includes("etude") || q.includes("diplome") || q.includes("diplôme") || q.includes("école") || q.includes("licence")) {
    return "Côté formation, Nassere est titulaire d'une :\n\n- 🎓 **Licence en Informatique** (Option Génie Logiciel) à l'Université de Technologie d'Abidjan (2022–2025).\n- 📜 **Certificat Angular HackerRank** (2026).\n- 🤖 **Certificat Formation Arduino** d'Orange Digital Center (2025).\n- 🎓 **Baccalauréat Série D** (2022)."
  }

  if (q.includes("experience") || q.includes("expérience") || q.includes("poste") || q.includes("entreprise") || q.includes("travaille")) {
    return "Voici les expériences clés de Nassere :\n\n- **Odace Consulting** : Développeur Fullstack (En poste actuellement).\n- **Neopy Academy** : Formateur & Lead Développeur (Depuis 2025).\n- **LONIYA TECH** : Développeur Fullstack Stagiaire (2025–2026), avec déploiement des sites Cerise CM et Hub Formations.\n- **Genius Academy** : Membre (2022–2023)."
  }

  if (q.includes("disponible") || q.includes("dispo") || q.includes("embauche") || q.includes("recrute") || q.includes("freelance") || q.includes("mission") || q.includes("stage") || q.includes("cdi")) {
    return "Oui ! Nassere est ouvert aux opportunités professionnelles (missions freelance, opportunités CDI ou projets innovants). N'hésitez pas à lui envoyer un message sur [WhatsApp (+225 07 07 63 21 40)](https://wa.me/2250707632140) ou par [email](mailto:moktarnassere@gmail.com) pour discuter de votre besoin."
  }

  return "Nassere Yacouba est un Développeur Fullstack & Mobile basé à Abidjan (React, Next.js, React Native, NestJS, Laravel). N'hésitez pas à me demander des détails sur ses **projets**, ses **compétences**, sa **formation** ou ses **coordonnées de contact** !"
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body.messages || []
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === "user").slice(-1)[0]?.content || body.message || ""

    if (!lastUserMessage.trim()) {
      return NextResponse.json({ reply: "Je n'ai pas bien compris votre message. Pouvez-vous préciser ?" })
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.gemini_api_key ||
      process.env.OPENROUTER_API_KEY ||
      process.env.openrouter_api_key ||
      process.env.GOOGLE_API_KEY ||
      process.env.google_api_key

    let model =
      process.env.GEMINI_MODEL ||
      process.env.gemini_model ||
      "google/gemma-4-31b-it"

    // Normalisation du modèle (remplacer les valeurs obsolètes/invalides comme gemma-4)
    if (!model || model.includes("gemma-4")) {
      model = "google/gemma-2-27b-it"
    }

    // Si aucune clé API n'est définie, utiliser le fallback intelligent local
    if (!apiKey) {
      const reply = getLocalFallbackResponse(lastUserMessage)
      return NextResponse.json({ reply, source: "local" })
    }

    let textReply = ""

    // ── Cas 1 : Clé OpenRouter (clé commençant par sk-or-) ──────────
    if (apiKey.startsWith("sk-or-")) {
      const openRouterModel = model.includes("/") ? model : "google/gemma-2-27b-it"
      const formattedMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      ]

      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://portfolio-nassere.com",
            "X-Title": "Portfolio Nassere Yacouba",
          },
          body: JSON.stringify({
            model: openRouterModel,
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 600,
          }),
          signal: AbortSignal.timeout(12000),
        })

        if (response.ok) {
          const data = await response.json()
          textReply = data.choices?.[0]?.message?.content || ""
        } else {
          console.warn(`Erreur OpenRouter (${response.status}), basculement sur le moteur local...`)
          textReply = getLocalFallbackResponse(lastUserMessage)
        }
      } catch (openRouterErr) {
        console.warn("Délai d'attente ou erreur réseau OpenRouter, utilisation de la réponse locale :", openRouterErr)
        textReply = getLocalFallbackResponse(lastUserMessage)
      }

      return NextResponse.json({ reply: textReply || getLocalFallbackResponse(lastUserMessage), source: "openrouter" })
    }

    // ── Cas 2 : Clé Google AI Studio standard ───────────────────────
    const googleModel = model.includes("/") ? "gemini-1.5-flash" : model
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${googleModel}:generateContent?key=${apiKey}`
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
        signal: AbortSignal.timeout(12000),
      })

      if (!response.ok) {
        console.warn(`Erreur API Gemini (${response.status}), basculement sur le moteur local...`)
        textReply = getLocalFallbackResponse(lastUserMessage)
      } else {
        const data = await response.json()
        textReply = data.candidates?.[0]?.content?.parts?.[0]?.text || getLocalFallbackResponse(lastUserMessage)
      }
    } catch (geminiErr) {
      console.warn("Délai d'attente ou erreur réseau Gemini, utilisation de la réponse locale :", geminiErr)
      textReply = getLocalFallbackResponse(lastUserMessage)
    }

    return NextResponse.json({ reply: textReply || getLocalFallbackResponse(lastUserMessage), source: "gemini" })
  } catch (error) {
    console.error("Erreur serveur chatbot:", error)
    return NextResponse.json({
      reply: "Désolé, une petite erreur est survenue. Vous pouvez contacter Nassere directement sur WhatsApp au +225 07 07 63 21 40 !",
      source: "error_fallback",
    })
  }
}
