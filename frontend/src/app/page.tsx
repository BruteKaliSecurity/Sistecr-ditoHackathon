"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { createConfig, WagmiProvider, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Leaderboard } from "@/components/Leaderboard";
import { AIPrediction } from "@/components/AIPrediction";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { SharePanel } from "@/components/SharePanel";
import { NFTCard } from "@/components/NFTCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { ProgressChart } from "@/components/ProgressChart";
import { UserProfile } from "@/components/UserProfile";
import { RewardsTable } from "@/components/RewardsTable";
import { CreditLine } from "@/components/CreditLine";
import { ReputationNFT } from "@/components/ReputationNFT";
import { RewardsCalculator } from "@/components/RewardsCalculator";
import { Achievements } from "@/components/Achievements";
import { ScorePrediction } from "@/components/ScorePrediction";
import { AIChat } from "@/components/AIChat";
import { ScoreTrendChart } from "@/components/ScoreTrendChart";
import { QuickActions } from "@/components/QuickActions";
import { ComparisonCard } from "@/components/ComparisonCard";
import { GoalsTracker } from "@/components/GoalsTracker";
import { StatsSummary } from "@/components/StatsSummary";
import { DashboardTabs } from "@/components/DashboardTabs";
import { Wallet, LogOut, CreditCard, Trophy, TrendingUp, Menu, X, User } from "lucide-react";

// Configurar wagmi para localhost
const localhostChain = {
  id: 31337,
  name: "Hardhat Local",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
  },
  blockExplorers: {
    default: { name: "Local", url: "http://localhost:8545" },
  },
} as const;

const config = createConfig({
  chains: [localhostChain, mainnet],
  connectors: [metaMask()],
  transports: {
    [localhostChain.id]: http("http://localhost:8545"),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function Dashboard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [currentScore, setCurrentScore] = useState(850);
  const [consecutivePayments, setConsecutivePayments] = useState(5);
  const [rewards, setRewards] = useState(1250);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getLevel = (score: number) => {
    if (score >= 950) return "Diamante";
    if (score >= 850) return "Platino";
    if (score >= 750) return "Oro";
    if (score >= 600) return "Plata";
    return "Bronce";
  };

  useEffect(() => {
    setIsDemoMode(!isConnected);
    if (isConnected && address) {
      // Aquí se cargarían los datos reales desde los contratos
      // Por ahora usamos datos demo
    }
  }, [isConnected, address]);

  const handleConnect = () => {
    if (config.connectors[0]) {
      connect({ connector: config.connectors[0] });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Mejorado */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CrediPass</h1>
                <p className="text-xs text-white/80">Tu pasaporte financiero digital. Portátil y verificable en cualquier comercio.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              {/* Botón de Notificaciones */}
              <div className="relative">
                <NotificationsPanel isDemoMode={isDemoMode} />
              </div>

              {/* Botón de Compartir Logros */}
              <div className="relative">
                <SharePanel
                  score={currentScore}
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
              </div>

              {/* Botón de Perfil */}
              <button
                onClick={() => setProfileOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors shadow-md"
                title="Ver Perfil"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </button>

              {isConnected ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Wallet className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Desconectar</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConnect}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors shadow-md font-semibold"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Conectar MetaMask</span>
                </button>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-2">
              <div className="flex items-center justify-center">
                <NotificationsPanel isDemoMode={isDemoMode} />
              </div>
              <button
                onClick={() => {
                  setProfileOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </button>
              {isConnected ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Wallet className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Desconectar</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Conectar MetaMask</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Mode Banner */}
        {isDemoMode && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-yellow-400">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Modo Demo:</strong> Conecta tu wallet de MetaMask para
                  ver tus datos reales desde la blockchain.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards Mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border-2 border-blue-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Payment Score</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {currentScore}
                </p>
                <p className="text-xs text-gray-500 mt-1">Nivel {getLevel(currentScore)}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-6 border-2 border-green-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">
                  Pagos Consecutivos
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {consecutivePayments}
                </p>
                <p className="text-xs text-gray-500 mt-1">Racha activa</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg p-6 border-2 border-yellow-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Recompensas</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {rewards}
                </p>
                <p className="text-xs text-gray-500 mt-1">mcCOP acumulados</p>
              </div>
              <div className="p-3 bg-yellow-500 rounded-full">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Perfil */}
        {profileOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setProfileOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header del Modal */}
                <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
                  <h2 className="text-2xl font-bold text-white">Perfil de Usuario</h2>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Contenido del Perfil */}
                <div className="p-6">
                  <UserProfile
                    address={address}
                    isDemoMode={isDemoMode}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard con Tabs */}
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab}>
          {/* Tab: Resumen (Overview) */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Primera Fila - NFT y Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NFTCard
                  tokenId={isDemoMode ? "DEMO-001" : undefined}
                  score={currentScore}
                  level={getLevel(currentScore)}
                  isDemoMode={isDemoMode}
                />
                <ProgressChart
                  currentScore={currentScore}
                  targetScore={1000}
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
              </div>

              {/* Segunda Fila - Acciones y Comparación */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickActions isDemoMode={isDemoMode} />
                <ComparisonCard
                  currentScore={currentScore}
                  averageScore={820}
                  isDemoMode={isDemoMode}
                />
              </div>

              {/* Tercera Fila - Predicciones */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScorePrediction
                  currentScore={currentScore}
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
                <ScoreTrendChart
                  currentScore={currentScore}
                  isDemoMode={isDemoMode}
                />
              </div>
            </div>
          )}

          {/* Tab: Recompensas */}
          {activeTab === "rewards" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RewardsTable
                  level={getLevel(currentScore)}
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
                <RewardsCalculator
                  level={getLevel(currentScore)}
                  currentConsecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
              </div>
              <StatsSummary
                score={currentScore}
                consecutivePayments={consecutivePayments}
                rewards={rewards}
                isDemoMode={isDemoMode}
              />
            </div>
          )}

          {/* Tab: Créditos */}
          {activeTab === "credits" && (
            <div className="space-y-6">
              <CreditLine
                score={currentScore}
                isDemoMode={isDemoMode}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ComparisonCard
                  currentScore={currentScore}
                  averageScore={820}
                  isDemoMode={isDemoMode}
                />
                <ScorePrediction
              currentScore={currentScore}
              consecutivePayments={consecutivePayments}
              isDemoMode={isDemoMode}
            />
              </div>
            </div>
          )}

          {/* Tab: Logros */}
          {activeTab === "achievements" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReputationNFT
                  score={currentScore}
                  level={getLevel(currentScore)}
                  consecutivePayments={consecutivePayments}
                  tokenId={isDemoMode ? "DEMO-001" : undefined}
                  isDemoMode={isDemoMode}
                />
                <Achievements
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
              </div>
              <GoalsTracker
                currentScore={currentScore}
                consecutivePayments={consecutivePayments}
                rewards={rewards}
                isDemoMode={isDemoMode}
              />
            </div>
          )}

          {/* Tab: Estadísticas */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScoreTrendChart
                  currentScore={currentScore}
                  isDemoMode={isDemoMode}
                />
                <ComparisonCard
                  currentScore={currentScore}
                  averageScore={820}
                  isDemoMode={isDemoMode}
                />
              </div>
              <StatsSummary
                score={currentScore}
                consecutivePayments={consecutivePayments}
                rewards={rewards}
                isDemoMode={isDemoMode}
              />
              <ProgressChart
                currentScore={currentScore}
                targetScore={1000}
                consecutivePayments={consecutivePayments}
                isDemoMode={isDemoMode}
              />
            </div>
          )}

          {/* Tab: Actividad */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <ActivityFeed isDemoMode={isDemoMode} />
            <Leaderboard
              currentUserScore={currentScore}
              currentUserAddress={address || "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"}
              isDemoMode={isDemoMode}
            />
          </div>
          )}
        </DashboardTabs>
      </main>

      {/* AI Chat Bot */}
      <AIChat
              score={currentScore}
              consecutivePayments={consecutivePayments}
        rewards={rewards}
        level={getLevel(currentScore)}
              isDemoMode={isDemoMode}
            />
    </div>
  );
}

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

