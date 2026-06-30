import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCarrinho } from "@/lib/cart";
import { formatBRL } from "@/lib/data";
import {
  ArrowLeft, Truck, CreditCard, Barcode, Banknote,
  Shield, Check, MapPin, User, Building2, Mail, Phone,
  Copy,
} from "lucide-react";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

const PAGAMENTOS = [
  { id: "pix", nome: "Pix", icone: Copy, desc: "Pagamento instantâneo · Aprovação imediata" },
  { id: "boleto", nome: "Boleto", icone: Barcode, desc: "Vencimento em 3 dias úteis" },
  { id: "cartao", nome: "Cartão de Crédito", icone: CreditCard, desc: "Em até 12x com juros" },
  { id: "deposito", nome: "Depósito Bancário", icone: Banknote, desc: "Confirmação em até 1 dia útil" },
] as const;

export default function Checkout() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCarrinho();
  const {
    freteId = "padrao",
    freteValor = "0",
    freteNome = "Padrão",
    fretePrazo = "3 a 5 dias úteis",
    cep: cepInicial = "",
  } = router.query;

  const freteValorNum = parseFloat(freteValor as string) || 0;
  const total = subtotal + (freteValorNum ?? 0);

  const [etapa, setEtapa] = useState<"dados" | "pagamento" | "confirmado">("dados");
  const [pagamento, setPagamento] = useState("pix");
  const [cep, setCep] = useState(cepInicial as string);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const buscarCep = (cepValue: string) => {
    const cepLimpo = cepValue.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;
    setBuscandoCep(true);
    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.erro) {
          setLogradouro(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.localidade || "");
          setEstado(data.uf || "");
        }
      })
      .catch(() => {})
      .finally(() => setBuscandoCep(false));
  };

  useEffect(() => {
    buscarCep(cepInicial as string);
  }, [cepInicial]);

  const [pedidoNumero] = useState(() => {
    const now = new Date();
    return `JD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  });

  if (items.length === 0 && etapa !== "confirmado") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="font-display text-3xl font-medium">Nenhum item no carrinho</h1>
          <p className="mt-2 text-muted-foreground">Adicione produtos antes de finalizar o pedido.</p>
          <Link href="/produtos">
            <Button className="mt-6 rounded-full">Ver catálogo</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const dadosValidos = responsavel && email && telefone && cep && logradouro && numero && bairro && cidade && estado;

  return (
    <div className="min-h-screen bg-background">
      <Head><title>Finalizar Pedido — JD Flores e Plantas</title></Head>
      <Header />

      <div className="mx-auto max-w-5xl px-6 py-12">
        {etapa !== "confirmado" && (
          <Link href="/carrinho" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-3 w-3" /> Voltar para o carrinho
          </Link>
        )}

        {etapa === "confirmado" ? (
          <Confirmation
            pedidoNumero={pedidoNumero}
            total={total}
            freteNome={freteNome as string}
            fretePrazo={fretePrazo as string}
            pagamento={pagamento}
            onVoltar={() => {
              clearCart();
              router.push("/produtos");
            }}
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              {etapa === "dados" && (
                <EntregaForm
                  cep={cep} setCep={setCep}
                  logradouro={logradouro} setLogradouro={setLogradouro}
                  numero={numero} setNumero={setNumero}
                  complemento={complemento} setComplemento={setComplemento}
                  bairro={bairro} setBairro={setBairro}
                  cidade={cidade} setCidade={setCidade}
                  estado={estado} setEstado={setEstado}
                  responsavel={responsavel} setResponsavel={setResponsavel}
                  email={email} setEmail={setEmail}
                  telefone={telefone} setTelefone={setTelefone}
                  onAvancar={() => setEtapa("pagamento")}
                  dadosValidos={!!dadosValidos}
                  buscandoCep={buscandoCep}
                  onBuscarCep={buscarCep}
                />
              )}

              {etapa === "pagamento" && (
                <PagamentoForm
                  pagamento={pagamento}
                  setPagamento={setPagamento}
                  pedidoNumero={pedidoNumero}
                  total={total}
                  clearCart={clearCart}
                  onConfirmar={() => setEtapa("confirmado")}
                  onVoltar={() => setEtapa("dados")}
                />
              )}
            </div>

            <ResumoLateral
              items={items}
              subtotal={subtotal}
              freteValor={freteValorNum}
              freteNome={freteNome as string}
              fretePrazo={fretePrazo as string}
              total={total}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function EntregaForm({
  cep, setCep, logradouro, setLogradouro, numero, setNumero,
  complemento, setComplemento, bairro, setBairro,
  cidade, setCidade, estado, setEstado,
  responsavel, setResponsavel, email, setEmail, telefone, setTelefone,
  onAvancar, dadosValidos, buscandoCep, onBuscarCep,
}: {
  cep: string; setCep: Dispatch<SetStateAction<string>>;
  logradouro: string; setLogradouro: Dispatch<SetStateAction<string>>;
  numero: string; setNumero: Dispatch<SetStateAction<string>>;
  complemento: string; setComplemento: Dispatch<SetStateAction<string>>;
  bairro: string; setBairro: Dispatch<SetStateAction<string>>;
  cidade: string; setCidade: Dispatch<SetStateAction<string>>;
  estado: string; setEstado: Dispatch<SetStateAction<string>>;
  responsavel: string; setResponsavel: Dispatch<SetStateAction<string>>;
  email: string; setEmail: Dispatch<SetStateAction<string>>;
  telefone: string; setTelefone: Dispatch<SetStateAction<string>>;
  onAvancar: () => void;
  dadosValidos: boolean;
  buscandoCep: boolean;
  onBuscarCep: (cep: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="mb-5 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-medium">Dados do responsável</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Nome completo *</Label>
            <Input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} className="h-11 rounded-xl" placeholder="Maria Silva" />
          </div>
          <div className="space-y-1.5">
            <Label>E-mail *</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-11 rounded-xl" placeholder="contato@floricultura.com" />
          </div>
          <div className="space-y-1.5">
            <Label>Telefone *</Label>
            <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} className="h-11 rounded-xl" placeholder="(47) 96998-0463" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="mb-5 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-medium">Endereço de entrega</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>CEP *</Label>
            <div className="relative">
              <Input value={cep} onChange={(e) => setCep(e.target.value)} onBlur={(e) => onBuscarCep(e.target.value)} className="h-11 rounded-xl" placeholder="00000-000" maxLength={9} />
              {buscandoCep && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Logradouro *</Label>
            <Input value={logradouro} onChange={(e) => setLogradouro(e.target.value)} className="h-11 rounded-xl" placeholder="Rua, Avenida..." />
          </div>
          <div className="space-y-1.5">
            <Label>Número *</Label>
            <Input value={numero} onChange={(e) => setNumero(e.target.value)} className="h-11 rounded-xl" placeholder="123" />
          </div>
          <div className="space-y-1.5">
            <Label>Complemento</Label>
            <Input value={complemento} onChange={(e) => setComplemento(e.target.value)} className="h-11 rounded-xl" placeholder="Sala 1, Bloco A..." />
          </div>
          <div className="space-y-1.5">
            <Label>Bairro *</Label>
            <Input value={bairro} onChange={(e) => setBairro(e.target.value)} className="h-11 rounded-xl" placeholder="Centro" />
          </div>
          <div className="space-y-1.5">
            <Label>Cidade *</Label>
            <Input value={cidade} onChange={(e) => setCidade(e.target.value)} className="h-11 rounded-xl" placeholder="Joinville" />
          </div>
          <div className="space-y-1.5">
            <Label>Estado *</Label>
            <Input value={estado} onChange={(e) => setEstado(e.target.value)} className="h-11 rounded-xl" placeholder="SC" maxLength={2} />
          </div>
        </div>
      </div>

      <Button size="lg" className="w-full rounded-full" onClick={onAvancar} disabled={!dadosValidos}>
        Continuar para pagamento
      </Button>
    </div>
  );
}

function PagamentoForm({
  pagamento, setPagamento, pedidoNumero, total, clearCart, onConfirmar, onVoltar,
}: {
  pagamento: string; setPagamento: (v: string) => void;
  pedidoNumero: string; total: number;
  clearCart: () => void; onConfirmar: () => void; onVoltar: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="mb-5 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-medium">Forma de pagamento</h2>
        </div>
        <div className="space-y-3">
          {PAGAMENTOS.map((p) => (
            <label
              key={p.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                pagamento === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}
            >
              <input type="radio" name="pagamento" className="h-4 w-4 accent-primary" checked={pagamento === p.id} onChange={() => setPagamento(p.id)} />
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <p.icone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{p.nome}</div>
                <div className="text-xs text-muted-foreground">{p.desc}</div>
              </div>
              {pagamento === p.id && (
                <Check className="ml-auto h-5 w-5 text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="mb-5 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-medium">Confirmar pedido</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Ao confirmar, seu pedido será enviado para análise de cadastro CNPJ. A aprovação costuma sair em até 1 dia útil.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 rounded-full" onClick={onVoltar}>
            Voltar
          </Button>
          <Button size="lg" className="flex-1 rounded-full" onClick={onConfirmar}>
            <Check className="h-4 w-4" /> Confirmar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}

function ResumoLateral({
  items, subtotal, freteValor, freteNome, fretePrazo, total,
}: {
  items: { nome: string; preco: number; qtd: number; img: string }[];
  subtotal: number; freteValor: number; freteNome: string; fretePrazo: string; total: number;
}) {
  return (
    <aside className="self-start rounded-2xl border border-border/60 bg-card p-6 lg:sticky lg:top-24">
      <h2 className="font-display text-xl font-medium">Resumo do pedido</h2>

      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <img src={it.img} alt={it.nome} className="h-12 w-12 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <div className="line-clamp-1 text-sm font-medium">{it.nome}</div>
              <div className="text-xs text-muted-foreground">
                Qtd: {it.qtd} · {formatBRL(it.preco)}
              </div>
            </div>
            <div className="text-sm font-semibold">{formatBRL(it.preco * it.qtd)}</div>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-border pt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Truck className="h-3.5 w-3.5" />
          <span>{freteNome} · {fretePrazo}</span>
          <span className="ml-auto">{freteValor === 0 ? <span className="text-success font-semibold">Grátis</span> : formatBRL(freteValor)}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4 flex justify-between">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="font-display text-2xl font-semibold text-primary">{formatBRL(total)}</span>
      </div>
    </aside>
  );
}

function Confirmation({
  pedidoNumero, total, freteNome, fretePrazo, pagamento, onVoltar,
}: {
  pedidoNumero: string; total: number; freteNome: string; fretePrazo: string;
  pagamento: string; onVoltar: () => void;
}) {
  const pagamentoLabel = PAGAMENTOS.find((p) => p.id === pagamento)?.nome ?? pagamento;
  return (
    <div className="mx-auto max-w-lg text-center py-12">
      <div className="grid h-20 w-20 place-items-center mx-auto rounded-full bg-success/15">
        <Check className="h-10 w-10 text-success" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-medium">Pedido confirmado!</h1>
      <p className="mt-2 text-muted-foreground">
        Seu pedido <strong className="text-foreground">{pedidoNumero}</strong> foi enviado para análise.
      </p>

      <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 text-left space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Nº do pedido</span>
          <span className="font-semibold font-mono">{pedidoNumero}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-display font-semibold text-primary">{formatBRL(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Frete</span>
          <span>{freteNome} · {fretePrazo}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pagamento</span>
          <span className="font-medium">{pagamentoLabel}</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-left">
            Em até <strong>1 dia útil</strong> você receberá um e-mail com a confirmação do cadastro CNPJ e os dados para pagamento.
          </p>
        </div>
      </div>

      <Button size="lg" className="mt-8 rounded-full" onClick={onVoltar}>
        Continuar comprando
      </Button>
    </div>
  );
}
