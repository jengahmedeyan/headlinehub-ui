"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { CookieConsentModalProps } from "@/types"
import { Cookie, Settings, Shield, BarChart3} from "lucide-react"

export default function CookieConsentModal({
  isVisible,
  showSettings,
  preferences,
  isLoading = false,
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  onUpdatePreference,
  onOpenSettings,
  onCloseSettings,
}: CookieConsentModalProps) {
  if (!isVisible) return null

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto shadow-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6 text-blue-600" />
              <CardTitle>Cookie Preferences</CardTitle>
            </div>
            <CardDescription>Manage your cookie preferences for Gambia News Aggregator</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <Label className="text-base font-medium">Strictly Necessary</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Essential cookies for the website to function properly, including disclaimer acceptance.
                    </p>
                  </div>
                </div>
                <Switch checked={preferences.necessary} disabled={true} className="opacity-50" />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <Label className="text-base font-medium">Analytics</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Help us understand how visitors use our news aggregator to improve the service.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => onUpdatePreference("analytics", checked)}
                />
              </div>

              {/* <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <Label className="text-base font-medium">Preferences</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Remember your settings and preferences for a better reading experience.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.preferences}
                  onCheckedChange={(checked) => onUpdatePreference("preferences", checked)}
                />
              </div> */}

             
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="flex space-x-2 w-full">
              <Button variant="outline" onClick={onCloseSettings} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={onSavePreferences} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Save Preferences
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start space-x-4">
          <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Cookie Consent</h3>
            <p className="text-sm text-gray-600 mb-4">
              We use cookies to enhance your experience on our Gambia news aggregator. This helps us provide better
              service and remember your preferences.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={onAcceptAll} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? "Processing..." : "Accept All"}
              </Button>
              <Button variant="outline" onClick={onRejectAll} disabled={isLoading}>
                {isLoading ? "Processing..." : "Reject All"}
              </Button>
              <Button variant="ghost" onClick={onOpenSettings}>
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
