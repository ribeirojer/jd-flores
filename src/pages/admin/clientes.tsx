import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";

const clientes = [
  { rs: "Floricultura Bela Flor LTDA", cnpj: "12.345.678/0001-01", cid: "Joinville/SC", pedidos: 28, status: "Aprovado" },
  { rs: "Casa da Rosa ME", cnpj: "23.456.789/0001-02", cid: "Curitiba/PR", pedidos: 14, status: "Aprovado" },
  { rs: "Studio Verde LTDA", cnpj: "34.567.890/0001-03", cid: "Florianópolis/SC", pedidos: 41, status: "Aprovado" },
  { rs: "Jardim das Hortênsias", cnpj: "45.678.901/0001-04", cid: "Caxias do Sul/RS", pedidos: 9, status: "Aprovado" },
  { rs: "Flor & Cia EIRELI", cnpj: "56.789.012/0001-05", cid: "Joinville/SC", pedidos: 0, status: "Pendente" },
  { rs: "Atelier das Flores", cnpj: "67.890.123/0001-06", cid: "Londrina/PR", pedidos: 6, status: "Aprovado" },
];

export default function AdminClientes() {
  return (
    <AdminLayout>
      <Head><title>Clientes — JD Admin</title></Head>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-medium">Clientes</h1>
          <p className="text-sm text-muted-foreground">{clientes.length} empresas cadastradas</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Razão Social</th>
                <th className="px-4 py-3 text-left">CNPJ</th>
                <th className="px-4 py-3 text-left">Cidade</th>
                <th className="px-4 py-3 text-right">Pedidos</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.cnpj} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {c.rs.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-medium">{c.rs}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.cnpj}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.cid}</td>
                  <td className="px-4 py-3 text-right font-medium">{c.pedidos}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                      c.status === "Aprovado" ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"
                    }`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
