'use client';

import { useState, useEffect } from 'react';

export default function EmailVerificationMessage() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const verifyEmail = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (!token || !email) {
      setError("Missing token or email in URL.");
      return;
    }

    try {
      const res = await fetch(`/api/verify-email?token=${token}&email=${email}`);

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'An error occurred during verification.');
        return;
      }

      setStatus(data.message);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to verify email.');
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div>
      {status && <p>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
