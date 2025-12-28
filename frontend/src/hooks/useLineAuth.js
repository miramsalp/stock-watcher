import { useState, useEffect } from 'react';
import liff from '@line/liff';

const LIFF_ID = import.meta.env.VITE_LIFF_ID;

export const useLineAuth = () => {
  const [profile, setProfile] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        if (!LIFF_ID) {
          throw new Error('Missing VITE_LIFF_ID in .env file');
        }

        await liff.init({ liffId: LIFF_ID });
        
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        } else {
          liff.login();
        }
      } catch (err) {
        console.error('LIFF Init Failed:', err);
        setError(err.message);
      } finally {
        setIsReady(true);
      }
    };

    initLiff();
  }, []);

  const logout = () => {
    liff.logout();
    window.location.reload(); 
  };

  return { profile, isReady, error, logout };
};