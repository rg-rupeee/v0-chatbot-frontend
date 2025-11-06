"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, Settings } from "lucide-react"
import ChatHistory from "./chat-history"
import { mockChatAPI } from "@/lib/mock-api"

interface ChatInterfaceProps {
  option: string
  onBack: () => void
  onViewSystemPrompt: () => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  entityId?: string
  createdAt: Date
}

export default function ChatInterface({ option, onBack, onViewSystemPrompt }: ChatInterfaceProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [entityId, setEntityId] = useState("")
  const [isEntityInputVisible, setIsEntityInputVisible] = useState(true)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentSession = sessions.find((s) => s.id === currentSessionId)
  const messages = currentSession?.messages || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createNewSession = (initialEntityId: string) => {
    const sessionId = Date.now().toString()
    const newSession: ChatSession = {
      id: sessionId,
      title: `Validation - ${initialEntityId}`,
      messages: [],
      entityId: initialEntityId,
      createdAt: new Date(),
    }
    setSessions((prev) => [newSession, ...prev])
    setCurrentSessionId(sessionId)
  }

  const handleEntitySubmit = () => {
    if (entityId.trim()) {
      createNewSession(entityId)
      setIsEntityInputVisible(false)
      setEntityId("")
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !currentSessionId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call mock API
      const response = await mockChatAPI(
        input,
        messages.length === 0, // isFirstPrompt
        currentSession?.entityId || "",
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error calling API:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const setMessages = (updater: (prev: Message[]) => Message[]) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === currentSessionId) {
          return { ...session, messages: updater(session.messages) }
        }
        return session
      }),
    )
  }

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId)
    setIsEntityInputVisible(false)
  }

  const handleNewChat = () => {
    setCurrentSessionId(null)
    setIsEntityInputVisible(true)
    setEntityId("")
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="w-full justify-start text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNewChat} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            + New Chat
          </Button>
        </div>

        {/* Chat History */}
        <ChatHistory sessions={sessions} currentSessionId={currentSessionId} onSelectSession={handleSelectSession} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border bg-card p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Rules Validation</h2>
            <p className="text-sm text-muted-foreground">
              {currentSession?.entityId ? `Entity: ${currentSession.entityId}` : "Select or create a session"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewSystemPrompt}
            className="flex items-center gap-2 bg-transparent"
          >
            <Settings className="w-4 h-4" />
            System Prompt
          </Button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isEntityInputVisible ? (
            <div className="flex items-center justify-center h-full">
              <Card className="p-8 w-full max-w-md">
                <h3 className="text-lg font-bold text-foreground mb-4">Enter Entity ID</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please provide an Entity ID to start the rules validation process.
                </p>
                <div className="space-y-4">
                  <Input
                    placeholder="e.g., entity_12345 or product_001"
                    value={entityId}
                    onChange={(e) => setEntityId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleEntitySubmit()}
                    className="bg-input border-border"
                  />
                  <Button
                    onClick={handleEntitySubmit}
                    disabled={!entityId.trim()}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Start Validation
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <>
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Ready to validate</h3>
                    <p className="text-muted-foreground">
                      Start by asking a question about entity{" "}
                      <span className="font-semibold text-foreground">{currentSession?.entityId}</span>
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none border border-border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none border border-border">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        {!isEntityInputVisible && (
          <div className="border-t border-border bg-card p-4">
            <div className="flex gap-3">
              <Input
                placeholder="Ask about the entity validation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                disabled={isLoading}
                className="bg-input border-border"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
