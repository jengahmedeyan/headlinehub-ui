"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Globe, ExternalLink } from "lucide-react"

interface DisclaimerModalProps {
  onAccept: () => void
  isVisible: boolean
}

export default function DisclaimerModal({ onAccept, isVisible }: DisclaimerModalProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-2">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-2xl border-2 max-h-[95vh] overflow-y-auto">
        <CardHeader className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6 pt-2 sm:pt-2 pb-2 sm:pb-2">
          <div className="flex justify-center">
            <div className="p-2 sm:p-3 bg-amber-100 rounded-full">
              <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 leading-tight">
            Important Disclaimer
          </CardTitle>
          <CardDescription className="text-base sm:text-lg md:text-lg">Welcome to HeadlineHub</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 py-2 sm:py-3">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">Content Ownership</h3>
                <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                  <strong>We do not own or claim ownership</strong> of any news articles, images, or content displayed
                  on this website. All content belongs to their respective publishers and original sources.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-green-900 mb-1 sm:mb-2 text-sm sm:text-base">
                  News Aggregation Service
                </h3>
                <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                  This website serves as a <strong>news aggregator for The Gambia</strong>, collecting and organizing
                  news from various sources to provide easy access to Gambian news in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
            <p>• All articles link back to their original sources</p>
            <p>• We respect copyright and intellectual property rights</p>
            <p>• Content is displayed for informational purposes only</p>
            <p className="break-words">
              • If you are a content owner and wish to have your content removed, please contact us
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 sm:space-y-3 px-4 sm:px-6 pt-2 sm:pt-3 pb-4 sm:pb-6">
          <Button
            onClick={onAccept}
            className="w-full text-white font-medium py-2.5 sm:py-3 text-sm sm:text-base"
            size="lg"
          >
            I Understand and Accept
          </Button>
          <p className="text-xs text-gray-500 text-center leading-relaxed px-2">
            By continuing, you acknowledge that this is a news aggregation service and that all content belongs to their
            respective owners.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
