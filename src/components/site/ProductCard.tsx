import Link from "next/link";
import { type Produto, formatBRL } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Palette } from "lucide-react";
import { useCarrinho } from "@/lib/cart";

export function ProductCard({ p }: { p: Produto }) {
  const { addItem } = useCarrinho();
  const temVariantes = p.variantes && p.variantes.length > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
      <Link href={`/produto/${p.id}`} className="relative block aspect-square overflow-hidden bg-muted">
        <img
          src={p.img}
          alt={p.nome}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            p.estoque
              ? "bg-success text-success-foreground"
              : "bg-warning text-warning-foreground"
          }`}
        >
          {p.estoque ? "Em Estoque" : "Sob Encomenda"}
        </span>
        {temVariantes && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            <Palette className="h-3 w-3" />+{p.variantes!.length} cores
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={`/produto/${p.id}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-foreground hover:text-primary">
            {p.nome}
          </h3>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">a partir de</div>
            <div className="font-display text-lg font-semibold text-foreground">{formatBRL(p.preco)}</div>
          </div>
          {temVariantes ? (
            <Link href={`/produto/${p.id}`}>
              <Button size="sm" className="rounded-full" variant={p.estoque ? "default" : "secondary"}>
                <Palette className="h-3.5 w-3.5" />
                Escolher cor
              </Button>
            </Link>
          ) : (
            <Button size="sm" className="rounded-full" variant={p.estoque ? "default" : "secondary"} onClick={() => addItem(p.id)}>
              <ShoppingBag className="h-3.5 w-3.5" />
              {p.estoque ? "Comprar" : "Encomendar"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
