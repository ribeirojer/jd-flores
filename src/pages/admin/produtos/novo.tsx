import Link from "next/link";
import Head from "next/head";
import { AdminLayout } from "@/components/site/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categorias } from "@/lib/data";
import { ArrowLeft, ImagePlus } from "lucide-react";

export default function AdminProdutoNovo() {
  return (
    <AdminLayout>
      <Head><title>Adicionar Produto — JD Admin</title></Head>
      <AdminProdutoForm mode="novo" />
    </AdminLayout>
  );
}

export function AdminProdutoForm({ mode }: { mode: "novo" | "editar" }) {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/produtos" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> Voltar para produtos
        </Link>
        <h1 className="mt-1 font-display text-3xl font-medium">
          {mode === "novo" ? "Adicionar produto" : "Editar produto"}
        </h1>
      </div>
      <form className="grid gap-6 lg:grid-cols-[1.5fr_1fr]" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-6">
          <Card title="Informações básicas">
            <div className="space-y-1.5">
              <Label>Nome do produto</Label>
              <Input className="h-11 rounded-xl" placeholder="Ex.: Papel Kraft 60x60cm" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>SKU</Label>
                <Input className="h-11 rounded-xl" placeholder="JD-0001" />
              </div>
              <div className="space-y-1.5">
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {categorias.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Descrição</Label>
              <Textarea rows={4} className="rounded-xl" />
            </div>
          </Card>

          <Card title="Imagens">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[0,1,2,3].map((i) => (
                <div key={i} className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground hover:border-primary hover:text-primary">
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-5 w-5" />
                    <div className="mt-1 text-[10px] uppercase tracking-wider">Adicionar</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Preço e estoque">
            <div className="space-y-1.5">
              <Label>Preço de atacado (R$)</Label>
              <Input className="h-11 rounded-xl" placeholder="0,00" />
            </div>
            <div className="space-y-1.5">
              <Label>Quantidade em estoque</Label>
              <Input type="number" className="h-11 rounded-xl" placeholder="0" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-3">
              <div>
                <div className="text-sm font-medium">Produto ativo</div>
                <div className="text-xs text-muted-foreground">Visível no catálogo</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-3">
              <div>
                <div className="text-sm font-medium">Sob encomenda</div>
                <div className="text-xs text-muted-foreground">Aceitar pedidos sem estoque</div>
              </div>
              <Switch />
            </div>
          </Card>

          <Card title="Características">
            <Textarea rows={4} placeholder="Uma característica por linha" className="rounded-xl" />
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 rounded-full">Cancelar</Button>
            <Button className="flex-1 rounded-full">Salvar produto</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-border/60 bg-card p-6">
      <h2 className="font-display text-lg font-medium">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
