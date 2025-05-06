"use client";

import AuthCarousel from "@/components/auth/AuthCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  return [<AuthCarousel key="carousel" />, <Form key="form" />];
}

function Form() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        email: form.identifier,
        password: form.password,
      };
      const { data } = await api.post("/api/signin/", payload, {
        withCredentials: true,
      });
      setCookie(null, "token", data.access, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      setCookie(null, "refreshToken", data.refresh, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      api.defaults.headers.Authorization = `Bearer ${data.access}`;

      toast({ title: data.message ?? "Login realizado com sucesso!" });
      router.push("/home");
    } catch (err: any) {

      setError(err.response?.data?.detail ?? "Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Bem‑vindo de volta!</h2>
      <p className="text-sm text-slate-500 mb-8">
        Acesse sua conta na Ocean Life Store
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="identifier">E‑mail ou usuário</Label>
          <Input
            id="identifier"
            value={form.identifier}
            onChange={update("identifier")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={update("password")}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button className="w-full" disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </Button>
      </form>

      <p className="text-sm mt-6 text-center">
        Novo por aqui?{" "}
        <a href="/signup" className="text-teal-700 font-semibold hover:underline">
          Criar conta
        </a>
      </p>
    </>
  );
}
