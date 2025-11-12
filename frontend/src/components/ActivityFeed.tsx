"use client";

import { Clock, CheckCircle2, Gift, Trophy, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Activity {
  id: string;
  type: "payment" | "reward" | "achievement" | "score";
  title: string;
  description: string;
  timestamp: Date;
  amount?: number;
}

interface ActivityFeedProps {
  isDemoMode?: boolean;
}

export function ActivityFeed({ isDemoMode = false }: ActivityFeedProps) {
  // Datos mock para demo
  const demoActivities: Activity[] = [
    {
      id: "1",
      type: "payment",
      title: "Pago Registrado",
      description: "Pago de $150,000 COP registrado exitosamente",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      amount: 150000,
    },
    {
      id: "2",
      type: "reward",
      title: "Recompensa Recibida",
      description: "Has ganado 50 mcCOP por pago puntual",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      amount: 50,
    },
    {
      id: "3",
      type: "achievement",
      title: "Logro Desbloqueado",
      description: "Badge de Oro alcanzado",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      type: "score",
      title: "Score Actualizado",
      description: "Tu score aumentó a 850 puntos",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "5",
      type: "payment",
      title: "Pago Registrado",
      description: "Pago de $200,000 COP registrado exitosamente",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      amount: 200000,
    },
  ];

  const activities = isDemoMode ? demoActivities : [];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "reward":
        return <Gift className="w-5 h-5 text-yellow-500" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-purple-500" />;
      case "score":
        return <ArrowRight className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-green-50 border-green-200";
      case "reward":
        return "bg-yellow-50 border-yellow-200";
      case "achievement":
        return "bg-purple-50 border-purple-200";
      case "score":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Hace ${days} día${days > 1 ? "s" : ""}`;
    if (hours > 0) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
    return "Hace unos minutos";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Actividad Reciente</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${getActivityColor(
                activity.type
              )} transition-all hover:shadow-md`}
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  {activity.amount && (
                    <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap">
                      {activity.type === "payment"
                        ? `$${activity.amount.toLocaleString("es-CO")}`
                        : `${activity.amount} mcCOP`}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                <p className="text-xs text-gray-400">{formatTime(activity.timestamp)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No hay actividad reciente</p>
          </div>
        )}
      </div>
    </div>
  );
}

