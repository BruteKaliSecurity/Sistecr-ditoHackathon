"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Gift, 
  CreditCard, 
  Trophy, 
  BarChart3, 
  Activity,
  Home
} from "lucide-react";

interface DashboardTabsProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardTabs({ children, activeTab, onTabChange }: DashboardTabsProps) {
  const tabs = [
    { id: "overview", label: "Resumen", icon: Home },
    { id: "rewards", label: "Recompensas", icon: Gift },
    { id: "credits", label: "Créditos", icon: CreditCard },
    { id: "achievements", label: "Logros", icon: Trophy },
    { id: "analytics", label: "Estadísticas", icon: BarChart3 },
    { id: "activity", label: "Actividad", icon: Activity },
  ];

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-1 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-all
                  ${
                    isActive
                      ? "bg-indigo-600 text-white border-b-2 border-indigo-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {children}
      </div>
    </div>
  );
}

