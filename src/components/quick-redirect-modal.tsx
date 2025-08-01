"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink, Shield, ArrowRight } from "lucide-react"

interface QuickRedirectModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  source: string
  title: string
}

export function QuickRedirectModal({ isOpen, onClose, url, source, title }: QuickRedirectModalProps) {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleRedirect = () => {
    setIsRedirecting(true)
    window.location.href = url
  }

  const domain = new URL(url).hostname

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            <DialogTitle>Leaving Gambia News Aggregator</DialogTitle>
          </div>
          <DialogDescription>You&apos;re about to visit the original article source.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{title}</p>
            <p className="text-xs text-gray-600">
              Source: <span className="font-medium">{source}</span> • {domain}
            </p>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                This content belongs to {domain}. We are just providing a link to the original source.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} disabled={isRedirecting}>
            Stay Here
          </Button>
          <Button onClick={handleRedirect} disabled={isRedirecting} className="bg-blue-600 hover:bg-blue-700">
            {isRedirecting ? (
              "Redirecting..."
            ) : (
              <>
                Continue to {domain}
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
