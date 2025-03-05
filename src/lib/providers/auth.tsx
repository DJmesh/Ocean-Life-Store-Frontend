"use client";
import React, { ReactNode, createContext, useContext, useEffect, useState, useCallback } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import api from "../axios";

type AuthProviderProps = {
  children: ReactNode;
};

interface UserProfile {
  username: string;
  email: string;
  id: string;
}

interface AuthProviderData {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
    // Se a página exigir login para compra, redirecione apenas na ação de compra.
    // Aqui, como o site é público, podemos deixar o usuário na mesma página.
    // router.push("/signin");
  }, [router]);

  const initializeAuth = async () => {
    const cookies = parseCookies();
    const savedToken = cookies.token;
    if (savedToken) {
      api.defaults.headers.Authorization = `Bearer ${savedToken}`;
      setToken(savedToken);
      try {
        // Altere a URL se o endpoint de usuário for diferente
        const response = await api.get("/api/user/");
        const userData = response.data[0]; // Ajuste conforme o retorno da API
        setUser({ username: userData.username, email: userData.email, id: userData.id });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        // Não forçamos logout automaticamente, pois o site é público.
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, [logout]);

  // Atualiza o token periodicamente se houver refreshToken armazenado
  useEffect(() => {
    const interval = setInterval(async () => {
      const cookies = parseCookies();
      const refreshToken = cookies.refreshToken;
      if (refreshToken) {
        try {
          const { data } = await api.post("/api/token/refresh/", { refresh: refreshToken });
          setCookie(null, "token", data.access, { maxAge: 30 * 24 * 60 * 60, path: "/" });
          api.defaults.headers.Authorization = `Bearer ${data.access}`;
          setToken(data.access);
        } catch (error) {
          console.error("Erro ao atualizar token:", error);
          logout();
        }
      }
    }, 5 * 60 * 1000); // Atualiza o token a cada 5 minutos

    return () => clearInterval(interval);
  }, [logout]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/api/token/", { email, password });
      // Salva os tokens nos cookies
      setCookie(null, "token", data.access, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      setCookie(null, "refreshToken", data.refresh, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
      setToken(data.access);
      // Após login, atualiza os dados do usuário
      await initializeAuth();
      // Redireciona para a página desejada após o login, se necessário
      router.push("/home");
    } catch (error) {
      console.error("Falha no login:", error);
      throw new Error("Credenciais inválidas");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
