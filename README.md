# JD Flores e Plantas — Atacado de Embalagens para Floriculturas

Plataforma de e-commerce B2B para venda de embalagens no atacado. Venda exclusiva para CNPJ, calculadora de frete inteligente e painel administrativo completo.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## Funcionalidades

### Loja
- Catálogo com busca e filtros (categoria, preço, disponibilidade)
- Página de produto com galeria, descrição e compra
- Carrinho com estado global (Context + useReducer)
- Calculadora de frete com ViaCEP — detecta cidade/estado automaticamente
- Múltiplas opções de envio (Econômico, Padrão, Expresso)
- Frete grátis automático para pedidos acima de R$ 500
- Checkout completo: dados de entrega → pagamento → confirmação
- Cadastro CNPJ com fluxo de aprovação

### Painel administrativo
- Dashboard com métricas (faturamento, pedidos, clientes)
- CRUD de produtos e categorias
- Gestão de pedidos com status (Pago, Enviado, Entregue)
- Controle de estoque com alerta de mínimo
- Gestão de encomendas (aguardando fornecedor, em produção, enviado)
- Lista de clientes com status de aprovação CNPJ

### Técnico
- 21 páginas (13 públicas + 8 admin)
- 10 componentes UI baseados em Radix (Button, Input, Select, Sheet, Slider, etc.)
- Tema customizado com dark mode (CSS variables via Tailwind v4)
- Totalmente responsivo
- TypeScript em todo o projeto

---

## Stack

| Área | Tecnologia |
|------|-----------|
| Framework | Next.js 16 (Pages Router) |
| Biblioteca | React 19 |
| Estilos | Tailwind CSS v4 |
| Componentes | Radix UI + Lucide Icons |
| Estado do carrinho | React Context + useReducer |
| Tipografia | Fraunces (display) + Inter (sans) |

### Backend (a implementar)

| Área | Sugestão |
|------|----------|
| Banco de dados | [Supabase](https://supabase.com) (PostgreSQL, grátis até 500 MB) |
| Autenticação | Supabase Auth (CNPJ + aprovação admin) |
| Pagamentos | [Mercado Pago](https://mercadopago.com.br) (PIX 1%, boleto, cartão) |
| Emails | [Resend](https://resend.com) (3.000/mês grátis) |
| Hospedagem | [Vercel](https://vercel.com) (grátis até 100 GB/mês) |
| Domínio | [registro.br](https://registro.br) (~R$ 40/ano) |

---

## Rodando localmente

```bash
git clone git@github.com:ribeirojer/jd-flores.git
cd jd-flores
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Estrutura

```
src/
├── components/
│   ├── site/           # Logo, Header, Footer, ProductCard, AdminLayout
│   └── ui/             # Button, Input, Label, Checkbox, Slider, Switch,
│                       # Textarea, Sheet, Select, Separator
├── lib/
│   ├── cart.tsx         # CartContext (estado global do carrinho)
│   ├── data.ts          # Dados mock (produtos, categorias, formatBRL)
│   └── utils.ts         # cn() — clsx + tailwind-merge
├── pages/
│   ├── index.tsx        # Homepage
│   ├── produtos.tsx     # Catálogo com filtros
│   ├── produto/[id].tsx # Detalhe do produto
│   ├── categorias.tsx   # Lista de categorias
│   ├── categorias/[slug].tsx
│   ├── carrinho.tsx     # Carrinho + calculadora de frete
│   ├── checkout.tsx     # Dados → pagamento → confirmação
│   ├── cadastro.tsx     # Cadastro CNPJ
│   ├── sobre.tsx        # Página institucional
│   ├── contato.tsx      # Formulário de contato
│   └── admin/           # 8 páginas do painel
│       ├── index.tsx            # Dashboard
│       ├── produtos/index.tsx   # Lista de produtos
│       ├── produtos/novo.tsx    # Adicionar produto
│       ├── produtos/[id].tsx    # Editar produto
│       ├── categorias.tsx       # Categorias
│       ├── pedidos.tsx          # Pedidos
│       ├── clientes.tsx         # Clientes
│       ├── estoque.tsx          # Controle de estoque
│       └── encomendas.tsx       # Encomendas
└── styles/
    └── globals.css      # Tema JD Flores + Tailwind v4
```

---

## Licença

Proprietário — desenvolvido para JD Flores e Plantas.
