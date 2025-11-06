"use client"

import { useState } from "react"
import Dashboard from "@/components/dashboard"
import ChatInterface from "@/components/chat-interface"
import SystemPrompt from "@/components/system-prompt"

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "chat" | "system">("dashboard")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setCurrentView("chat")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedOption(null)
  }

  return (
    <main className="h-screen bg-background">
      {currentView === "dashboard" && <Dashboard onSelectOption={handleOptionSelect} />}
      {currentView === "chat" && selectedOption && (
        <ChatInterface
          option={selectedOption}
          onBack={handleBackToDashboard}
          onViewSystemPrompt={() => setCurrentView("system")}
        />
      )}
      {currentView === "system" && <SystemPrompt onBack={() => setCurrentView("chat")} />}
    </main>
  )
}
