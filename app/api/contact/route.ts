import { NextResponse } from "next/server"
import { getSupabaseAdmin, isSupabaseConfigured, saveFallbackMessage } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, objective, message } = body

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner votre nom ou entreprise." },
        { status: 400 }
      )
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner une adresse email valide." },
        { status: 400 }
      )
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Veuillez décrire brièvement votre projet ou votre demande." },
        { status: 400 }
      )
    }

    const cleanedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      objective: objective ? String(objective).trim() : "Non spécifié",
      message: message.trim(),
    }

    // 1. Sauvegarde sur Supabase si configuré
    if (isSupabaseConfigured()) {
      const supabaseAdmin = getSupabaseAdmin()
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from("contact_messages")
          .insert([
            {
              name: cleanedData.name,
              email: cleanedData.email,
              phone: cleanedData.phone,
              objective: cleanedData.objective,
              message: cleanedData.message,
              status: "new",
            },
          ])
          .select()

        if (error) {
          console.error("Erreur insertion Supabase:", error)
          // Si Supabase échoue (ex: table non créée), on bascule sur le fallback local
          saveFallbackMessage(cleanedData)
        } else {
          return NextResponse.json({
            success: true,
            message: "Votre message a été transmis avec succès !",
            id: data?.[0]?.id,
          })
        }
      }
    } else {
      // 2. Fallback local pour développement / tests avant saisie des clés Supabase
      saveFallbackMessage(cleanedData)
    }

    return NextResponse.json({
      success: true,
      message: "Votre message a été transmis avec succès ! Je vous répondrai sous 24h.",
    })
  } catch (error) {
    console.error("Erreur API contact:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de l'envoi de votre message." },
      { status: 500 }
    )
  }
}
