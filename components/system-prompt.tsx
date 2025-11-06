"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SystemPromptProps {
  onBack: () => void
}

export default function SystemPrompt({ onBack }: SystemPromptProps) {
  const systemPrompt = `
# Rules Validation Assistant

## Purpose
You are an expert product manager and technical product manager assistant specializing in rules validation. Your role is to help users validate their business rules, entity configurations, and ensure compliance with their business logic.

## Core Responsibilities
1. **Analyze Entity Configurations**: Review and validate entity definitions against best practices
2. **Validate Business Rules**: Check for conflicts, gaps, and inconsistencies in business logic
3. **Provide Recommendations**: Suggest improvements and optimizations for rules
4. **Explain Decisions**: Clearly articulate why certain validations pass or fail

## Validation Categories
- **Configuration Validation**: Check entity settings and parameters
- **Rule Consistency**: Ensure rules don't conflict with each other
- **Coverage Analysis**: Identify gaps in rule coverage
- **Performance Impact**: Assess potential performance implications

## Interaction Guidelines
1. Always ask clarifying questions if entity requirements are unclear
2. Provide specific, actionable feedback
3. Reference industry best practices when applicable
4. Suggest testing strategies for complex validations
5. Maintain a professional, helpful tone

## Response Format
- Start with a brief summary of findings
- List specific validations performed
- Highlight any issues or concerns
- Provide recommendations for resolution
- Suggest next steps

## Important Notes
- All validations are based on provided entity data
- Consider edge cases and corner scenarios
- Document any assumptions made during validation
- Flag potential compliance or security issues
  `

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </Button>
          <h1 className="text-2xl font-bold text-foreground">System Prompt</h1>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-3xl">
          <Card className="p-8 bg-card border-border">
            <div className="prose prose-invert max-w-none">
              <div className="text-sm text-muted-foreground space-y-4">
                {systemPrompt.split("\n\n").map((section, idx) => {
                  if (section.startsWith("#")) {
                    const level = section.match(/^#+/)?.[0].length || 1
                    const text = section.replace(/^#+\s*/, "")
                    if (level === 1) {
                      return (
                        <h1 key={idx} className="text-2xl font-bold text-foreground mt-6 mb-4">
                          {text}
                        </h1>
                      )
                    } else if (level === 2) {
                      return (
                        <h2 key={idx} className="text-lg font-bold text-foreground mt-4 mb-2">
                          {text}
                        </h2>
                      )
                    }
                  } else if (section.startsWith("-") || section.startsWith("•")) {
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1 text-muted-foreground">
                        {section.split("\n").map((item, i) => (
                          <li key={i}>{item.replace(/^[-•]\s*/, "").trim()}</li>
                        ))}
                      </ul>
                    )
                  } else if (section.match(/^\d\./)) {
                    return (
                      <ol key={idx} className="list-decimal list-inside space-y-1 text-muted-foreground">
                        {section.split("\n").map((item, i) => (
                          <li key={i}>{item.replace(/^\d\.\s*/, "").trim()}</li>
                        ))}
                      </ol>
                    )
                  }
                  return (
                    <p key={idx} className="text-muted-foreground">
                      {section}
                    </p>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
