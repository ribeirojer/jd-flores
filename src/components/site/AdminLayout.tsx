import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  PackagePlus,
  Boxes,
  ClipboardList,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { type ReactNode } from "react";

const nav: { href: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/categorias", label: "Categorias", icon: Tag },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/produtos/novo", label: "Adicionar Produto", icon: PackagePlus },
  { href: "/admin/estoque", label: "Controle de Estoque", icon: Boxes },
  { href: "/admin/encomendas", label: "Pedidos de Encomenda", icon: ClipboardList },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="grid min-h-screen grid-cols-1 bg-muted/30 lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-border/60 bg-sidebar lg:flex lg:flex-col">
        <div className="border-b border-sidebar-border p-5">
          <Logo />
          <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Painel administrativo</div>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-foreground/70 hover:bg-sidebar-accent hover:text-foreground"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-xl bg-primary/5 p-4 text-xs text-muted-foreground">
            <div className="mb-1 font-semibold text-foreground">Precisa de ajuda?</div>
            Suporte JD: (47) 3000-0000
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/85 px-6 py-3.5 backdrop-blur">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar pedidos, produtos, clientes..." className="rounded-full pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-warning" />
            </button>
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1 pr-3">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">JD</div>
              <div className="text-xs">
                <div className="font-semibold">João Diretor</div>
                <div className="text-muted-foreground">Admin</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
