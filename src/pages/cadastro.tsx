import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Building2 } from "lucide-react";

export default function Cadastro() {
  return (
    <div className="min-h-screen bg-background">
      <Head><title>Cadastro — JD Flores e Plantas</title></Head>
      <Header />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div className="space-y-6 md:sticky md:top-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 text-primary" /> Exclusivo CNPJ
          </span>
          <h1 className="font-display text-4xl font-medium md:text-5xl">Cadastre sua floricultura</h1>
          <p className="text-muted-foreground">
            Preencha os dados da sua empresa e tenha acesso aos preços de atacado, condições especiais e ao catálogo completo.
          </p>
          <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-foreground/85">
              Após análise do cadastro sua empresa poderá realizar compras. A aprovação costuma sair em até 1 dia útil.
            </p>
          </div>
        </div>

        <form className="space-y-5 rounded-3xl border border-border/60 bg-card p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.2)]" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Razão Social" placeholder="Floricultura LTDA" />
            <Field label="CNPJ" placeholder="00.000.000/0000-00" />
          </div>
          <Field label="Nome do responsável" placeholder="Maria Silva" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Telefone" placeholder="(00) 00000-0000" />
            <Field label="E-mail" placeholder="contato@floricultura.com" type="email" />
          </div>
          <Field label="Senha" type="password" placeholder="Mínimo 8 caracteres" />
          <Button size="lg" className="mt-2 w-full rounded-full">Enviar cadastro</Button>
          <p className="text-center text-xs text-muted-foreground">
            Já possui conta? <Link href="/cadastro" className="font-medium text-primary hover:underline">Entrar</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input {...props} className="h-11 rounded-xl" />
    </div>
  );
}
