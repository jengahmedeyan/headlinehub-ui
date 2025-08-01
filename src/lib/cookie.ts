"use server"

import { COOKIE_EXPIRY_DAYS, COOKIE_KEYS, CookiePreferences } from "@/types"
import { cookies } from "next/headers"




export async function setDisclaimerAccepted() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_KEYS.DISCLAIMER, "true", {
    maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function setCookieConsent(preferences: CookiePreferences) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_KEYS.CONSENT, JSON.stringify(preferences), {
    maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function getDisclaimerStatus(): Promise<boolean> {
  const cookieStore = await cookies()
  const disclaimer = cookieStore.get(COOKIE_KEYS.DISCLAIMER)
  return disclaimer?.value === "true"
}

export async function getCookieConsent(): Promise<CookiePreferences | null> {
  const cookieStore = await cookies()
  const consent = cookieStore.get(COOKIE_KEYS.CONSENT)

  if (!consent?.value) return null

  try {
    return JSON.parse(consent.value)
  } catch {
    return null
  }
}

export async function clearAllCookies() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_KEYS.DISCLAIMER)
  cookieStore.delete(COOKIE_KEYS.CONSENT)
  cookieStore.delete(COOKIE_KEYS.PREFERENCES)
}

// Default preferences
