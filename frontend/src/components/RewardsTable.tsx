"use client";

import { Gift, Trophy, TrendingUp, Award } from "lucide-react";

interface RewardsTableProps {
  level: string;
  consecutivePayments: number;
  isDemoMode?: boolean;
}

export function RewardsTable({ level, consecutivePayments, isDemoMode = false }: RewardsTableProps) {
  // Tabla de recompensas basada en nivel y racha
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
        return 0.8; // Bronce
    }
  };

  const getRachaBonus = (racha: number) => {
    if (racha >= 20) return 100;
    if (racha >= 15) return 75;
    if (racha >= 10) return 50;
    if (racha >= 5) return 25;
    return 0;
  };

  const baseReward = 50; // mcCOP base por pago
  const multiplier = getRewardMultiplier(level);
  const rachaBonus = getRachaBonus(consecutivePayments);
  const totalReward = Math.round(baseReward * multiplier + rachaBonus);

  const rewardsData = [
    { racha: 1, base: baseReward, multiplier: multiplier, bonus: 0, total: Math.round(baseReward * multiplier) },
    { racha: 5, base: baseReward, multiplier: multiplier, bonus: 25, total: Math.round(baseReward * multiplier + 25) },
    { racha: 10, base: baseReward, multiplier: multiplier, bonus: 50, total: Math.round(baseReward * multiplier + 50) },
    { racha: 15, base: baseReward, multiplier: multiplier, bonus: 75, total: Math.round(baseReward * multiplier + 75) },
    { racha: 20, base: baseReward, multiplier: multiplier, bonus: 100, total: Math.round(baseReward * multiplier + 100) },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Gift className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Tabla de Recompensas cCOP</h3>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Recompensa Actual</span>
          <span className="text-2xl font-bold text-indigo-600">{totalReward} mcCOP</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div>Nivel: {level}</div>
          <div>Multiplicador: {multiplier}x</div>
          <div>Racha: {consecutivePayments}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Racha</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Base</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Multiplicador</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Bonus Racha</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total mcCOP</th>
            </tr>
          </thead>
          <tbody>
            {rewardsData.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  row.racha === consecutivePayments ? "bg-indigo-50" : ""
                }`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {row.racha === consecutivePayments && (
                      <Trophy className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="font-semibold">{row.racha}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{row.base} mcCOP</td>
                <td className="py-3 px-4 text-gray-600">{row.multiplier.toFixed(1)}x</td>
                <td className="py-3 px-4 text-gray-600">+{row.bonus} mcCOP</td>
                <td className="py-3 px-4 text-right font-bold text-indigo-600">{row.total} mcCOP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          <strong>Nota:</strong> Las recompensas se calculan multiplicando la base por el multiplicador de nivel y sumando el bonus por racha.
        </p>
      </div>
    </div>
  );
}

