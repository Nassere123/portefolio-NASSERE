import { cookies } from "next/headers"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Mycodeforme123"
const COOKIE_NAME = "admin_session"
// Jeton simple et robuste pour la session locale/serverless
const SESSION_TOKEN = "session_" + Buffer.from(ADMIN_PASSWORD + "_authorized_admin").toString("base64")

export function checkAdminPassword(password: string): boolean {
  return password.trim() === ADMIN_PASSWORD
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
