"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Globe, ExternalLink } from "lucide-react"

interface DisclaimerModalProps {
  onAccept: () => void
  isVisible: boolean
  isLoading?: boolean
}

export default function DisclaimerModal({ onAccept, isVisible, isLoading = false }: DisclaimerModalProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-2">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-amber-100 rounded-full">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Important Disclaimer</CardTitle>
          <CardDescription className="text-lg">Welcome to HeadlineHub</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start space-x-3">
              <Globe className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Content Ownership</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  <strong>We do not own or claim ownership</strong> of any news articles, images, or content displayed
                  on this website. All content belongs to their respective publishers and original sources.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <div className="flex items-start space-x-3">
              <ExternalLink className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">News Aggregation Service</h3>
                <p className="text-green-800 text-sm leading-relaxed">
                  This website serves as a <strong>news aggregator for The Gambia</strong>, collecting and organizing
                  news from various sources to provide easy access to Gambian news in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <p>• All articles link back to their original sources</p>
            <p>• We respect copyright and intellectual property rights</p>
            <p>• Content is displayed for informational purposes only</p>
            <p>• If you are a content owner and wish to have your content removed, please contact us</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button
            onClick={onAccept}
            disabled={isLoading}
            className="w-full  text-white font-medium py-3"
            size="lg"
          >
            {isLoading ? "Processing..." : "I Understand and Accept"}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            By continuing, you acknowledge that this is a news aggregation service and that all content belongs to their
            respective owners.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
