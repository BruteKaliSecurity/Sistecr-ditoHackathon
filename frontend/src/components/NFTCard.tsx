"use client";

import { CreditCard, Shield, TrendingUp, Award } from "lucide-react";

interface NFTCardProps {
  tokenId?: string;
  score: number;
  level: string;
  isDemoMode?: boolean;
}

export function NFTCard({ tokenId, score, level, isDemoMode = false }: NFTCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "diamante":
        return "from-blue-500 to-cyan-500";
      case "platino":
        return "from-purple-500 to-pink-500";
      case "oro":
        return "from-yellow-400 to-orange-500";
      case "plata":
        return "from-gray-400 to-gray-600";
      default:
        return "from-orange-400 to-orange-600";
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-indigo-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-900">Pasaporte Financiero NFT</h3>
        </div>
        <div className="px-3 py-1 bg-indigo-100 rounded-full">
          <span className="text-xs font-semibold text-indigo-700">#{tokenId || "DEMO"}</span>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${getLevelColor(level)} rounded-lg p-6 mb-4 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Nivel Actual</p>
            <p className="text-2xl font-bold">{level}</p>
          </div>
          <Award className="w-10 h-10 opacity-80" />
        </div>
        <div className="pt-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80 mb-1">Payment Score</p>
              <p className="text-3xl font-bold">{score}</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-2 mb-1">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-gray-700">Verificado</span>
          </div>
          <p className="text-xs text-gray-600">En Blockchain</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-2 mb-1">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700">Portátil</span>
          </div>
          <p className="text-xs text-gray-600">Multi-plataforma</p>
        </div>
      </div>

      {isDemoMode && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Modo Demo:</strong> Conecta tu wallet para ver tu NFT real
          </p>
        </div>
      )}
    </div>
  );
}

