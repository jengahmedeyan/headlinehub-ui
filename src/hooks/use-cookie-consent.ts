import { useState, useEffect } from 'react';
import { 
  getCookie, 
  setCookie, 
  COOKIE_KEYS, 
  COOKIE_EXPIRY_DAYS,
  CookiePreferences,
  DEFAULT_COOKIE_PREFERENCES 
} from '../utils/cookies';

export const useCookieConsent = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCookieConsent = () => {
      const disclaimerAccepted = getCookie(COOKIE_KEYS.DISCLAIMER);
      const cookieConsent = getCookie(COOKIE_KEYS.CONSENT);

      if (disclaimerAccepted && !cookieConsent) {
        setShowCookieConsent(true);
      } else if (cookieConsent) {
        try {
          const preferences = JSON.parse(cookieConsent);
          setCookiePreferences(preferences);
        } catch {
          setShowCookieConsent(true);
        }
      }
      setIsLoading(false);
    };

    const timer = setTimeout(checkCookieConsent, 100);
    return () => clearTimeout(timer);
  }, []);

  const acceptAllCookies = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    setCookiePreferences(allAccepted);
    setCookie(COOKIE_KEYS.CONSENT, JSON.stringify(allAccepted), COOKIE_EXPIRY_DAYS);
    setShowCookieConsent(false);
    setShowCookieSettings(false);
  };

  const rejectAllCookies = () => {
    setCookiePreferences(DEFAULT_COOKIE_PREFERENCES);
    setCookie(COOKIE_KEYS.CONSENT, JSON.stringify(DEFAULT_COOKIE_PREFERENCES), COOKIE_EXPIRY_DAYS);
    setShowCookieConsent(false);
    setShowCookieSettings(false);
  };

  const saveSelectedPreferences = () => {
    setCookie(COOKIE_KEYS.CONSENT, JSON.stringify(cookiePreferences), COOKIE_EXPIRY_DAYS);
    setShowCookieConsent(false);
    setShowCookieSettings(false);
  };

  const updatePreference = (type: keyof CookiePreferences, value: boolean) => {
    if (type === 'necessary') return; // Can't change necessary cookies
    setCookiePreferences(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const openCookieSettings = () => {
    setShowCookieSettings(true);
  };

  const closeCookieSettings = () => {
    setShowCookieSettings(false);
  };

  return {
    showCookieConsent,
    showCookieSettings,
    cookiePreferences,
    isLoading,
    acceptAllCookies,
    rejectAllCookies,
    saveSelectedPreferences,
    updatePreference,
    openCookieSettings,
    closeCookieSettings,
  };
};