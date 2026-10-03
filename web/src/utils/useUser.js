import * as React from 'react';

const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  const fetchUser = React.useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        return data.user || null;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const refetchUser = React.useCallback(() => {
    if (process.env.NEXT_PUBLIC_CREATE_ENV === "PRODUCTION") {
       // Placeholder in case they have a special cloud implementation
    }

    setStatus('loading');
    fetchUser().then(userData => {
      setUser(userData);
      setStatus(userData ? 'authenticated' : 'unauthenticated');
    });
  }, [fetchUser]);

  React.useEffect(refetchUser, [refetchUser]);

  return { 
    user, 
    data: user, 
    loading: status === 'loading', 
    refetch: refetchUser 
  };
};

export { useUser };
export default useUser;