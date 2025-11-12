"use client";

import { Trophy, Award, Medal, Star, CheckCircle2, Lock } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: number;
  icon: typeof Trophy;
  color: string;
}

interface AchievementsProps {
  consecutivePayments: number;
  isDemoMode?: boolean;
}

export function Achievements({ consecutivePayments, isDemoMode = false }: AchievementsProps) {
  const achievements: Achievement[] = [
    {
      id: "1",
      name: "Primer Paso",
      description: "Completa tu primer pago consecutivo",
      requirement: 1,
      icon: Trophy,
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "2",
      name: "Racha de 5",
      description: "Alcanza 5 pagos consecutivos",
      requirement: 5,
      icon: Medal,
      color: "from-gray-400 to-gray-600",
    },
    {
      id: "3",
      name: "Decena Perfecta",
      description: "Alcanza 10 pagos consecutivos",
      requirement: 10,
      icon: Award,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: "4",
      name: "Quincena",
      description: "Alcanza 15 pagos consecutivos",
      requirement: 15,
      icon: Star,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "5",
      name: "Veintena",
      description: "Alcanza 20 pagos consecutivos",
      requirement: 20,
      icon: Trophy,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "6",
      name: "Maestro",
      description: "Alcanza 30 pagos consecutivos",
      requirement: 30,
      icon: Star,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "7",
      name: "Leyenda",
      description: "Alcanza 50 pagos consecutivos",
      requirement: 50,
      icon: Trophy,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const getAchievementStatus = (requirement: number) => {
    if (consecutivePayments >= requirement) {
      return "unlocked";
    }
    if (consecutivePayments >= requirement - 2) {
      return "almost";
    }
    return "locked";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Logros y Conquistas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const status = getAchievementStatus(achievement.requirement);
          const Icon = achievement.icon;
          const progress = Math.min((consecutivePayments / achievement.requirement) * 100, 100);

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                status === "unlocked"
                  ? `bg-gradient-to-br ${achievement.color} text-white border-transparent shadow-lg`
                  : status === "almost"
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  status === "unlocked" ? "bg-white/20" : "bg-gray-200"
                }`}>
                  {status === "unlocked" ? (
                    <Icon className="w-6 h-6 text-white" />
                  ) : status === "almost" ? (
                    <Icon className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                {status === "unlocked" && (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
              </div>

              <h4 className={`font-bold mb-1 ${
                status === "unlocked" ? "text-white" : "text-gray-900"
              }`}>
                {achievement.name}
              </h4>
              <p className={`text-sm mb-3 ${
                status === "unlocked" ? "text-white/90" : "text-gray-600"
              }`}>
                {achievement.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={status === "unlocked" ? "text-white/80" : "text-gray-600"}>
                    Requisito: {achievement.requirement} pagos
                  </span>
                  <span className={status === "unlocked" ? "text-white" : "text-gray-700 font-semibold"}>
                    {consecutivePayments} / {achievement.requirement}
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${
                  status === "unlocked" ? "bg-white/30" : "bg-gray-200"
                }`}>
                  <div
                    className={`h-2 rounded-full transition-all ${
                      status === "unlocked"
                        ? "bg-white"
                        : status === "almost"
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-indigo-900">
          <strong>Progreso Total:</strong> {consecutivePayments} pagos consecutivos completados
        </p>
      </div>
    </div>
  );
}

