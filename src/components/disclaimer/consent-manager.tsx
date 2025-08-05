"use client"


import DisclaimerModal from "./disclaimer-modal"
import CookieConsentModal from "./cookie-consent-modal"
import { useConsent } from "@/hooks/user-consent"


export default function ConsentManager() {
  const {
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
    closeCookieSettings,
  } = useConsent()

  if (isLoading) {
    return null
  }

  return (
    <>
      <DisclaimerModal isVisible={showDisclaimer} onAccept={acceptDisclaimer} />

      <CookieConsentModal
        isVisible={showCookieConsent}
        showSettings={showCookieSettings}
        preferences={cookiePreferences}
        isLoading={isPending}
        onAcceptAll={acceptAllCookies}
        onRejectAll={rejectAllCookies}
        onSavePreferences={saveSelectedPreferences}
        onUpdatePreference={updatePreference}
        onOpenSettings={openCookieSettings}
        onCloseSettings={closeCookieSettings}
      />
    </>
  )
}
