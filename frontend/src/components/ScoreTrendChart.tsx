"use client";

import { TrendingUp, Calendar, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ScoreTrendChartProps {
  currentScore: number;
  isDemoMode?: boolean;
}

export function ScoreTrendChart({ currentScore, isDemoMode = false }: ScoreTrendChartProps) {
  // Datos mock para demo - evolución del score en los últimos 6 meses
  const demoData = [
    { month: "Jul", score: 720 },
    { month: "Ago", score: 750 },
    { month: "Sep", score: 780 },
    { month: "Oct", score: 810 },
    { month: "Nov", score: 830 },
    { month: "Dic", score: currentScore },
  ];

  const data = isDemoMode ? demoData : [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Evolución del Score</h3>
      </div>

      {data.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                domain={[600, 1000]}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value} puntos`, "Score"]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ fill: "#4f46e5", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>No hay datos disponibles</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600">Inicio</div>
            <div className="text-lg font-bold text-gray-900">{data[0]?.score || 0}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Actual</div>
            <div className="text-lg font-bold text-indigo-600">{currentScore}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Mejora</div>
            <div className="text-lg font-bold text-green-600">
              +{data.length > 0 ? currentScore - (data[0]?.score || 0) : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

