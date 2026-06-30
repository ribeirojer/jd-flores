import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { formatBRL } from "@/lib/data";

const pedidos = [
  { id: "#10293", cli: "Floricultura Bela Flor", data: "29/06/2026", t: 1284.5, s: "Pago", itens: 8 },
  { id: "#10292", cli: "Casa da Rosa", data: "29/06/2026", t: 892.0, s: "Aguardando", itens: 4 },
  { id: "#10291", cli: "Studio Verde", data: "28/06/2026", t: 2418.9, s: "Enviado", itens: 14 },
  { id: "#10290", cli: "Jardim das Hortênsias", data: "28/06/2026", t: 412.0, s: "Pago", itens: 3 },
  { id: "#10289", cli: "Atelier das Flores", data: "27/06/2026", t: 1980.3, s: "Encomenda", itens: 6 },
  { id: "#10288", cli: "Petalla Floricultura", data: "27/06/2026", t: 689.0, s: "Entregue", itens: 5 },
  { id: "#10287", cli: "Flor de Lis", data: "26/06/2026", t: 3120.0, s: "Entregue", itens: 22 },
];

const statusColor: Record<string, string> = {
  Pago: "bg-success/15 text-success",
  Aguardando: "bg-warning/20 text-warning-foreground",
  Enviado: "bg-primary/15 text-primary",
  Encomenda: "bg-warning/20 text-warning-foreground",
  Entregue: "bg-muted text-muted-foreground",
};

export default function AdminPedidos() {
  return (
    <AdminLayout>
      <Head><title>Pedidos — JD Admin</title></Head>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-medium">Pedidos</h1>
          <p className="text-sm text-muted-foreground">{pedidos.length} pedidos no período</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Pedido</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-right">Itens</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{p.id}</td>
                  <td className="px-4 py-3">{p.cli}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.data}</td>
                  <td className="px-4 py-3 text-right">{p.itens}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatBRL(p.t)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${statusColor[p.s]}`}>{p.s}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
