"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button variant="ghost" onClick={onClick} className="mb-6">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Articles
    </Button>
  )
}
