import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Contato() {
  return (
    <div className="min-h-screen bg-background">
      <Head><title>Contato — JD Flores e Plantas</title></Head>
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Fale conosco</div>
            <h1 className="mt-3 font-display text-5xl font-medium leading-tight md:text-6xl">Vamos conversar.</h1>
            <p className="mt-4 text-muted-foreground">Equipe pronta para entender o que sua floricultura precisa — em estoque ou sob encomenda.</p>
            <ul className="mt-8 space-y-4 text-sm">
              <Row icon={Phone} title="Telefone" v="(47) 3000-0000" />
              <Row icon={MessageCircle} title="WhatsApp" v="Falar no WhatsApp" href="https://wa.me/message/DGJ56I645AGPD1" />
              <Row icon={Mail} title="E-mail" v="comercial@jdflores.com.br" />
              <Row icon={InstagramIcon} title="Instagram" v="@jdfloreseplantas" />
              <Row icon={MapPin} title="Endereço" v="Rua Joaquim Couto, 209 — Joinville/SC" />
            </ul>
          </div>
          <form className="space-y-4 rounded-3xl border border-border/60 bg-card p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" />
              <Field label="Empresa" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="E-mail" type="email" />
              <Field label="Telefone" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Mensagem</Label>
              <Textarea rows={5} className="rounded-xl" />
            </div>
            <Button size="lg" className="w-full rounded-full">Enviar mensagem</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Row({ icon: Icon, title, v, href }: { icon: React.ComponentType<{ className?: string }>; title: string; v: string; href?: string }) {
  const content = (
    <li className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4 hover:shadow-sm transition-shadow">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="text-sm font-medium text-foreground">{v}</div>
      </div>
    </li>
  );
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return content;
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input {...props} className="h-11 rounded-xl" />
    </div>
  );
}
