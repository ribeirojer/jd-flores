import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/data";

const encomendas = [
  { id: "ENC-0042", cli: "Floricultura Bela Flor", prod: "Cachepô Terracota Médio", qtd: 60, valor: 11340, prazo: "10 dias", status: "Aguardando fornecedor" },
  { id: "ENC-0041", cli: "Studio Verde", prod: "Cesta Vime Oval Natural", qtd: 24, valor: 6336, prazo: "7 dias", status: "Confirmado" },
  { id: "ENC-0040", cli: "Atelier das Flores", prod: "Vaso Vidro Cilíndrico 30cm", qtd: 48, valor: 18720, prazo: "15 dias", status: "Em produção" },
  { id: "ENC-0039", cli: "Casa da Rosa", prod: "Papel Couché Dourado A2", qtd: 200, valor: 4980, prazo: "5 dias", status: "Enviado" },
];

const statusColor: Record<string, string> = {
  "Aguardando fornecedor": "bg-warning/20 text-warning-foreground",
  "Confirmado": "bg-primary/15 text-primary",
  "Em produção": "bg-accent text-accent-foreground",
  "Enviado": "bg-success/15 text-success",
};

export default function AdminEncomendas() {
  return (
    <AdminLayout>
      <Head><title>Pedidos de Encomenda — JD Admin</title></Head>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-medium">Pedidos de Encomenda</h1>
          <p className="text-sm text-muted-foreground">Produtos sob encomenda aguardando fornecedor.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {encomendas.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{e.id}</div>
                  <h3 className="mt-1 font-display text-lg font-medium">{e.prod}</h3>
                  <div className="text-sm text-muted-foreground">{e.cli}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${statusColor[e.status]}`}>{e.status}</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-sm">
                <div><div className="text-xs text-muted-foreground">Quantidade</div><div className="font-semibold">{e.qtd}</div></div>
                <div><div className="text-xs text-muted-foreground">Valor total</div><div className="font-semibold">{formatBRL(e.valor)}</div></div>
                <div><div className="text-xs text-muted-foreground">Prazo</div><div className="font-semibold">{e.prazo}</div></div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-full">Detalhes</Button>
                <Button size="sm" className="flex-1 rounded-full">Atualizar status</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
