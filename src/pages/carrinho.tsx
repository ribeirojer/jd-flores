import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCarrinho } from "@/lib/cart";
import { formatBRL } from "@/lib/data";
import {
  Trash2, Minus, Plus, Truck, Lock, MapPin, Clock,
  Shield, ChevronRight, AlertCircle, CheckCircle, HelpCircle, ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

type FreteOpcao = {
  id: string;
  nome: string;
  prazo: string;
  valor: number;
};

const FRETE_GRATIS_A_PARTIR = 500;

const CEP_PREFIXOS: Record<string, { nome: string; estado: string; regiao: string }> = {
  "80": { nome: "Curitiba", estado: "PR", regiao: "Sul — Rápida" },
  "81": { nome: "Curitiba", estado: "PR", regiao: "Sul — Rápida" },
  "82": { nome: "Curitiba", estado: "PR", regiao: "Sul — Rápida" },
  "83": { nome: "Curitiba", estado: "PR", regiao: "Sul — Rápida" },
  "84": { nome: "Maringá", estado: "PR", regiao: "Sul — Rápida" },
  "85": { nome: "Cascavel", estado: "PR", regiao: "Sul — Rápida" },
  "86": { nome: "Londrina", estado: "PR", regiao: "Sul — Rápida" },
  "87": { nome: "Maringá", estado: "PR", regiao: "Sul — Rápida" },
  "88": { nome: "Joinville", estado: "SC", regiao: "Sul — Rápida" },
  "89": { nome: "Joinville", estado: "SC", regiao: "Sul — Rápida" },
  "90": { nome: "Porto Alegre", estado: "RS", regiao: "Sul — Rápida" },
  "91": { nome: "Porto Alegre", estado: "RS", regiao: "Sul — Rápida" },
  "92": { nome: "Canoas", estado: "RS", regiao: "Sul — Rápida" },
  "93": { nome: "São Leopoldo", estado: "RS", regiao: "Sul — Rápida" },
  "94": { nome: "Caxias do Sul", estado: "RS", regiao: "Sul — Rápida" },
  "95": { nome: "Caxias do Sul", estado: "RS", regiao: "Sul — Rápida" },
  "96": { nome: "Pelotas", estado: "RS", regiao: "Sul — Rápida" },
  "97": { nome: "Santa Maria", estado: "RS", regiao: "Sul — Rápida" },
  "98": { nome: "Chapecó", estado: "SC", regiao: "Sul — Rápida" },
  "99": { nome: "Passo Fundo", estado: "RS", regiao: "Sul — Rápida" },
};

const ESTADOS_SUL: Record<string, string> = {
  "SC": "Sul — Rápida",
  "PR": "Sul — Rápida",
  "RS": "Sul — Rápida",
};

const valorFretePorRegiao: Record<string, { padrao: number; expresso: number; economico: number }> = {
  "Sul — Entrega Local": { padrao: 0, expresso: 18.5, economico: 0 },
  "Sul — Rápida": { padrao: 35.9, expresso: 59.9, economico: 22.9 },
  "default": { padrao: 45.9, expresso: 79.9, economico: 29.9 },
};

function regiaoPorUF(uf: string): string {
  return ESTADOS_SUL[uf] ?? "default";
}

function detectarRegiaoFallback(cep: string) {
  const limpo = cep.replace(/\D/g, "");
  const prefixo = limpo.slice(0, 2);
  return CEP_PREFIXOS[prefixo] ?? { nome: "Sua cidade", estado: "", regiao: "default" };
}

async function consultarCEP(cep: string): Promise<{ nome: string; estado: string; regiao: string }> {
  const limpo = cep.replace(/\D/g, "");
  try {
    const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
    const data = await res.json();
    if (data.erro) throw new Error("CEP não encontrado");
    return {
      nome: data.localidade,
      estado: data.uf,
      regiao: regiaoPorUF(data.uf),
    };
  } catch {
    return detectarRegiaoFallback(cep);
  }
}

function calcularOpcoesFrete(pesoTotal: number, regiao: string | null): FreteOpcao[] {
  if (!regiao) return [];
  const base = valorFretePorRegiao[regiao] ?? valorFretePorRegiao["default"];
  const fator = 1 + (pesoTotal - 1) * 0.15;
  const opcoes: FreteOpcao[] = [];
  if (base.economico > 0) {
    opcoes.push({ id: "economico", nome: "Econômico", prazo: "5 a 8 dias úteis", valor: Math.round(base.economico * fator * 100) / 100 });
  }
  opcoes.push({ id: "padrao", nome: "Padrão", prazo: "3 a 5 dias úteis", valor: Math.round(base.padrao * fator * 100) / 100 });
  if (base.expresso > 0) {
    opcoes.push({ id: "expresso", nome: "Expresso", prazo: "1 a 2 dias úteis", valor: Math.round(base.expresso * fator * 100) / 100 });
  }
  return opcoes;
}

export default function Carrinho() {
  const router = useRouter();
  const { items, subtotal, removeItem, updateQty } = useCarrinho();
  const [cep, setCep] = useState("");
  const [calculando, setCalculando] = useState(false);
  const [regiao, setRegiao] = useState<{ nome: string; estado: string; regiao: string } | null>(null);
  const [opcoesFrete, setOpcoesFrete] = useState<FreteOpcao[]>([]);
  const [freteSelecionado, setFreteSelecionado] = useState("padrao");

  const pesoTotal = items.reduce((s, i) => s + i.qtd, 0);
  const freteGratis = subtotal >= FRETE_GRATIS_A_PARTIR;
  const freteValor = freteGratis
    ? 0
    : opcoesFrete.find((o) => o.id === freteSelecionado)?.valor ?? null;
  const total = subtotal + (freteValor ?? 0);
  const faltaParaFreteGratis = FRETE_GRATIS_A_PARTIR - subtotal;

  const calcularFrete = async () => {
    if (!cep || cep.replace(/\D/g, "").length < 8) return;
    setCalculando(true);
    const r = await consultarCEP(cep);
    setRegiao(r);
    setOpcoesFrete(calcularOpcoesFrete(pesoTotal, r.regiao));
    setFreteSelecionado("padrao");
    setCalculando(false);
  };

  const handleCepKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") calcularFrete();
  };

  const handleCheckout = () => {
    if (!regiao) return;
    const frete = opcoesFrete.find((o) => o.id === freteSelecionado);
    router.push({
      pathname: "/checkout",
      query: {
        freteId: freteSelecionado,
        freteValor: frete?.valor ?? 0,
        freteNome: frete?.nome ?? "",
        fretePrazo: frete?.prazo ?? "",
        cep,
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Head><title>Carrinho — JD Flores e Plantas</title></Head>
        <Header />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="mx-auto max-w-md">
            <div className="grid h-20 w-20 place-items-center mx-auto rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-medium">Carrinho vazio</h1>
            <p className="mt-2 text-muted-foreground">Seu carrinho está vazio. Explore nosso catálogo.</p>
            <Link href="/produtos">
              <Button className="mt-6 rounded-full">Ver produtos</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Head><title>Carrinho — JD Flores e Plantas</title></Head>
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Início</Link> / <span className="text-foreground">Carrinho</span>
        </nav>
        <h1 className="mt-2 font-display text-4xl font-medium md:text-5xl">Seu pedido</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-[88px_1fr] gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:grid-cols-[100px_1fr_auto] sm:items-center">
                <img src={it.img} alt={it.nome} className="aspect-square w-full rounded-xl object-cover" />
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-medium">{it.nome}</h3>
                  <div className="mt-1 text-xs text-muted-foreground">{formatBRL(it.preco)} / un.</div>
                  <div className="mt-3 flex items-center gap-2 sm:hidden">
                    <QtyBox qtd={it.qtd} onChange={(q) => updateQty(it.id, q)} />
                    <button className="ml-auto text-muted-foreground hover:text-destructive" onClick={() => removeItem(it.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="hidden flex-col items-end gap-3 sm:flex">
                  <div className="font-display text-lg font-semibold">{formatBRL(it.preco * it.qtd)}</div>
                  <div className="flex items-center gap-2">
                    <QtyBox qtd={it.qtd} onChange={(q) => updateQty(it.id, q)} />
                    <button className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-destructive" onClick={() => removeItem(it.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Truck className="h-4 w-4 text-primary" /> Calcular frete e prazo
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={cep} onChange={(e) => setCep(e.target.value)} onKeyDown={handleCepKeyDown} placeholder="Digite seu CEP" className="rounded-full pl-9" maxLength={9} />
                </div>
                <Button className="rounded-full" onClick={calcularFrete} disabled={calculando || cep.replace(/\D/g, "").length < 8}>
                  {calculando ? "Calculando..." : "Calcular"}
                </Button>
              </div>

              {calculando && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Consultando transportadoras na sua região...
                </div>
              )}

              {regiao && !calculando && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-success">
                      {regiao.regiao === "default" ? (
                        <><strong>Sua região</strong> — entregamos para todo o Brasil</>
                      ) : (
                        <><strong>{regiao.nome}, {regiao.estado}</strong> — {regiao.regiao}</>
                      )}
                    </span>
                  </div>

                  {freteGratis ? (
                    <div className="rounded-xl border-2 border-success/50 bg-success/5 p-4">
                      <div className="flex items-center gap-2 font-display text-lg font-semibold text-success">
                        <Truck className="h-5 w-5" /> Frete Grátis!
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Seu pedido ultrapassou {formatBRL(FRETE_GRATIS_A_PARTIR)} e você ganhou frete grátis.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Opções de envio</div>
                      {opcoesFrete.map((op) => (
                        <label key={op.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${freteSelecionado === op.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                          <input type="radio" name="frete" className="h-4 w-4 accent-primary" checked={freteSelecionado === op.id} onChange={() => setFreteSelecionado(op.id)} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">{op.nome}</span>
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{op.prazo}</span>
                            </div>
                          </div>
                          <div className="font-display text-base font-semibold text-primary">{formatBRL(op.valor)}</div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {regiao && !calculando && !freteGratis && opcoesFrete.length === 0 && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-warning/10 p-3 text-sm">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="text-warning-foreground">Não encontramos transportadoras para este CEP. Envie seu pedido e nossa equipe fará uma cotação personalizada.</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <HelpCircle className="h-4 w-4 text-primary" /> Informações de frete
              </div>
              <div className="overflow-hidden rounded-xl border border-border/60">
                <table className="w-full text-xs">
                  <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left">Região</th>
                      <th className="px-3 py-2 text-left">Prazo</th>
                      <th className="px-3 py-2 text-right">Padrão</th>
                      <th className="px-3 py-2 text-right">Expresso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60">
                      <td className="px-3 py-2.5 font-medium">Joinville e região</td>
                      <td className="px-3 py-2.5 text-muted-foreground">24h</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-success">Grátis</td>
                      <td className="px-3 py-2.5 text-right">{formatBRL(18.5)}</td>
                    </tr>
                    <tr className="border-t border-border/60 bg-muted/20">
                      <td className="px-3 py-2.5 font-medium">SC, PR e RS</td>
                      <td className="px-3 py-2.5 text-muted-foreground">3-5 dias</td>
                      <td className="px-3 py-2.5 text-right">{formatBRL(35.9)}</td>
                      <td className="px-3 py-2.5 text-right">{formatBRL(59.9)}</td>
                    </tr>
                    <tr className="border-t border-border/60">
                      <td className="px-3 py-2.5 font-medium">Demais regiões</td>
                      <td className="px-3 py-2.5 text-muted-foreground">5-8 dias</td>
                      <td className="px-3 py-2.5 text-right">{formatBRL(68.9)}</td>
                      <td className="px-3 py-2.5 text-right">{formatBRL(99.9)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" />
                Tabela válida para caixas de até 5kg. Consulte para volumes maiores.
              </div>
            </div>
          </div>

          <aside className="self-start rounded-2xl border border-border/60 bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-2xl font-medium">Resumo</h2>

            {faltaParaFreteGratis > 0 && (
              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs">
                <div className="mb-1.5 flex items-center justify-between text-muted-foreground">
                  <span>Falta para frete grátis</span>
                  <span className="font-semibold text-primary">{formatBRL(faltaParaFreteGratis)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-primary/15">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, (subtotal / FRETE_GRATIS_A_PARTIR) * 100)}%` }} />
                </div>
                <p className="mt-1.5 text-muted-foreground">
                  Adicione mais {formatBRL(faltaParaFreteGratis)} e ganhe <strong className="text-success">frete grátis</strong>! <ChevronRight className="inline h-3 w-3" />
                </p>
              </div>
            )}

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatBRL(subtotal)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Frete</dt>
                <dd>
                  {freteValor !== null ? (
                    freteValor === 0 ? (
                      <span className="font-semibold text-success">Grátis</span>
                    ) : (
                      formatBRL(freteValor)
                    )
                  ) : (
                    <span className="text-xs text-muted-foreground">Calcule o CEP</span>
                  )}
                </dd>
              </div>
              {freteValor !== null && <div className="border-t border-border pt-3" />}
              <div className="flex items-end justify-between">
                <dt className="text-sm text-muted-foreground">Total</dt>
                <dd className="font-display text-3xl font-semibold text-primary">{formatBRL(total)}</dd>
              </div>
            </dl>

            <Button size="lg" className="mt-6 w-full rounded-full" disabled={!regiao} onClick={handleCheckout}>
              <Lock className="h-4 w-4" /> Finalizar Pedido
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pagamento liberado após aprovação do cadastro CNPJ.
            </p>

            <ul className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" /> Compra 100% segura</li>
              <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> Expedição em até 48h úteis</li>
              <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-primary" /> Frete grátis acima de {formatBRL(FRETE_GRATIS_A_PARTIR)}</li>
            </ul>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function QtyBox({ qtd, onChange }: { qtd: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => onChange(Math.max(1, qtd - 1))}><Minus className="h-3 w-3" /></Button>
      <span className="w-7 text-center text-sm font-semibold">{qtd}</span>
      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => onChange(qtd + 1)}><Plus className="h-3 w-3" /></Button>
    </div>
  );
}
