"use client";

import { TrendingUp, Target, BarChart3 } from "lucide-react";

interface ProgressChartProps {
  currentScore: number;
  targetScore: number;
  consecutivePayments: number;
  isDemoMode?: boolean;
}

export function ProgressChart({
  currentScore,
  targetScore,
  consecutivePayments,
  isDemoMode = false,
}: ProgressChartProps) {
  const progress = Math.min((currentScore / targetScore) * 100, 100);
  const paymentsProgress = Math.min((consecutivePayments / 12) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Progreso y Metas</h3>
      </div>

      <div className="space-y-6">
        {/* Progreso del Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">Payment Score</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {currentScore} / {targetScore}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 15 && (
                <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
              )}
            </div>
          </div>
          {progress < 100 && (
            <p className="text-xs text-gray-500 mt-1">
              Faltan {targetScore - currentScore} puntos para alcanzar tu meta
            </p>
          )}
        </div>

        {/* Progreso de Pagos Consecutivos */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">Pagos Consecutivos</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {consecutivePayments} / 12
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${paymentsProgress}%` }}
            >
              {paymentsProgress > 15 && (
                <span className="text-xs font-bold text-white">
                  {Math.round(paymentsProgress)}%
                </span>
              )}
            </div>
          </div>
          {paymentsProgress < 100 && (
            <p className="text-xs text-gray-500 mt-1">
              Faltan {12 - consecutivePayments} pagos para completar el objetivo mensual
            </p>
          )}
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{currentScore}</div>
            <div className="text-xs text-gray-600">Score Actual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{consecutivePayments}</div>
            <div className="text-xs text-gray-600">Racha Actual</div>
          </div>
        </div>
      </div>
    </div>
  );
}

