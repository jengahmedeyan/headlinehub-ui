"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight, Shield, Clock, Globe } from "lucide-react"

function RedirectContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const url = searchParams.get("url")
  const source = searchParams.get("source")
  const title = searchParams.get("title")
  
  useEffect(() => {
    if (!url) {
      router.push("/")
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true)
          window.open(url, "_blank")
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [url, router])

  const handleRedirectNow = () => {
    setIsRedirecting(true);
    window.open(url || "/", "_blank");
    router.push("/");
  };

  const handleGoBack = () => {
    router.back()
  }

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <p className="text-gray-600">Invalid redirect URL</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const domain = new URL(url).hostname

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-100 rounded-full">
              <ExternalLink className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Redirecting to Original Source</CardTitle>
          <p className="text-gray-600">You&apos;re being redirected to the original article publisher</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Article Info */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start space-x-3">
              <Globe className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">Article Details</h3>
                {title && <p className="text-sm text-gray-700 mb-2 line-clamp-2">{decodeURIComponent(title)}</p>}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {source && (
                    <span className="bg-gray-100 px-2 py-1 rounded">Source: {decodeURIComponent(source)}</span>
                  )}
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-700">{domain}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Content Ownership Notice</h4>
                <p className="text-sm text-amber-800">
                  This content belongs to <strong>{domain}</strong>. HeadlineHub does not own or claim
                  ownership of this article. We are simply providing a link to the original source.
                </p>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">
                {isRedirecting ? (
                  "Redirecting now..."
                ) : (
                  <>
                    Redirecting in <span className="font-bold text-blue-600">{countdown}</span> second
                    {countdown !== 1 ? "s" : ""}
                  </>
                )}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleRedirectNow}
                disabled={isRedirecting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {isRedirecting ? (
                  "Redirecting..."
                ) : (
                  <>
                    Continue Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleGoBack} disabled={isRedirecting}>
                Go Back
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t">
            <p>
              By continuing, you acknowledge that you are leaving Gambia News Aggregator and visiting an external
              website.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <RedirectContent />
    </Suspense>
  )
}
