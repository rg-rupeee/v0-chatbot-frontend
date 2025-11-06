"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface ChatSession {
  id: string
  title: string
  messages: any[]
  entityId?: string
  createdAt: Date
}

interface ChatHistoryProps {
  sessions: ChatSession[]
  currentSessionId: string | null
  onSelectSession: (sessionId: string) => void
}

export default function ChatHistory({ sessions, currentSessionId, onSelectSession }: ChatHistoryProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground px-2 py-1">CHAT HISTORY</p>
        {sessions.length === 0 ? (
          <p className="text-xs text-muted-foreground px-2 py-2">No chats yet</p>
        ) : (
          sessions.map((session) => (
            <Button
              key={session.id}
              variant={currentSessionId === session.id ? "default" : "ghost"}
              className="w-full justify-start text-left h-auto py-2 px-3"
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.title}</p>
                <p className="text-xs text-muted-foreground">{session.createdAt.toLocaleDateString()}</p>
              </div>
            </Button>
          ))
        )}
      </div>
    </ScrollArea>
  )
}
