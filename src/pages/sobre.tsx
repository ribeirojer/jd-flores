import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Leaf, Truck, Heart, Users } from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-background">
      <Head><title>Sobre — JD Flores e Plantas</title></Head>
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Sobre a JD</div>
            <h1 className="mt-3 font-display text-5xl font-medium leading-tight md:text-6xl">
              Embalagens pensadas para quem vive de flores.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Há mais de 15 anos abastecemos floriculturas com papéis, cachepôs, vasos, espumas, cestas e acessórios selecionados — combinando qualidade artesanal, preço de atacado e atendimento próximo.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border/60">
            <img src="/hero.jpg" alt="" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-4">
          {[
            { i: Leaf, t: "Curadoria", d: "Selecionamos cada SKU pensando no padrão visual da sua loja." },
            { i: Truck, t: "Logística", d: "Centralizada em Joinville/SC, com cobertura em todo o Sul." },
            { i: Heart, t: "Relação", d: "Atendimento humano, consultivo e de longo prazo." },
            { i: Users, t: "Comunidade", d: "+1.200 floriculturas confiam na JD para girar estoque." },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-6">
              <b.i className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-xl font-medium">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
