import { parseMarkdown } from "@/lib/markdown-utils"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const parsed = parseMarkdown(content)

  return (
    <div className="space-y-2">
      {parsed.map((item, index) => {
        switch (item.type) {
          case "heading":
            return (
              <h3 key={index} className="font-bold text-base text-foreground mt-2">
                {item.text}
              </h3>
            )
          case "bullet":
            return (
              <div key={index} className="flex gap-2 ml-2">
                <span className="text-foreground">•</span>
                <p className="text-sm text-foreground">{item.text}</p>
              </div>
            )
          case "bold":
            return (
              <p key={index} className="text-sm text-foreground">
                {item.text
                  .split("**")
                  .map((text, i) => (i % 2 === 0 ? <span key={i}>{text}</span> : <strong key={i}>{text}</strong>))}
              </p>
            )
          default:
            return (
              <p key={index} className="text-sm text-foreground leading-relaxed">
                {item.text}
              </p>
            )
        }
      })}
    </div>
  )
}
