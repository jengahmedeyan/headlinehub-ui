import { useState, useEffect } from 'react';
import { getCookie, setCookie, COOKIE_KEYS, COOKIE_EXPIRY_DAYS } from '../utils/cookies';

export const useDisclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDisclaimer = () => {
      const disclaimerAccepted = getCookie(COOKIE_KEYS.DISCLAIMER);
      setShowDisclaimer(!disclaimerAccepted);
      setIsLoading(false);
    };

    // Small delay to ensure hydration is complete
    const timer = setTimeout(checkDisclaimer, 100);
    return () => clearTimeout(timer);
  }, []);

  const acceptDisclaimer = () => {
    setCookie(COOKIE_KEYS.DISCLAIMER, 'true', COOKIE_EXPIRY_DAYS);
    setShowDisclaimer(false);
  };

  const showDisclaimerModal = () => {
    setShowDisclaimer(true);
  };

  return {
    showDisclaimer,
    isLoading,
    acceptDisclaimer,
    showDisclaimerModal,
  };
};