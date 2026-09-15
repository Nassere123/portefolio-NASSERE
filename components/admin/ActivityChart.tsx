"use client"

import React, { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const MOCK_TRAFFIC_DATA = [
  { month: "Jan", visiteurs: 120, projetsVus: 340 },
  { month: "Fév", visiteurs: 190, projetsVus: 480 },
  { month: "Mar", visiteurs: 270, projetsVus: 690 },
  { month: "Avr", visiteurs: 220, projetsVus: 580 },
  { month: "Mai", visiteurs: 360, projetsVus: 910 },
  { month: "Juin", visiteurs: 410, projetsVus: 1080 },
  { month: "Juil", visiteurs: 380, projetsVus: 990 },
  { month: "Août", visiteurs: 490, projetsVus: 1240 },
  { month: "Sept", visiteurs: 560, projetsVus: 1420 },
]

export default function ActivityChart() {
  const [period, setPeriod] = useState<"annee" | "mois">("annee")

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
      {/* Header avec sélecteur de période comme sur CoreUI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Consultations & Activité du Portfolio
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Évolution des visites et interactions avec vos réalisations
          </p>
        </div>

        <div className="inline-flex rounded-md border border-slate-200 p-0.5 bg-slate-50 self-start">
          <button
            onClick={() => setPeriod("annee")}
            className={`px-3 py-1 text-xs font-semibold rounded ${
              period === "annee"
                ? "bg-white text-indigo-600 shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Année 2025
          </button>
          <button
            onClick={() => setPeriod("mois")}
            className={`px-3 py-1 text-xs font-semibold rounded ${
              period === "mois"
                ? "bg-white text-indigo-600 shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Derniers 30 jours
          </button>
        </div>
      </div>

      {/* Graphique Recharts interactif */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_TRAFFIC_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProjets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorVisiteurs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "1px solid #1e293b",
                color: "#fff",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#e2e8f0" }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", paddingBottom: "10px" }}
            />
            <Area
              type="monotone"
              name="Vues de Projets"
              dataKey="projetsVus"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorProjets)"
            />
            <Area
              type="monotone"
              name="Visiteurs Uniques"
              dataKey="visiteurs"
              stroke="#06b6d4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVisiteurs)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
