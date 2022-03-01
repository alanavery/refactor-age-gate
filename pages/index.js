import { useState, useEffect } from 'react';
import Script from 'next/script';
import Cookies from 'js-cookie';
import AgeGate from '../components/AgeGate';

const cookieName = 'ageVerified';

const cookieValue = Cookies.get(cookieName);

console.log('This is cookieValue:', cookieValue);

export default function Home() {
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    if (cookieValue) {
      setAgeVerified(true);
    }
  }, []);

  const verifyAge = () => {
    setAgeVerified(true);
    Cookies.set(cookieName, true, { expires: 60 });
  };

  return (
    <>
      {ageVerified ? '' : <AgeGate verifyAge={verifyAge} />}

      <h1>This is the Homepage.</h1>

      <Script src="/scripts/age-gate.js" type="module" />
    </>
  );
}
