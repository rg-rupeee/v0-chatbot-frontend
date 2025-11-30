export function processMarkdownContent(content: string): string {
  // Replace escaped newlines (\n) with actual newlines
  return content.replace(/\\n/g, "\n")
}

export function parseMarkdown(content: string): Array<{
  type: "heading" | "bold" | "bullet" | "paragraph"
  text: string
}> {
  const processed = processMarkdownContent(content)
  const lines = processed.split("\n")
  const parsed = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // Check for heading (## or ###)
    if (trimmed.startsWith("### ")) {
      parsed.push({ type: "heading", text: trimmed.substring(4) })
    } else if (trimmed.startsWith("## ")) {
      parsed.push({ type: "heading", text: trimmed.substring(3) })
    } else if (trimmed.startsWith("# ")) {
      parsed.push({ type: "heading", text: trimmed.substring(2) })
    }
    // Check for bullet points
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      parsed.push({ type: "bullet", text: trimmed.substring(2) })
    }
    // Check for bold text (inline **text**)
    else if (trimmed.includes("**")) {
      parsed.push({ type: "paragraph", text: trimmed })
    }
    // Regular paragraph
    else {
      parsed.push({ type: "paragraph", text: trimmed })
    }
  }

  return parsed
}
