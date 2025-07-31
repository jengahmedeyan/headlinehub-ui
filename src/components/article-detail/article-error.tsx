"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ArticleErrorProps {
  error: string
  onBack: () => void
  onRetry?: () => void
}

export function ArticleError({ error, onBack, onRetry }: ArticleErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
          <Alert>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          {onRetry && (
            <div className="mt-4 text-center">
              <Button onClick={onRetry} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
