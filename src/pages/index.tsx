import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { categorias, produtos } from "@/lib/data";
import {
  Truck,
  Building2,
  Boxes,
  ArrowRight,
  PackageSearch,
  Calculator,
  Send,
  HeartHandshake,
  Sparkles,
  Leaf,
  Quote,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>JD Flores e Plantas — Atacado de Embalagens para Floriculturas</title>
        <meta name="description" content="Atacado de embalagens, cachepôs, vasos, papéis e acessórios para floriculturas. Venda exclusiva para CNPJ." />
        <meta property="og:title" content="JD Flores e Plantas — Atacado" />
        <meta property="og:description" content="Embalagens para floriculturas no atacado." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-16 md:pt-20">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              Atacado para floriculturas · desde 2008
            </span>
            <h1 className="font-display text-4xl font-medium leading-[1.05] text-foreground sm:text-5xl md:text-7xl">
              Embalagens para <span className="italic text-primary">Floriculturas</span> no Atacado.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Papéis para buquê, cachepôs, vasos, espumas florais, cestas e diversos acessórios — selecionados para quem vive de flores.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/produtos">
                <Button size="lg" className="rounded-full px-7">
                  Ver Catálogo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button size="lg" variant="outline" className="rounded-full px-7">
                  Cadastrar CNPJ
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> +1.200 clientes ativos</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> Reposição em 48h</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/40 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
              <img
                src="/hero.jpg"
                alt="Embalagens para floricultura"
                width={1600}
                height={1200}
                className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/60 bg-card p-4 shadow-lg sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Novidades semanais</div>
                  <div className="text-sm font-semibold">+120 SKUs por mês</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER SECUNDÁRIO */}
      <section className="border-y border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-7 sm:grid-cols-3">
          {[
            { icon: Building2, text: "Venda exclusiva para CNPJ" },
            { icon: Truck, text: "Entregamos para todo o Sul do Brasil" },
            { icon: Boxes, text: "Produtos à pronta entrega e sob encomenda" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-medium">
              <b.icon className="h-5 w-5 opacity-90" />
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Catálogo</div>
            <h2 className="mt-2 font-display text-4xl font-medium md:text-5xl">Navegue por categoria</h2>
          </div>
          <Link href="/categorias" className="text-sm font-medium text-primary hover:underline">
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  Explorar <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Selecionados</div>
              <h2 className="mt-2 font-display text-4xl font-medium md:text-5xl">Produtos em destaque</h2>
            </div>
            <Link href="/produtos" className="text-sm font-medium text-primary hover:underline">
              Ver catálogo completo →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {produtos.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Processo</div>
          <h2 className="mt-2 font-display text-4xl font-medium md:text-5xl">Como funciona</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: PackageSearch, t: "Escolha seus produtos", d: "Monte o pedido pelo catálogo online com preços de atacado." },
            { icon: Calculator, t: "Calculamos o frete", d: "Informe seu CEP e veja o valor exato em segundos." },
            { icon: Send, t: "Enviamos rapidamente", d: "Expedição em até 48h para todo o Sul do Brasil." },
            { icon: HeartHandshake, t: "Sem estoque? Encomendamos", d: "Articulamos com nossos fornecedores para você." },
          ].map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border/60 bg-card p-6">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="absolute right-5 top-5 font-display text-3xl text-muted-foreground/30">0{i + 1}</div>
              <h3 className="font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUE COMPRAR */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">Diferenciais</div>
            <h2 className="mt-2 font-display text-4xl font-medium md:text-5xl">Por que comprar conosco</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {[
              { n: "+15", t: "anos de mercado" },
              { n: "100%", t: "especialistas em floriculturas" },
              { n: "2.500", t: "SKUs no catálogo" },
              { n: "48h", t: "reposição rápida" },
              { n: "CNPJ", t: "venda exclusiva para empresas" },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur">
                <div className="font-display text-4xl font-medium">{c.n}</div>
                <div className="mt-2 text-sm opacity-85">{c.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Clientes</div>
          <h2 className="mt-2 font-display text-4xl font-medium md:text-5xl">Quem compra conosco</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "Marina Coelho", l: "Floricultura Bela Flor — Joinville/SC", t: "Atendimento impecável. Sempre tem o papel kraft que ninguém mais consegue trazer com regularidade. Virou parceiro fixo da loja." },
            { n: "Ricardo Almeida", l: "Casa da Rosa — Curitiba/PR", t: "O sistema de encomenda salva quando preciso de algo específico para festas. Cumprem prazos e a qualidade é consistente." },
            { n: "Patrícia Vasques", l: "Studio Verde — Florianópolis/SC", t: "Preço justo, variedade enorme de cachepôs e cestas. Recomendo para qualquer floricultura que queira ganhar margem." },
          ].map((d, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-border/60 bg-card p-7">
              <Quote className="mb-4 h-7 w-7 text-primary/40" />
              <p className="text-sm leading-relaxed text-foreground/90">{d.t}</p>
              <div className="mt-6 border-t border-border/60 pt-4">
                <div className="font-semibold text-foreground">{d.n}</div>
                <div className="text-xs text-muted-foreground">{d.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
