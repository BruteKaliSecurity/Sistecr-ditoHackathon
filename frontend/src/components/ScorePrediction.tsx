"use client";

import { Brain, TrendingUp, Calendar, Target } from "lucide-react";

interface ScorePredictionProps {
  currentScore: number;
  consecutivePayments: number;
  isDemoMode?: boolean;
}

export function ScorePrediction({
  currentScore,
  consecutivePayments,
  isDemoMode = false,
}: ScorePredictionProps) {
  const calculatePrediction = (months: number) => {
    const baseIncrease = consecutivePayments > 10 ? 8 : 5;
    const paymentBonus = consecutivePayments * 0.5;
    const monthlyIncrease = baseIncrease + paymentBonus;
    const predictedScore = Math.min(
      currentScore + monthlyIncrease * months,
      1000
    );
    const scoreIncrease = predictedScore - currentScore;
    const confidence = currentScore > 800 ? 92 : currentScore > 600 ? 78 : 65;

    return {
      predictedScore: Math.round(predictedScore),
      scoreIncrease: Math.round(scoreIncrease),
      confidence,
    };
  };

  const predictions = {
    oneMonth: calculatePrediction(1),
    threeMonths: calculatePrediction(3),
    sixMonths: calculatePrediction(6),
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-xl shadow-md p-6 border-l-4 border-purple-500">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">Predicción de Score (IA)</h3>
        <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {predictions.oneMonth.confidence}% confianza
        </span>
      </div>

      <div className="space-y-4">
        {/* Score Actual */}
        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Score Actual</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">{currentScore}</span>
          </div>
        </div>

        {/* Predicciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1 Mes */}
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">1 Mes</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {predictions.oneMonth.predictedScore}
            </div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+{predictions.oneMonth.scoreIncrease} puntos</span>
            </div>
          </div>

          {/* 3 Meses */}
          <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">3 Meses</span>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {predictions.threeMonths.predictedScore}
            </div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+{predictions.threeMonths.scoreIncrease} puntos</span>
            </div>
          </div>

          {/* 6 Meses */}
          <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-semibold text-gray-700">6 Meses</span>
            </div>
            <div className="text-3xl font-bold text-pink-600 mb-1">
              {predictions.sixMonths.predictedScore}
            </div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+{predictions.sixMonths.scoreIncrease} puntos</span>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-4 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200">
          <p className="text-xs text-gray-600">
            <strong>Nota:</strong> Las predicciones se basan en tu historial actual y patrones de pago.
            Mantén tu racha de pagos para alcanzar estos objetivos.
          </p>
        </div>
      </div>
    </div>
  );
}

