"use client";

import { BarChart3, PieChart, Activity } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface StatsSummaryProps {
  score: number;
  consecutivePayments: number;
  rewards: number;
  isDemoMode?: boolean;
}

export function StatsSummary({
  score,
  consecutivePayments,
  rewards,
  isDemoMode = false,
}: StatsSummaryProps) {
  // Datos para gráfico de distribución
  const distributionData = [
    { name: "Score", value: score, color: "#4f46e5" },
    { name: "Pagos", value: consecutivePayments * 10, color: "#10b981" },
    { name: "Recompensas", value: rewards / 10, color: "#f59e0b" },
  ];

  const totalPoints = score + consecutivePayments * 10 + rewards / 10;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Resumen Estadístico</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de distribución */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Distribución de Métricas</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Puntos Totales</p>
                <p className="text-2xl font-bold text-blue-600">{Math.round(totalPoints)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Eficiencia</p>
                <p className="text-2xl font-bold text-green-600">
                  {consecutivePayments > 0 ? Math.round((score / consecutivePayments)) : 0}
                </p>
                <p className="text-xs text-gray-500">Puntos por pago</p>
              </div>
              <PieChart className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valor Acumulado</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${(rewards * 100).toLocaleString("es-CO")}
                </p>
                <p className="text-xs text-gray-500">Equivalente en COP</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

