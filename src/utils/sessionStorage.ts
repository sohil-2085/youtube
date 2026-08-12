import { useState, useEffect } from "react";

export interface AuthTokenData {
  accessToken: string;
  expiresAt: number;
}

export function useSessionToken(key: string = "auth_token") {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key);
    }
    return null;
  });

  useEffect(() => {
    if (token) {
      sessionStorage.setItem(key, token);
    } else {
      sessionStorage.removeItem(key);
    }
  }, [token, key]);

  const clearToken = () => setToken(null);

  return { token, setToken, clearToken };
}
