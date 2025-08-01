"use client"

import { Button } from "@/components/ui/button"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { useDisclaimer } from "@/hooks/use-disclaimer"


export default function Footer() {
  const { showDisclaimerModal } = useDisclaimer()
  const { openCookieSettings } = useCookieConsent()

  return (
    <footer className="bg-gray-100 border-t py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">HeadlineHub</h3>
            <p className="text-sm text-gray-600">
              Your trusted source for aggregated news from The Gambia. We collect and organize news from various sources
              for easy access.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Important Information</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• We do not own the news content</li>
              <li>• All articles belong to their original publishers</li>
              <li>• This is a news aggregation service</li>
              <li>• Content is for informational purposes only</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Privacy & Settings</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={showDisclaimerModal}
                className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800"
              >
                View Disclaimer
              </Button>
              <br />
              <Button
                variant="ghost"
                size="sm"
                onClick={openCookieSettings}
                className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800"
              >
                Cookie Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 HeadLineHub. All rights reserved to respective content owners.</p>
        </div>
      </div>
    </footer>
  )
}