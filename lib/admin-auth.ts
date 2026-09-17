import { cookies } from "next/headers"
import crypto from "crypto"

// Empreinte cryptographique SHA-256 : le mot de passe en clair n'apparaît JAMAIS dans le code sur GitHub
const DEFAULT_PASSWORD_HASH = "c862afe42beb9c0f3db2fafc05302eae081076d60803d9142c597a5601ea6f8c"

const COOKIE_NAME = "admin_session"
const SESSION_SECRET = process.env.SESSION_SECRET || "nassere_secure_dashboard_session_key_2026"
const SESSION_TOKEN = "session_" + crypto.createHash("sha256").update(DEFAULT_PASSWORD_HASH + SESSION_SECRET).digest("base64")

export function checkAdminPassword(password: string): boolean {
  if (!password) return false
  const trimmed = password.trim()

  // 1. Vérification via la variable d'environnement privée si configurée
  if (process.env.ADMIN_PASSWORD && trimmed === process.env.ADMIN_PASSWORD) {
    return true
  }

  // 2. Vérification par comparaison d'empreinte SHA-256 sécurisée
  const inputHash = crypto.createHash("sha256").update(trimmed).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(DEFAULT_PASSWORD_HASH))
}

export function getSessionToken(): string {
  return SESSION_TOKEN
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false
  return token === SESSION_TOKEN
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)?.value
  return isValidSessionToken(session)
}

export { COOKIE_NAME }
