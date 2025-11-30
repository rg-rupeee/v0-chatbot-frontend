"use client"

import ReactMarkdown from "react-markdown"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const processedContent = content.replace(/\\n/g, "\n")

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:text-sm prose-p:leading-relaxed prose-headings:mt-3 prose-headings:mb-2 prose-ul:my-2 prose-li:my-0 prose-strong:font-semibold">
      <ReactMarkdown>{processedContent}</ReactMarkdown>
    </div>
  )
}
