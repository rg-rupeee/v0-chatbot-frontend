"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Zap, Package } from "lucide-react"

interface DashboardProps {
  onSelectOption: (option: string) => void
}

export default function Dashboard({ onSelectOption }: DashboardProps) {
  const options = [
    {
      id: "rules-validation",
      title: "Rules Validation",
      description: "Validate your business rules and entity configurations",
      icon: CheckCircle2,
      status: "active",
    },
    {
      id: "rules-generation",
      title: "Rules Generation",
      description: "Generate new rules based on your requirements",
      icon: Zap,
      status: "coming-soon",
    },
    {
      id: "order-validation",
      title: "Order Validation",
      description: "Validate orders against your business logic",
      icon: Package,
      status: "coming-soon",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Product Manager AI Assistant</h1>
          <p className="text-lg text-slate-300">
            Intelligent automation for rules validation, generation, and order processing
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option) => {
            const Icon = option.icon
            const isActive = option.status === "active"

            return (
              <Card
                key={option.id}
                className={`p-8 border-2 transition-all ${
                  isActive
                    ? "border-blue-500 bg-slate-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                    : "border-slate-600 bg-slate-800 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Icon className={`w-12 h-12 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{option.title}</h2>
                  <p className="text-slate-300 mb-6 flex-grow">{option.description}</p>

                  {isActive ? (
                    <Button
                      onClick={() => onSelectOption(option.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Start Now
                    </Button>
                  ) : (
                    <div className="w-full py-2 px-4 text-center bg-slate-600 text-slate-300 rounded-lg font-semibold">
                      Coming Soon
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 p-6 bg-slate-700 rounded-lg border border-slate-600">
          <p className="text-slate-300 text-sm">
            💡 <span className="font-semibold">Tip:</span> Start with Rules Validation to understand your entity
            configurations and validate your business logic.
          </p>
        </div>
      </div>
    </div>
  )
}
