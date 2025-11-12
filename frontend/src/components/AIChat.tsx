"use client";

import { MessageCircle, Send, Bot, User as UserIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface AIChatProps {
  score: number;
  consecutivePayments: number;
  rewards: number;
  level: string;
  isDemoMode?: boolean;
}

export function AIChat({
  score,
  consecutivePayments,
  rewards,
  level,
  isDemoMode = false,
}: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "¡Hola! Soy tu asistente de IA. Puedo ayudarte con información sobre tu perfil, score, recompensas y más. ¿En qué puedo ayudarte?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("score") || lowerMessage.includes("puntuación")) {
      return `Tu Payment Score actual es ${score} puntos. Estás en el nivel ${level}. Para mejorarlo, mantén tus pagos puntuales y aumenta tu racha de pagos consecutivos.`;
    }

    if (lowerMessage.includes("recompensa") || lowerMessage.includes("mcCOP") || lowerMessage.includes("cCOP")) {
      return `Tienes ${rewards} mcCOP acumulados. Las recompensas se otorgan por cada pago puntual y aumentan según tu nivel (${level}) y tu racha de pagos (${consecutivePayments}).`;
    }

    if (lowerMessage.includes("racha") || lowerMessage.includes("pagos consecutivos")) {
      return `Tienes ${consecutivePayments} pagos consecutivos. ¡Excelente trabajo! Mantén esta racha para obtener más recompensas y mejorar tu score.`;
    }

    if (lowerMessage.includes("nivel") || lowerMessage.includes("level")) {
      return `Estás en el nivel ${level}. Los niveles se basan en tu Payment Score: Bronce (0-599), Plata (600-749), Oro (750-849), Platino (850-949), y Diamante (950+).`;
    }

    if (lowerMessage.includes("crédito") || lowerMessage.includes("prestamo")) {
      return `Con tu score de ${score}, puedes acceder a créditos pre-aprobados. Revisa la sección de Línea de Crédito en tu dashboard para más detalles.`;
    }

    if (lowerMessage.includes("hola") || lowerMessage.includes("hi") || lowerMessage.includes("buenos días")) {
      return "¡Hola! ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre tu score, recompensas, nivel, créditos y más.";
    }

    if (lowerMessage.includes("ayuda") || lowerMessage.includes("help")) {
      return "Puedo ayudarte con: información sobre tu Payment Score, recompensas mcCOP, nivel actual, racha de pagos, créditos pre-aprobados, y predicciones de score. ¿Qué te gustaría saber?";
    }

    return "Entiendo tu pregunta. Basándome en tu perfil actual, puedo ayudarte con información sobre tu score, recompensas, nivel y créditos. ¿Puedes ser más específico?";
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: getBotResponse(inputText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">Asistente IA</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.type === "user"
                      ? "bg-indigo-600"
                      : "bg-gray-200"
                  }`}
                >
                  {message.type === "user" ? (
                    <UserIcon className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-700" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

