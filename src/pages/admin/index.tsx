import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { formatBRL, produtos } from "@/lib/data";
import { TrendingUp, ShoppingCart, Users, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { l: "Faturamento (mês)", v: formatBRL(184320), d: "+12,4%", up: true, i: TrendingUp },
  { l: "Pedidos", v: "284", d: "+8,1%", up: true, i: ShoppingCart },
  { l: "Novos clientes", v: "37", d: "+22%", up: true, i: Users },
  { l: "Produtos ativos", v: "2.512", d: "-1,2%", up: false, i: Package },
];

const recentes = [
  { id: "#10293", cli: "Floricultura Bela Flor", t: 1284.5, s: "Pago" },
  { id: "#10292", cli: "Casa da Rosa", t: 892.0, s: "Aguardando" },
  { id: "#10291", cli: "Studio Verde", t: 2418.9, s: "Enviado" },
  { id: "#10290", cli: "Jardim das Hortênsias", t: 412.0, s: "Pago" },
  { id: "#10289", cli: "Atelier das Flores", t: 1980.3, s: "Encomenda" },
];

const statusColor: Record<string, string> = {
  Pago: "bg-success/15 text-success",
  Aguardando: "bg-warning/20 text-warning-foreground",
  Enviado: "bg-primary/15 text-primary",
  Encomenda: "bg-warning/20 text-warning-foreground",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Head><title>Dashboard — JD Admin</title></Head>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-medium">Olá, João 👋</h1>
          <p className="text-sm text-muted-foreground">Visão geral da operação nas últimas 30 dias.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.i className="h-4 w-4" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.d}
                </span>
              </div>
              <div className="mt-4 font-display text-2xl font-semibold">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-medium">Pedidos recentes</h2>
              <a href="#" className="text-xs font-medium text-primary hover:underline">Ver todos</a>
            </div>
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left">Pedido</th>
                    <th className="px-4 py-3 text-left">Cliente</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentes.map((r) => (
                    <tr key={r.id} className="border-t border-border/60 hover:bg-muted/40">
                      <td className="px-4 py-3 font-medium">{r.id}</td>
                      <td className="px-4 py-3">{r.cli}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatBRL(r.t)}</td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${statusColor[r.s]}`}>{r.s}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="mb-5 font-display text-xl font-medium">Mais vendidos</h2>
            <ul className="space-y-3">
              {produtos.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <img src={p.img} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-sm font-medium">{p.nome}</div>
                    <div className="text-xs text-muted-foreground">{formatBRL(p.preco)}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{((p.id.charCodeAt(p.id.length - 1) % 60) + 20)}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
