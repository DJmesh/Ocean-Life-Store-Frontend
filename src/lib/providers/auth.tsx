"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import api from "../axios";

type AuthProviderProps = { children: ReactNode };

interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name?: string;
}

interface AuthContextShape {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextShape>({} as AuthContextShape);

async function fetchProfile() {
  const res = await api.get("/api/users/me/");
  return res.data as UserProfile;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const logout = useCallback(() => {
    destroyCookie(null, "token");
    destroyCookie(null, "refreshToken");
    setUser(null);
    setToken(null);
    delete api.defaults.headers.Authorization;
    console.info("%cLOGOUT", "color:#f43;");
    router.push("/signin");
  }, [router]);
  const initializeAuth = useCallback(async () => {
    const { token: savedToken } = parseCookies();
    if (savedToken) {
      api.defaults.headers.Authorization = `Bearer ${savedToken}`;
      setToken(savedToken);
      try {
        const profile = await fetchProfile();
        setUser(profile);
        console.log("[Auth] Sessão restaurada:", profile);
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  useEffect(() => {
    const interval = setInterval(async () => {
      const { refreshToken } = parseCookies();
      if (refreshToken) {
        try {
          const { data } = await api.post("/api/token/refresh/", {
            refresh: refreshToken,
          });
          setCookie(null, "token", data.access, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          api.defaults.headers.Authorization = `Bearer ${data.access}`;
          setToken(data.access);
        } catch (err) {
          console.error("Erro ao atualizar token:", err);
          logout();
        }
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [logout]);
  const login = async (identifier: string, password: string) => {
    const payload = identifier.includes("@")
      ? { email: identifier, password }
      : { username: identifier, password };

    const { data } = await api.post("/api/signin/", payload, {
      withCredentials: true,
    });
    setCookie(null, "token", data.access, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    setCookie(null, "refreshToken", data.refresh, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    api.defaults.headers.Authorization = `Bearer ${data.access}`;
    setToken(data.access);

    const profile = await fetchProfile();
    setUser(profile);

    console.info(
      "%cLOGIN OK",
      "background:#047857;color:#fff;padding:2px 6px;border-radius:4px;",
      { token: data.access.slice(0, 25) + "…", profile }
    );
    router.push("/home");
    router.refresh();
  };
  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated: !!user, login, logout }}
    >
      {loading ? (
        <div className="flex h-screen items-center justify-center text-sm text-gray-500">
          Carregando...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

/* ---------- hook ---------- */
export const useAuth = () => useContext(AuthContext);
