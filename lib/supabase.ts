import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseUrl.startsWith("http") &&
    supabaseServiceKey &&
    supabaseServiceKey.length > 10 &&
    !supabaseUrl.includes("votre-projet")
  )
}

// Client pour les requêtes publiques ou côté navigateur
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Client administrateur avec service_role_key pour contourner RLS côté serveur
export function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) return null
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// ─── Fallback local (Fichier JSON) en cas d'absence temporaire des clés Supabase ───
export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  objective?: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  created_at: string
}

const MESSAGES_FILE = path.join(process.cwd(), "data", "messages.json")

export function getFallbackMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf-8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Erreur lecture fallback messages:", error)
  }
  return []
}

export function saveFallbackMessage(msg: Omit<ContactMessage, "id" | "status" | "created_at">): ContactMessage {
  const messages = getFallbackMessages()
  const newMessage: ContactMessage = {
    ...msg,
    id: "msg-" + Date.now(),
    status: "new",
    created_at: new Date().toISOString(),
  }

  try {
    const dir = path.dirname(MESSAGES_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([newMessage, ...messages], null, 2), "utf-8")
  } catch (err) {
    console.warn("Impossible d'écrire dans data/messages.json (serverless)", err)
  }

  return newMessage
}

export function updateFallbackMessageStatus(id: string, status: ContactMessage["status"]): boolean {
  const messages = getFallbackMessages()
  const index = messages.findIndex((m) => m.id === id)
  if (index === -1) return false
  messages[index].status = status
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8")
    return true
  } catch (err) {
    return false
  }
}

export function deleteFallbackMessage(id: string): boolean {
  const messages = getFallbackMessages()
  const filtered = messages.filter((m) => m.id !== id)
  if (filtered.length === messages.length) return false
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2), "utf-8")
    return true
  } catch (err) {
    return false
  }
}
