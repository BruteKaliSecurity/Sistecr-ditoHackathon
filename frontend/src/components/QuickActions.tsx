"use client";

import { Zap, CreditCard, Download, Settings, HelpCircle, Bell } from "lucide-react";

interface QuickActionsProps {
  isDemoMode?: boolean;
}

export function QuickActions({ isDemoMode = false }: QuickActionsProps) {
  const actions = [
    {
      icon: CreditCard,
      label: "Registrar Pago",
      color: "from-blue-500 to-indigo-600",
      onClick: () => {
        // Acción para registrar pago
        alert("Función de registrar pago próximamente");
      },
    },
    {
      icon: Download,
      label: "Exportar Reporte",
      color: "from-green-500 to-emerald-600",
      onClick: () => {
        // Acción para exportar
        alert("Función de exportar reporte próximamente");
      },
    },
    {
      icon: Bell,
      label: "Configurar Alertas",
      color: "from-yellow-500 to-orange-600",
      onClick: () => {
        // Acción para configurar alertas
        alert("Función de configurar alertas próximamente");
      },
    },
    {
      icon: HelpCircle,
      label: "Centro de Ayuda",
      color: "from-purple-500 to-pink-600",
      onClick: () => {
        // Acción para ayuda
        alert("Función de centro de ayuda próximamente");
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Acciones Rápidas</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`p-4 bg-gradient-to-br ${action.color} text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all flex flex-col items-center space-y-2`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-semibold">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

