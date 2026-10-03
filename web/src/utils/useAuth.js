import { useCallback } from 'react';

function useAuth() {
  const callbackUrl = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('callbackUrl')
    : null;

  const signInWithCredentials = useCallback(async (options) => {
    const { email, password, redirect, callbackUrl: destUrl } = options;
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to sign in');
    }

    if (redirect) {
      window.location.href = destUrl || callbackUrl || '/';
    }
    return res;
  }, [callbackUrl]);

  const signUpWithCredentials = useCallback(async (options) => {
    const { email, password, name, redirect, callbackUrl: destUrl } = options;
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to sign up');
    }

    if (redirect) {
      window.location.href = destUrl || callbackUrl || '/';
    }
    return res;
  }, [callbackUrl]);

  const signOut = useCallback(async (options) => {
    const { callbackUrl: destUrl } = options || {};
    await fetch('/api/auth/signout', { method: 'POST' });
    window.location.href = destUrl || '/';
  }, []);

  // Placeholders to prevent breaking the UI (disabled as requested)
  const signInWithGoogle = useCallback(() => { alert("Google Sign in is temporarily disabled."); }, []);
  const signInWithFacebook = useCallback(() => { alert("Facebook Sign in is temporarily disabled."); }, []);
  const signInWithTwitter = useCallback(() => { alert("Twitter Sign in is temporarily disabled."); }, []);
  const signInWithApple = useCallback(() => { alert("Apple Sign in is temporarily disabled."); }, []);

  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithApple,
    signOut,
  }
}

export default useAuth;