"use client";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

export const COOKIE_KEYS = {
  CONSENT: 'headlinehub_consent',
  DISCLAIMER: 'headlinehub_disclaimer',
  PREFERENCES: 'headlinehub_preferences',
} as const;

export const COOKIE_EXPIRY_DAYS = 365;

export const setCookie = (name: string, value: string, days: number = COOKIE_EXPIRY_DAYS): void => {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure=${window.location.protocol === 'https:'}`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

export const hasConsentFor = (type: keyof CookiePreferences): boolean => {
  const consent = getCookie(COOKIE_KEYS.CONSENT);
  if (!consent) return false;
  
  try {
    const preferences: CookiePreferences = JSON.parse(consent);
    return preferences[type] || false;
  } catch {
    return false;
  }
};

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  preferences: false,
  marketing: false,
};