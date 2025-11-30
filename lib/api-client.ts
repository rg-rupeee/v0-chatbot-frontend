import { processMarkdownContent } from "./markdown-utils"

const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL || "http://localhost:3001"

class ChatAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message)
    this.name = "ChatAPIError"
  }
}

export interface ChatInitiateResponse {
  session_id: string
  response: string
  [key: string]: any
}

export interface ChatContinueResponse {
  response: string
  [key: string]: any
}

export async function callChatAPI(
  message: string,
  isFirstPrompt: boolean,
  entityId: string,
  sessionId?: string,
): Promise<{ response: string; sessionId?: string }> {
  try {
    const endpoint = isFirstPrompt ? "/v1/chat/initiate" : "/v1/chat/continue"
    const payload = isFirstPrompt ? { entity_id: entityId } : { session_id: sessionId, message: message }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new ChatAPIError(`API request failed: ${response.statusText}`, response.status)
    }

    const data = await response.json()

    // Handle different response formats
    let responseText = data.response || data.message || data.text || JSON.stringify(data)

    responseText = processMarkdownContent(responseText)

    const result: { response: string; sessionId?: string } = { response: responseText }
    if (isFirstPrompt && data.session_id) {
      result.sessionId = data.session_id
    }

    return result
  } catch (error) {
    if (error instanceof ChatAPIError) {
      throw error
    }
    throw new ChatAPIError(error instanceof Error ? error.message : "Unknown error occurred while calling API")
  }
}
