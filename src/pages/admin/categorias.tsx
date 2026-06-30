import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { categorias } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminCategorias() {
  return (
    <AdminLayout>
      <Head><title>Categorias — JD Admin</title></Head>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-medium">Categorias</h1>
            <p className="text-sm text-muted-foreground">{categorias.length} categorias</p>
          </div>
          <Button className="rounded-full"><Plus className="h-4 w-4" /> Nova categoria</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => (
            <div key={c.slug} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
              <img src={c.img} alt="" className="aspect-[5/3] w-full object-cover" />
              <div className="space-y-2 p-5">
                <h3 className="font-display text-lg font-medium">{c.nome}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{c.desc}</p>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="rounded-full"><Edit2 className="h-3 w-3" /> Editar</Button>
                  <Button variant="ghost" size="sm" className="rounded-full text-destructive"><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
