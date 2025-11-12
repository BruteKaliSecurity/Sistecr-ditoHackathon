"use client";

import { Trophy, Medal, Award, TrendingUp, Users } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  address: string;
  score: number;
  consecutivePayments: number;
  rewards: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentUserScore: number;
  currentUserAddress: string;
  isDemoMode?: boolean;
}

export function Leaderboard({
  currentUserScore,
  currentUserAddress,
  isDemoMode = false,
}: LeaderboardProps) {
  // Datos mock para demo
  const demoUsers: LeaderboardUser[] = [
    {
      rank: 1,
      address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      score: 950,
      consecutivePayments: 15,
      rewards: 1250,
      isCurrentUser: true,
    },
    {
      rank: 2,
      address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      score: 920,
      consecutivePayments: 12,
      rewards: 980,
    },
    {
      rank: 3,
      address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      score: 890,
      consecutivePayments: 10,
      rewards: 850,
    },
    {
      rank: 4,
      address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
      score: 870,
      consecutivePayments: 9,
      rewards: 720,
    },
    {
      rank: 5,
      address: "0x9965507D1a55bcC2695C58ba16FB37d819F0E4DF",
      score: 850,
      consecutivePayments: 8,
      rewards: 650,
    },
  ];

  const users = isDemoMode ? demoUsers : [];
  const averageScore =
    users.length > 0
      ? Math.round(users.reduce((sum, u) => sum + u.score, 0) / users.length)
      : 0;
  const currentUserRank = users.find((u) => u.isCurrentUser)?.rank || 0;
  const percentile = currentUserRank
    ? Math.round(((users.length - currentUserRank + 1) / users.length) * 100)
    : 0;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-900">Ranking Global</h3>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Tu posición</div>
          <div className="text-2xl font-bold text-indigo-600">
            #{currentUserRank || "N/A"}
          </div>
        </div>
      </div>

      {/* Comparativa con promedio */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">Tu Score</div>
            <div className="text-2xl font-bold text-blue-600">
              {currentUserScore}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Promedio</div>
            <div className="text-2xl font-bold text-gray-700">{averageScore}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Percentil</div>
            <div className="text-2xl font-bold text-green-600">
              {percentile}%
              <TrendingUp className="w-4 h-4 inline-block ml-1" />
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex items-center space-x-2 text-sm">
            {currentUserScore > averageScore ? (
              <>
                <span className="text-green-600 font-semibold">
                  +{currentUserScore - averageScore} puntos sobre el promedio
                </span>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </>
            ) : (
              <>
                <span className="text-orange-600 font-semibold">
                  {currentUserScore - averageScore} puntos del promedio
                </span>
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lista de ranking */}
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
              user.isCurrentUser
                ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-400 shadow-md"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-shrink-0">
                {getRankIcon(user.rank)}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`font-semibold truncate ${
                    user.isCurrentUser ? "text-indigo-700" : "text-gray-900"
                  }`}
                >
                  {user.isCurrentUser
                    ? "Tú"
                    : `${user.address.slice(0, 6)}...${user.address.slice(-4)}`}
                  {user.isCurrentUser && (
                    <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                      Tú
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {user.consecutivePayments} pagos consecutivos
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-lg font-bold ${
                  user.isCurrentUser ? "text-indigo-600" : "text-gray-700"
                }`}
              >
                {user.score}
              </div>
              <div className="text-xs text-gray-500">
                {user.rewards} mcCOP
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No hay datos de ranking disponibles</p>
        </div>
      )}
    </div>
  );
}

