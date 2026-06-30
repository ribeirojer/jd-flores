import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { categorias } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function Categorias() {
  return (
    <div className="min-h-screen bg-background">
      <Head><title>Categorias — JD Flores e Plantas</title></Head>
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Início</Link> / <span className="text-foreground">Categorias</span>
        </nav>
        <h1 className="mt-2 font-display text-4xl font-medium md:text-5xl">Todas as categorias</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Tudo o que sua floricultura precisa, organizado por linha de produto.</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={`/categorias/${c.slug}`}
              className="group relative block aspect-[5/4] overflow-hidden rounded-3xl border border-border/60 bg-muted"
            >
              <img src={c.img} alt={c.nome} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                <h3 className="font-display text-2xl font-medium">{c.nome}</h3>
                <p className="mt-1 text-sm text-background/80">{c.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider opacity-90">
                  Ver produtos <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
