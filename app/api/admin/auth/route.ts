import { NextResponse } from "next/server"
import { checkAdminPassword, getSessionToken, isAuthenticated, COOKIE_NAME } from "@/lib/admin-auth"

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    if (!password || !checkAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Mot de passe administrateur incorrect" },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true, message: "Connexion réussie" })
    response.cookies.set(COOKIE_NAME, getSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    })

    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET() {
  const authed = await isAuthenticated()
  return NextResponse.json({ authenticated: authed })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Déconnexion réussie" })
  response.cookies.delete(COOKIE_NAME)
  return response
}
