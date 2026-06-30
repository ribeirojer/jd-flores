import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { produtos, categorias } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AdminEstoque() {
  return (
    <AdminLayout>
      <Head><title>Controle de Estoque — JD Admin</title></Head>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-medium">Controle de Estoque</h1>
          <p className="text-sm text-muted-foreground">Atualize quantidades e níveis mínimos.</p>
        </div>

        <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-warning" />
            <div>
              <strong>3 produtos</strong> abaixo do nível mínimo de estoque.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-left">Categoria</th>
                <th className="px-4 py-3 text-right">Atual</th>
                <th className="px-4 py-3 text-right">Mínimo</th>
                <th className="px-4 py-3 text-right">Ajustar</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p, i) => {
                const atual = p.estoque ? (i + 2) * 18 : 0;
                const min = 20;
                return (
                  <tr key={p.id} className="border-t border-border/60 hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.img} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <span className="line-clamp-1 font-medium">{p.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{categorias.find((c) => c.slug === p.categoria)?.nome}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${atual < min ? "text-destructive" : ""}`}>{atual}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{min}</td>
                    <td className="px-4 py-3">
                      <Input type="number" defaultValue={0} className="ml-auto h-8 w-20 rounded-lg text-right" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="outline" className="rounded-full">Salvar</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
