"use client";

import { Calculator, Gift, TrendingUp, Target } from "lucide-react";
import { useState } from "react";

interface RewardsCalculatorProps {
  level: string;
  currentConsecutivePayments: number;
  isDemoMode?: boolean;
}

export function RewardsCalculator({
  level,
  currentConsecutivePayments,
  isDemoMode = false,
}: RewardsCalculatorProps) {
  const [futurePayments, setFuturePayments] = useState(5);

  const getRewardMultiplier = (level: string) => {
    switch (level.toLowerCase()) {
      case "diamante":
        return 2.0;
      case "platino":
        return 1.5;
      case "oro":
        return 1.2;
      case "plata":
        return 1.0;
      default:
        return 0.8;
    }
  };

  const getRachaBonus = (racha: number) => {
    if (racha >= 20) return 100;
    if (racha >= 15) return 75;
    if (racha >= 10) return 50;
    if (racha >= 5) return 25;
    return 0;
  };

  const baseReward = 50;
  const multiplier = getRewardMultiplier(level);

  const calculateFutureRewards = () => {
    const results = [];
    for (let i = 1; i <= futurePayments; i++) {
      const newRacha = currentConsecutivePayments + i;
      const bonus = getRachaBonus(newRacha);
      const reward = Math.round(baseReward * multiplier + bonus);
      results.push({
        payment: i,
        racha: newRacha,
        reward,
        bonus,
      });
    }
    return results;
  };

  const futureRewards = calculateFutureRewards();
  const totalRewards = futureRewards.reduce((sum, r) => sum + r.reward, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Calculadora de Recompensas</h3>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Racha Actual</p>
            <p className="text-2xl font-bold text-indigo-600">{currentConsecutivePayments}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Nivel</p>
            <p className="text-2xl font-bold text-indigo-600">{level}</p>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pagos Futuros a Calcular
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={futurePayments}
            onChange={(e) => setFuturePayments(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Tabla compacta con scroll */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Pago
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Racha
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Bonus
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Recompensa
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {futureRewards.map((item) => (
                <tr
                  key={item.payment}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-900">#{item.payment}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{item.racha} pagos</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.bonus > 0 ? (
                      <span className="text-sm font-semibold text-green-600">+{item.bonus}</span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <span className="text-sm font-bold text-indigo-600">{item.reward} mcCOP</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-900">Total de Recompensas</span>
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-3xl font-bold text-green-700">{totalRewards} mcCOP</p>
        <p className="text-sm text-green-700 mt-1">
          Recompensas estimadas por {futurePayments} pagos consecutivos
        </p>
      </div>
    </div>
  );
}

