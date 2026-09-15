import { isAuthenticated } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import AdminDashboardShell from "@/components/admin/AdminDashboardShell"

export const metadata = {
  title: "Admin Dashboard — Nassere Yacouba",
  description: "Espace d'administration du portfolio de Nassere Yacouba",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authed = await isAuthenticated()
  if (!authed) {
    redirect("/admin/login")
  }

  return <AdminDashboardShell>{children}</AdminDashboardShell>
}
