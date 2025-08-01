"use client"

import { useState, useEffect, useTransition } from "react"
import {
  setDisclaimerAccepted,
  setCookieConsent,
  
} from "@/lib/cookie"
import { type CookiePreferences, DEFAULT_COOKIE_PREFERENCES } from "@/types"

// Client-side cookie reading (for immediate UI updates)
const getClientCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export function useConsent() {
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const [showCookieSettings, setShowCookieSettings] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES)
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const checkConsent = () => {
      const disclaimerAccepted = getClientCookie("gambia_news_disclaimer")
      const cookieConsent = getClientCookie("gambia_news_consent")

      if (!disclaimerAccepted) {
        setShowDisclaimer(true)
      } else if (!cookieConsent) {
        setShowCookieConsent(true)
      } else {
        try {
          const preferences = JSON.parse(decodeURIComponent(cookieConsent))
          setCookiePreferences(preferences)
        } catch {
          setShowCookieConsent(true)
        }
      }
      setIsLoading(false)
    }

    // Small delay to ensure hydration
    const timer = setTimeout(checkConsent, 100)
    return () => clearTimeout(timer)
  }, [])

  const acceptDisclaimer = () => {
    startTransition(async () => {
      await setDisclaimerAccepted()
      setShowDisclaimer(false)
      setShowCookieConsent(true)
    })
  }

  const acceptAllCookies = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    }

    startTransition(async () => {
      await setCookieConsent(allAccepted)
      setCookiePreferences(allAccepted)
      setShowCookieConsent(false)
      setShowCookieSettings(false)
    })
  }

  const rejectAllCookies = () => {
    startTransition(async () => {
      await setCookieConsent(DEFAULT_COOKIE_PREFERENCES)
      setCookiePreferences(DEFAULT_COOKIE_PREFERENCES)
      setShowCookieConsent(false)
      setShowCookieSettings(false)
    })
  }

  const saveSelectedPreferences = () => {
    startTransition(async () => {
      await setCookieConsent(cookiePreferences)
      setShowCookieConsent(false)
      setShowCookieSettings(false)
    })
  }

  const updatePreference = (type: keyof CookiePreferences, value: boolean) => {
    if (type === "necessary") return // Can't change necessary cookies
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const openCookieSettings = () => {
    setShowCookieSettings(true)
    setShowCookieConsent(true)
  }

  const showDisclaimerModal = () => {
    setShowDisclaimer(true)
  }

  return {
    showDisclaimer,
    showCookieConsent,
    showCookieSettings,
    cookiePreferences,
    isLoading,
    isPending,
    acceptDisclaimer,
    acceptAllCookies,
    rejectAllCookies,
    saveSelectedPreferences,
    updatePreference,
    openCookieSettings,
    showDisclaimerModal,
    closeCookieSettings: () => setShowCookieSettings(false),
  }
}
