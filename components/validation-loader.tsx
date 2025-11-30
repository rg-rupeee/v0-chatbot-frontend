import { Loader2, CheckCircle2, Circle } from "lucide-react"

interface ValidationLoaderProps {
  currentStep: number
}

const steps = [
  "Validating entity",
  "Fetching data from horoscope",
  "Fetching data from data sources",
  "Using intelligence to validate",
]

export function ValidationLoader({ currentStep }: ValidationLoaderProps) {
  return (
    <div className="flex justify-start">
      <div className="bg-muted text-foreground px-6 py-4 rounded-lg rounded-bl-none border border-border max-w-md">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              {index < currentStep ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : index === currentStep ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className={index <= currentStep ? "text-foreground" : "text-muted-foreground"}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
