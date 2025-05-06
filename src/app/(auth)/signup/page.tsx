"use client";

import AuthCarousel from "@/components/auth/AuthCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  return [<AuthCarousel key="carousel" />, <Form key="form" />];
}

function Form() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    dob: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/signup/", {
        email: form.email,
        full_name: form.fullName,
        username: form.username,
        date_of_birth: form.dob,
        password: form.password,
        confirm_password: form.confirm,
      });

      toast({ title: res.data.message ?? "Conta criada com sucesso!" });
      router.push("/signin");
    } catch (err: any) {
      setError(err.response?.data?.detail ?? "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Criar conta</h2>
      <p className="text-sm text-slate-500 mb-8">
        Junte‑se à Ocean Life Store e faça parte do movimento 🌊
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome completo</Label>
          <Input id="fullName" value={form.fullName} onChange={update("fullName")} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Usuário</Label>
          <Input id="username" value={form.username} onChange={update("username")} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E‑mail</Label>
          <Input id="email" type="email" value={form.email} onChange={update("email")} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Data de nascimento</Label>
          <Input id="dob" type="date" value={form.dob} onChange={update("dob")} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" value={form.password} onChange={update("password")} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirmar senha</Label>
          <Input id="confirm" type="password" value={form.confirm} onChange={update("confirm")} required />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button className="w-full" disabled={loading}>
          {loading ? "Criando conta…" : "Criar conta"}
        </Button>
      </form>

      <p className="text-sm mt-6 text-center">
        Já possui conta?{" "}
        <a className="text-teal-700 font-semibold hover:underline" href="/signin">
          Entrar
        </a>
      </p>
    </>
  );
}
