"use client";

import { Target, CheckCircle2, Clock, TrendingUp } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: Date;
  type: "score" | "payments" | "rewards";
}

interface GoalsTrackerProps {
  currentScore: number;
  consecutivePayments: number;
  rewards: number;
  isDemoMode?: boolean;
}

export function GoalsTracker({
  currentScore,
  consecutivePayments,
  rewards,
  isDemoMode = false,
}: GoalsTrackerProps) {
  // Metas demo
  const demoGoals: Goal[] = [
    {
      id: "1",
      title: "Alcanzar Score 900",
      target: 900,
      current: currentScore,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      type: "score",
    },
    {
      id: "2",
      title: "Completar 10 Pagos Consecutivos",
      target: 10,
      current: consecutivePayments,
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      type: "payments",
    },
    {
      id: "3",
      title: "Acumular 2000 mcCOP",
      target: 2000,
      current: rewards,
      deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      type: "rewards",
    },
  ];

  const goals = isDemoMode ? demoGoals : [];

  const getProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Metas y Objetivos</h3>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = getProgress(goal);
          const daysRemaining = getDaysRemaining(goal.deadline);
          const isCompleted = goal.current >= goal.target;

          return (
            <div
              key={goal.id}
              className={`p-4 rounded-lg border-2 ${
                isCompleted
                  ? "bg-green-50 border-green-300"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <h4 className={`font-semibold ${
                      isCompleted ? "text-green-900" : "text-gray-900"
                    }`}>
                      {goal.title}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 ml-7">
                    <span>
                      {goal.current} / {goal.target}
                    </span>
                    <span>{daysRemaining} días restantes</span>
                  </div>
                </div>
                {isCompleted && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    Completado
                  </span>
                )}
              </div>

              <div className="ml-7">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isCompleted
                        ? "bg-green-500"
                        : progress > 75
                        ? "bg-blue-500"
                        : progress > 50
                        ? "bg-yellow-500"
                        : "bg-orange-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{Math.round(progress)}% completado</span>
                  {!isCompleted && (
                    <span className="text-gray-500">
                      Faltan {goal.target - goal.current} para completar
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors font-semibold text-sm">
        + Crear Nueva Meta
      </button>
    </div>
  );
}

