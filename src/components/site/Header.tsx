import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingBag, Search } from "lucide-react";
import { useState } from "react";
import { useCarrinho } from "@/lib/cart";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const nav = [
  { href: "/produtos", label: "Produtos" },
  { href: "/categorias", label: "Categorias" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCarrinho();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="hidden border-b border-border/60 bg-muted/50 py-1.5 text-xs text-muted-foreground md:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-1 px-4 sm:px-6">
          <span className="leading-relaxed">Venda exclusiva para CNPJ · Entregas para todo o Sul do Brasil</span>
          <Link href="/cadastro" className="font-medium text-foreground hover:text-primary whitespace-nowrap">
            Cadastre sua empresa →
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            </Button>
          </Link>
          <Link href="/cadastro" className="hidden sm:block">
            <Button size="sm" className="rounded-full">Entrar</Button>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <SheetHeader className="border-b p-5">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-3">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link href="/cadastro" onClick={() => setOpen(false)} className="mt-3">
                  <Button className="w-full rounded-full">Entrar / Cadastrar</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
