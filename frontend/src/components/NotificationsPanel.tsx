"use client";

import { Bell, CheckCircle2, Gift, Trophy, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Notification {
  id: string;
  type: "achievement" | "reward" | "payment" | "warning";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsPanelProps {
  isDemoMode?: boolean;
}

export function NotificationsPanel({ isDemoMode = false }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isDemoMode) {
      // Notificaciones mock para demo
      const demoNotifications: Notification[] = [
        {
          id: "1",
          type: "achievement",
          title: "¡Logro Desbloqueado!",
          message: "Has alcanzado el Badge de Oro con un score de 950",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
        },
        {
          id: "2",
          type: "reward",
          title: "Recompensa Recibida",
          message: "Has ganado 50 mcCOP por tu pago puntual",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          read: false,
        },
        {
          id: "3",
          type: "payment",
          title: "Pago Registrado",
          message: "Tu pago de $150,000 COP ha sido registrado exitosamente",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          read: true,
        },
        {
          id: "4",
          type: "achievement",
          title: "Nueva Racha",
          message: "¡Felicidades! Has completado 15 pagos consecutivos",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          read: true,
        },
      ];
      setNotifications(demoNotifications);
    }
  }, [isDemoMode]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "reward":
        return <Gift className="w-5 h-5 text-green-500" />;
      case "payment":
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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
    <>
      {/* Botón de notificaciones compacto para header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
        title="Notificaciones"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Notificaciones</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-80">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p
                              className={`text-sm font-semibold ${
                                !notification.read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatTime(notification.timestamp)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No hay notificaciones</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

