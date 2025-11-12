"use client";

import { Shield, Award, TrendingUp, Star, Sparkles } from "lucide-react";

interface ReputationNFTProps {
  score: number;
  level: string;
  consecutivePayments: number;
  tokenId?: string;
  isDemoMode?: boolean;
}

export function ReputationNFT({
  score,
  level,
  consecutivePayments,
  tokenId,
  isDemoMode = false,
}: ReputationNFTProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "diamante":
        return "from-blue-500 via-cyan-500 to-blue-600";
      case "platino":
        return "from-purple-500 via-pink-500 to-purple-600";
      case "oro":
        return "from-yellow-400 via-orange-500 to-yellow-500";
      case "plata":
        return "from-gray-400 via-gray-500 to-gray-600";
      default:
        return "from-orange-400 via-orange-500 to-orange-600";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "diamante":
        return <Sparkles className="w-12 h-12" />;
      case "platino":
        return <Star className="w-12 h-12" />;
      case "oro":
        return <Award className="w-12 h-12" />;
      default:
        return <Shield className="w-12 h-12" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-indigo-200 overflow-hidden relative">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-900">NFT de Reputación</h3>
          </div>
          {tokenId && (
            <div className="px-3 py-1 bg-indigo-100 rounded-full">
              <span className="text-xs font-semibold text-indigo-700">#{tokenId}</span>
            </div>
          )}
        </div>

        {/* NFT Card Principal */}
        <div className={`bg-gradient-to-br ${getLevelColor(level)} rounded-xl p-8 text-white mb-4 shadow-xl transform hover:scale-105 transition-transform`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm opacity-90 mb-1">Nivel de Reputación</p>
              <p className="text-3xl font-bold">{level}</p>
            </div>
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
              {getLevelIcon(level)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-xs opacity-80 mb-1">Payment Score</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-xs opacity-80 mb-1">Racha de Pagos</p>
              <p className="text-2xl font-bold">{consecutivePayments}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/20">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 opacity-80" />
              <p className="text-sm opacity-90">Pasaporte Financiero Verificado</p>
            </div>
          </div>
        </div>

        {/* Información Adicional */}
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
              <Award className="w-4 h-4 text-purple-600" />
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
    </div>
  );
}

