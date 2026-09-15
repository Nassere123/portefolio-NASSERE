import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/admin-auth"
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  getFallbackMessages,
  updateFallbackMessageStatus,
  deleteFallbackMessage,
} from "@/lib/supabase"

export async function GET() {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
    }

    if (isSupabaseConfigured()) {
      const supabaseAdmin = getSupabaseAdmin()
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false })

        if (!error && data) {
          return NextResponse.json({ success: true, messages: data, source: "supabase" })
        }
        console.warn("Supabase fetch failed, using fallback:", error)
      }
    }

    const fallbackMessages = getFallbackMessages()
    return NextResponse.json({ success: true, messages: fallbackMessages, source: "fallback" })
  } catch (error) {
    console.error("Erreur GET /api/admin/messages:", error)
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
    }

    const { id, status } = await req.json()
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID et statut obligatoires" }, { status: 400 })
    }

    if (isSupabaseConfigured()) {
      const supabaseAdmin = getSupabaseAdmin()
      if (supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from("contact_messages")
          .update({ status })
          .eq("id", id)

        if (!error) {
          return NextResponse.json({ success: true, message: "Statut mis à jour" })
        }
      }
    }

    const ok = updateFallbackMessageStatus(id, status)
    if (!ok) {
      return NextResponse.json({ success: false, error: "Message introuvable" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Statut mis à jour (local)" })
  } catch (error) {
    console.error("Erreur PATCH /api/admin/messages:", error)
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ success: false, error: "ID manquant" }, { status: 400 })
    }

    if (isSupabaseConfigured()) {
      const supabaseAdmin = getSupabaseAdmin()
      if (supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from("contact_messages")
          .delete()
          .eq("id", id)

        if (!error) {
          return NextResponse.json({ success: true, message: "Message supprimé" })
        }
      }
    }

    const ok = deleteFallbackMessage(id)
    if (!ok) {
      return NextResponse.json({ success: false, error: "Message introuvable" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Message supprimé (local)" })
  } catch (error) {
    console.error("Erreur DELETE /api/admin/messages:", error)
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 })
  }
}
