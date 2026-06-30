import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { produtos, categorias, formatBRL } from "@/lib/data";
import { useCarrinho } from "@/lib/cart";
import { Minus, Plus, ShoppingBag, Truck, Shield, RefreshCw, PackageCheck, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ProdutoDetalhe() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") return null;

  const p = produtos.find((x) => x.id === id);
  if (!p) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="text-muted-foreground">Produto não encontrado</p>
      </div>
    );
  }

  return <ProdutoContent p={p} />;
}

function ProdutoContent({ p }: { p: typeof produtos[number] }) {
  const cat = categorias.find((c) => c.slug === p.categoria);
  const [qtd, setQtd] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCarrinho();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(p.id, qtd);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Head><title>{p.nome} — JD Flores e Plantas</title></Head>
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <nav className="mb-6 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Início</Link> /{" "}
          <Link href="/produtos" className="hover:text-primary">Produtos</Link> /{" "}
          {cat && (
            <>
              <Link href={`/categorias/${cat.slug}`} className="hover:text-primary">{cat.nome}</Link> /{" "}
            </>
          )}
          <span className="text-foreground">{p.nome}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-muted">
              <img src={p.img} alt={p.nome} className="aspect-square w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button key={i} className="overflow-hidden rounded-xl border border-border bg-muted ring-primary/40 hover:ring-2">
                  <img src={p.img} alt="" className="aspect-square w-full object-cover opacity-90" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  p.estoque ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"
                }`}
              >
                {p.estoque ? "Em Estoque" : "Sob Encomenda"}
              </span>
              <h1 className="mt-3 font-display text-4xl font-medium leading-tight md:text-5xl">{p.nome}</h1>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-4xl font-semibold text-primary">{formatBRL(p.preco)}</span>
                <span className="text-sm text-muted-foreground">por unidade · preço de atacado</span>
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">{p.descricao}</p>

            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-card p-5 text-sm">
              <div><span className="text-muted-foreground">SKU:</span> <strong>{p.id.toUpperCase()}</strong></div>
              <div><span className="text-muted-foreground">Categoria:</span> <strong>{cat?.nome}</strong></div>
              <div><span className="text-muted-foreground">Embalagem:</span> <strong>Caixa única</strong></div>
              <div><span className="text-muted-foreground">Origem:</span> <strong>Nacional</strong></div>
            </div>

            {p.estoque ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-border bg-card p-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQtd(Math.max(1, qtd - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center text-sm font-semibold">{qtd}</span>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQtd(qtd + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="lg" className="flex-1 rounded-full" onClick={handleAddToCart}>
                    <ShoppingBag className="h-4 w-4" />
                    {added ? "Adicionado ✓" : `Comprar — ${formatBRL(p.preco * qtd)}`}
                  </Button>
                </div>
                {added && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-full" onClick={() => router.push("/carrinho")}>
                      Ir para o carrinho
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                  <p className="leading-relaxed text-foreground/85">
                    Este produto pode ser encomendado e chega rapidamente através de nossos fornecedores.
                  </p>
                </div>
                <Button size="lg" className="w-full rounded-full" variant="default">
                  <PackageCheck className="h-4 w-4" /> Solicitar Encomenda
                </Button>
              </div>
            )}

            <ul className="grid grid-cols-3 gap-3 pt-2 text-xs text-muted-foreground">
              <li className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 p-3 text-center">
                <Truck className="h-4 w-4 text-primary" /> Envio em 48h
              </li>
              <li className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 p-3 text-center">
                <Shield className="h-4 w-4 text-primary" /> Compra protegida
              </li>
              <li className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 p-3 text-center">
                <RefreshCw className="h-4 w-4 text-primary" /> Troca facilitada
              </li>
            </ul>
          </div>
        </div>

        <section className="mt-16 grid gap-10 rounded-3xl border border-border/60 bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-display text-3xl font-medium">Características</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {["Alta resistência e durabilidade", "Acabamento premium", "Embalagem coletiva para atacado", "Disponível em variações sob consulta"].map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-medium">Descrição completa</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {p.descricao} Produto selecionado pela equipe da JD Flores e Plantas para atender floriculturas profissionais que prezam por consistência, padrão visual e bom giro de estoque.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
