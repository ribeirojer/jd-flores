import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categorias, produtos } from "@/lib/data";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function Produtos() {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [preco, setPreco] = useState<number[]>([400]);
  const [disp, setDisp] = useState<"todos" | "estoque" | "encomenda">("todos");

  const lista = produtos.filter((p) => {
    if (q && !p.nome.toLowerCase().includes(q.toLowerCase())) return false;
    if (cats.length && !cats.includes(p.categoria)) return false;
    if (p.preco > preco[0]) return false;
    if (disp === "estoque" && !p.estoque) return false;
    if (disp === "encomenda" && p.estoque) return false;
    return true;
  });

  const toggleCat = (slug: string) =>
    setCats((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]));

  return (
    <div className="min-h-screen bg-background">
      <Head><title>Produtos — JD Flores e Plantas</title></Head>
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <nav className="text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary">Início</Link> / <span className="text-foreground">Produtos</span>
            </nav>
            <h1 className="mt-2 font-display text-4xl font-medium md:text-5xl">Catálogo</h1>
            <p className="mt-1 text-sm text-muted-foreground">{lista.length} produtos encontrados</p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pesquisar produto..."
              className="rounded-full pl-9"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-7 self-start rounded-2xl border border-border/60 bg-card p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filtros
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categoria</h3>
              <div className="space-y-2.5">
                {categorias.map((c) => (
                  <label key={c.slug} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox checked={cats.includes(c.slug)} onCheckedChange={() => toggleCat(c.slug)} />
                    {c.nome}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preço máximo</h3>
              <Slider value={preco} onValueChange={setPreco} min={20} max={400} step={10} />
              <div className="mt-2 text-sm text-muted-foreground">Até R$ {preco[0]}</div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disponibilidade</h3>
              <div className="space-y-2">
                {[
                  { v: "todos", l: "Todos" },
                  { v: "estoque", l: "Em estoque" },
                  { v: "encomenda", l: "Sob encomenda" },
                ].map((o) => (
                  <label key={o.v} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <input
                      type="radio"
                      name="disp"
                      checked={disp === o.v}
                      onChange={() => setDisp(o.v as typeof disp)}
                      className="h-4 w-4 accent-primary"
                    />
                    {o.l}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            {lista.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
                Nenhum produto encontrado com os filtros atuais.
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {lista.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
