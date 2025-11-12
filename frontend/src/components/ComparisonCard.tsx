"use client";

import { TrendingUp, TrendingDown, Minus, Users } from "lucide-react";

interface ComparisonCardProps {
  currentScore: number;
  averageScore: number;
  isDemoMode?: boolean;
}

export function ComparisonCard({
  currentScore,
  averageScore,
  isDemoMode = false,
}: ComparisonCardProps) {
  const difference = currentScore - averageScore;
  const percentage = averageScore > 0 ? ((difference / averageScore) * 100).toFixed(1) : "0";

  const getComparisonStatus = () => {
    if (difference > 50) return { icon: TrendingUp, color: "text-green-600", text: "Muy por encima" };
    if (difference > 0) return { icon: TrendingUp, color: "text-green-500", text: "Por encima" };
    if (difference === 0) return { icon: Minus, color: "text-gray-500", text: "Promedio" };
    if (difference > -50) return { icon: TrendingDown, color: "text-orange-500", text: "Por debajo" };
    return { icon: TrendingDown, color: "text-red-600", text: "Muy por debajo" };
  };

  const status = getComparisonStatus();
  const StatusIcon = status.icon;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow-md p-6 border-2 border-indigo-200">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Comparación con Promedio</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-indigo-200">
          <div className="text-sm text-gray-600 mb-1">Tu Score</div>
          <div className="text-3xl font-bold text-indigo-600">{currentScore}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Promedio</div>
          <div className="text-3xl font-bold text-gray-700">{averageScore}</div>
        </div>
      </div>

      <div className={`p-4 bg-white rounded-lg border-2 ${
        difference > 0 ? "border-green-200 bg-green-50" : 
        difference < 0 ? "border-orange-200 bg-orange-50" : 
        "border-gray-200 bg-gray-50"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StatusIcon className={`w-5 h-5 ${status.color}`} />
            <span className={`font-semibold ${status.color}`}>{status.text}</span>
          </div>
          <div className={`text-right ${status.color}`}>
            <div className="text-2xl font-bold">
              {difference > 0 ? "+" : ""}{difference}
            </div>
            <div className="text-sm">
              {difference > 0 ? "+" : ""}{percentage}%
            </div>
          </div>
        </div>
      </div>

      {difference < 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 Consejo:</strong> Mantén tus pagos puntuales para mejorar tu score y alcanzar el promedio.
          </p>
        </div>
      )}
    </div>
  );
}

