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

export async function callChatAPI(message: string, isFirstPrompt: boolean, entityId: string): Promise<string> {
  console.log("[v0] Calling API with:", { message, isFirstPrompt, entityId })

  try {
    const endpoint = isFirstPrompt ? "/v1/chat/initiate" : "/v1/chat/continue"
    const payload = isFirstPrompt ? { entity_id: entityId } : { message, entity_id: entityId }

    console.log("[v0] API endpoint:", `${API_BASE_URL}${endpoint}`)
    console.log("[v0] API payload:", payload)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("[v0] API response status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] API error response:", errorData)
      throw new ChatAPIError(`API request failed: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    console.log("[v0] API response data:", data)

    // Handle different response formats
    const responseText = data.response || data.message || data.text || JSON.stringify(data)
    return responseText
  } catch (error) {
    console.error("[v0] Error in callChatAPI:", error)
    if (error instanceof ChatAPIError) {
      throw error
    }
    throw new ChatAPIError(error instanceof Error ? error.message : "Unknown error occurred while calling API")
  }
}
