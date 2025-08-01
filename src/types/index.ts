
export const COOKIE_EXPIRY_DAYS = 365

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  preferences: false,
  marketing: false,
}

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  preferences: boolean
  marketing: boolean
}

export const COOKIE_KEYS = {
  CONSENT: "gambia_news_consent",
  DISCLAIMER: "gambia_news_disclaimer",
  PREFERENCES: "gambia_news_preferences",
} as const