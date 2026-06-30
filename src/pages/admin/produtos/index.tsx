import Link from "next/link";
import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { produtos, formatBRL, categorias } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminProdutos() {
  return (
    <AdminLayout>
      <Head><title>Produtos — JD Admin</title></Head>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-medium">Produtos</h1>
            <p className="text-sm text-muted-foreground">{produtos.length} produtos cadastrados</p>
          </div>
          <Link href="/admin/produtos/novo">
            <Button className="rounded-full"><Plus className="h-4 w-4" /> Adicionar produto</Button>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-left">Categoria</th>
                <th className="px-4 py-3 text-right">Preço</th>
                <th className="px-4 py-3 text-left">Disponibilidade</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => {
                const cat = categorias.find((c) => c.slug === p.categoria);
                return (
                  <tr key={p.id} className="border-t border-border/60 hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.img} alt="" className="h-11 w-11 rounded-lg object-cover" />
                        <div>
                          <div className="line-clamp-1 font-medium">{p.nome}</div>
                          <div className="text-xs text-muted-foreground">SKU {p.id.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{cat?.nome}</td>
                    <td className="px-4 py-3 text-right font-medium">{formatBRL(p.preco)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${p.estoque ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"}`}>
                        {p.estoque ? "Em estoque" : "Sob encomenda"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/produtos/${p.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-3.5 w-3.5" /></Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
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
