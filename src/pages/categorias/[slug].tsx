import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categorias, produtos } from "@/lib/data";

export default function CategoriaSlug() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== "string") return null;

  const cat = categorias.find((c) => c.slug === slug);
  if (!cat) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="text-muted-foreground">Categoria não encontrada</p>
      </div>
    );
  }

  const lista = produtos.filter((p) => p.categoria === cat.slug);

  return (
    <div className="min-h-screen bg-background">
      <Head><title>{cat.nome} — JD Flores e Plantas</title></Head>
      <Header />
      <section className="relative overflow-hidden border-b border-border/60 bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <nav className="text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary">Início</Link> /{" "}
              <Link href="/categorias" className="hover:text-primary">Categorias</Link> /{" "}
              <span className="text-foreground">{cat.nome}</span>
            </nav>
            <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-6xl">{cat.nome}</h1>
            <p className="mt-3 max-w-lg text-muted-foreground">{cat.desc}</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border/60">
            <img src={cat.img} alt={cat.nome} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 text-sm text-muted-foreground">{lista.length} produtos</div>
        {lista.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
            Em breve novos produtos nesta categoria.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lista.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
