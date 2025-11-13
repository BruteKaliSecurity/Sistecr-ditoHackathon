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
import { WelcomeCard } from "@/components/WelcomeCard";
import { RecommendedActions } from "@/components/RecommendedActions";
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
    <div className="min-h-screen" style={{ backgroundColor: '#0A0F1E' }}>
      {/* Header Mejorado */}
      <header className="border-b border-white/5" style={{ backgroundColor: '#0A0F1E' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 255, 135, 0.1)', border: '1px solid rgba(0, 255, 135, 0.2)' }}>
                <CreditCard className="w-6 h-6" style={{ color: '#00FF87' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  <span style={{ color: '#00FF87' }}>Credi</span>Pass
                </h1>
                <p className="text-xs" style={{ color: '#8B92A7' }}>Tu pasaporte financiero digital. Portátil y verificable en cualquier comercio.</p>
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
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '1px solid #00FF87',
                  color: '#00FF87'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 135, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title="Ver Perfil"
              >
                <User className="w-4 h-4" />
                <span className="font-semibold">Perfil</span>
              </button>

              {isConnected ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#131B2E', border: '1px solid rgba(139, 146, 167, 0.1)' }}>
                    <Wallet className="w-5 h-5" style={{ color: '#8B92A7' }} />
                    <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 0, 0, 0.5)',
                      color: '#ff4444'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-semibold">Desconectar</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConnect}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
                  style={{ 
                    background: 'linear-gradient(135deg, #00FF87 0%, #00D9FF 100%)',
                    color: '#0A0F1E',
                    boxShadow: '0 4px 20px rgba(0, 255, 135, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 255, 135, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 255, 135, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Conectar MetaMask</span>
                </button>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300"
              style={{ color: '#8B92A7' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00FF87';
                e.currentTarget.style.backgroundColor = 'rgba(0, 255, 135, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8B92A7';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 space-y-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div className="flex items-center justify-center">
                <NotificationsPanel isDemoMode={isDemoMode} />
              </div>
              <button
                onClick={() => {
                  setProfileOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '1px solid #00FF87',
                  color: '#00FF87'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 135, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <User className="w-4 h-4" />
                <span className="font-semibold">Perfil</span>
              </button>
              {isConnected ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#131B2E', border: '1px solid rgba(139, 146, 167, 0.1)' }}>
                    <Wallet className="w-5 h-5" style={{ color: '#8B92A7' }} />
                    <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 0, 0, 0.5)',
                      color: '#ff4444'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-semibold">Desconectar</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
                  style={{ 
                    background: 'linear-gradient(135deg, #00FF87 0%, #00D9FF 100%)',
                    color: '#0A0F1E',
                    boxShadow: '0 4px 20px rgba(0, 255, 135, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 255, 135, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 255, 135, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
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
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#131B2E', borderLeft: '4px solid #00FF87', border: '1px solid rgba(0, 255, 135, 0.1)' }}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span style={{ color: '#00FF87' }}>⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm" style={{ color: '#8B92A7' }}>
                  <strong style={{ color: '#FFFFFF' }}>Modo Demo:</strong> Conecta tu wallet de MetaMask para
                  ver tus datos reales desde la blockchain.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Card y Stats Cards Mejoradas */}
        <div className="mb-8">
          <WelcomeCard
            score={currentScore}
            level={getLevel(currentScore)}
            consecutivePayments={consecutivePayments}
            isDemoMode={isDemoMode}
          />
        </div>

        {/* Stats Cards Compactas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div 
            className="rounded-xl p-5 transition-all duration-300 backdrop-blur-sm"
            style={{ 
              backgroundColor: '#1A2332',
              border: '1px solid rgba(0, 255, 135, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.3)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 135, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 font-medium" style={{ color: '#8B92A7' }}>Payment Score</p>
                <p className="text-3xl font-bold" style={{ color: '#00FF87' }}>
                  {currentScore}
                </p>
                <p className="text-xs mt-1" style={{ color: '#8B92A7' }}>Nivel {getLevel(currentScore)}</p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(0, 255, 135, 0.1)' }}>
                <TrendingUp className="w-7 h-7" style={{ color: '#00FF87' }} />
              </div>
            </div>
          </div>

          <div 
            className="rounded-xl p-5 transition-all duration-300 backdrop-blur-sm"
            style={{ 
              backgroundColor: '#1A2332',
              border: '1px solid rgba(0, 255, 135, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.3)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 135, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 font-medium" style={{ color: '#8B92A7' }}>
                  Pagos Consecutivos
                </p>
                <p className="text-3xl font-bold" style={{ color: '#00FF87' }}>
                  {consecutivePayments}
                </p>
                <p className="text-xs mt-1" style={{ color: '#8B92A7' }}>Racha activa</p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(0, 255, 135, 0.1)' }}>
                <CreditCard className="w-7 h-7" style={{ color: '#00FF87' }} />
              </div>
            </div>
          </div>

          <div 
            className="rounded-xl p-5 transition-all duration-300 backdrop-blur-sm"
            style={{ 
              backgroundColor: '#1A2332',
              border: '1px solid rgba(0, 255, 135, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.3)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 135, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 font-medium" style={{ color: '#8B92A7' }}>Recompensas</p>
                <p className="text-3xl font-bold" style={{ color: '#00FF87' }}>
                  {rewards}
                </p>
                <p className="text-xs mt-1" style={{ color: '#8B92A7' }}>mcCOP acumulados</p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(0, 255, 135, 0.1)' }}>
                <Trophy className="w-7 h-7" style={{ color: '#00FF87' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Perfil */}
        {profileOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              style={{ backgroundColor: 'rgba(10, 15, 30, 0.8)', backdropFilter: 'blur(4px)' }}
              onClick={() => setProfileOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm" style={{ backgroundColor: '#1A2332', border: '1px solid rgba(0, 255, 135, 0.2)', boxShadow: '0 0 40px rgba(0, 255, 135, 0.2)' }}>
                {/* Header del Modal */}
                <div className="sticky top-0 px-6 py-4 rounded-t-xl flex items-center justify-between z-10" style={{ backgroundColor: '#131B2E', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <h2 className="text-2xl font-bold" style={{ color: '#00FF87', letterSpacing: '-0.02em' }}>Perfil de Usuario</h2>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="p-2 rounded-lg transition-all duration-300"
                    style={{ color: '#8B92A7' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#00FF87';
                      e.currentTarget.style.backgroundColor = 'rgba(0, 255, 135, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#8B92A7';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
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
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          badges={{
            rewards: consecutivePayments >= 5 ? 1 : undefined,
            achievements: consecutivePayments >= 10 ? 1 : undefined,
            activity: undefined,
          }}
        >
          {/* Tab: Resumen (Overview) */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Primera Fila - Acciones Recomendadas y NFT */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecommendedActions
                  score={currentScore}
                  level={getLevel(currentScore)}
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
                <NFTCard
                  tokenId={isDemoMode ? "DEMO-001" : undefined}
                  score={currentScore}
                  level={getLevel(currentScore)}
                  isDemoMode={isDemoMode}
                />
              </div>

              {/* Segunda Fila - Progress y Comparación */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgressChart
                  currentScore={currentScore}
                  targetScore={1000}
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
                <ComparisonCard
                  currentScore={currentScore}
                  averageScore={820}
                  isDemoMode={isDemoMode}
                />
              </div>

              {/* Tercera Fila - Acciones Rápidas y Predicciones */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickActions isDemoMode={isDemoMode} />
                <ScorePrediction
                  currentScore={currentScore}
                  consecutivePayments={consecutivePayments}
                  isDemoMode={isDemoMode}
                />
              </div>

              {/* Cuarta Fila - Gráfico de Tendencias */}
              <div className="grid grid-cols-1 gap-6">
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

