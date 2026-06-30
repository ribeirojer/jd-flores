# Backlog — JD Flores e Plantas

> Última atualização: 30/06/2026

---

## 🔴 CRITICAL (sem backend, dados 100% mock)

- [ ] **1. Banco de dados** — 8 produtos e 6 categorias em array estático (`src/lib/data.ts:1-32`). Sem ORM, sem DB, sem API real.
- [ ] **2. API funcional** — `src/pages/api/hello.ts` é boilerplate. Criar endpoints REST para produtos, categorias, pedidos, clientes.
- [ ] **3. Autenticação/autorização** — Todas as páginas `/admin/*` são públicas. Criar login (CNPJ), middleware de proteção, e sessão.
- [ ] **4. Carrinho com estado global** — Carrinho sempre começa com 3 produtos fixos. Criar contexto/estado de carrinho.
- [ ] **5. Formulários sem ação** — Todos os forms só chamam `e.preventDefault()`. Integrar com API ao criar backend.
- [ ] **6. Imagens de produtos** — Todos os 8 produtos reusam as mesmas 6 imagens de categoria. Criar/fotografar assets reais.

---

## 🟠 HIGH (features quebradas ou incompletas)

- [ ] **7. Search funcional** — Header e admin search bar não fazem nada (`AdminLayout.tsx:72`, `Header.tsx:48`)
- [ ] **8. Botões "Comprar" do ProductCard** — Sem onClick, sem integração com carrinho (`ProductCard.tsx:37`)
- [ ] **9. Botão "Solicitar Encomenda"** — Sem handler (`produto/[id].tsx:115`)
- [ ] **10. Botão "Finalizar Pedido"** — Sem ação mesmo quando habilitado (`carrinho.tsx:345`)
- [ ] **11. Badge do carrinho no header** — Hardcoded em 0 (`Header.tsx:54`)
- [ ] **12. Botões admin (Editar/Excluir/Salvar/Cancelar)** — Todos sem handler (`admin/categorias.tsx:27`, `admin/produtos/index.tsx:58`, `admin/produtos/novo.tsx:106`)
- [ ] **13. Página de login separada** — "Entrar" e "Já possui conta? Entrar" linkam para `/cadastro` (`cadastro.tsx:45`, `Header.tsx:59`)
- [ ] **14. Admin mobile** — Sidebar some no mobile, sem botão hamburger (`AdminLayout.tsx:36`)
- [ ] **15. Validação de formulários** — `react-hook-form` e `zod` instalados mas nunca usados. Forms sem validação.
- [ ] **16. Toast notifications** — `sonner` instalado mas sem uso. Sem feedback visual para ações.
- [ ] **17. Telefones placeholder** — `(47) 3000-0000` e WhatsApp genérico em vários arquivos. Confirmar números reais.

---

## 🟡 MEDIUM (páginas faltando, SEO, UI)

- [ ] **18. Página 404** — Criar `pages/404.tsx` customizada com link para home
- [ ] **19. Página 500/erro** — Criar `pages/_error.tsx`
- [ ] **20. SEO — meta tags** — Só a homepage tem `og:*` e `twitter:*`. Adicionar em todas as páginas de produto/categoria.
- [ ] **21. Structured data (JSON-LD)** — Schema.org para produtos, breadcrumbs e organização.
- [ ] **22. sitemap.xml e robots.txt** — Essencial para SEO de e-commerce.
- [ ] **23. Favicon** — Ainda o favicon padrão do Next.js (`public/favicon.ico`)
- [ ] **24. Paginação** — Catálogo diz ter 2.500 SKUs mas mostra 8 produtos estáticos sem paginação.
- [ ] **25. Admin — filtro/busca de pedidos** — Tabela estática de 7 entradas sem busca (`admin/pedidos.tsx`)
- [ ] **26. Página de confirmação de pedido** — Sem tela pós-checkout.
- [ ] **27. Nome do admin hardcoded** — "João Diretor" no avatar (`AdminLayout.tsx:82`, `admin/index.tsx:34`)
- [ ] **28. Loading states / skeletons** — Sem Suspense, sem loaders.
- [ ] **29. Componente `InstagramIcon` duplicado** — Definido em `Footer.tsx` e `contato.tsx`. Extrair para `components/ui/`.
- [ ] **30. Alt text em imagens** — Várias imagens com `alt=""` vazio nas tabelas admin e thumbnails.
- [ ] **31. LGPD / consentimento de cookies** — Obrigatório para e-commerce no Brasil.
- [ ] **32. Página de detalhe de pedido** — Admin lista pedidos sem poder clicar para ver detalhes.
- [ ] **33. Carrinho: adicionar quantidade de peso real** — Para cálculo de frete mais preciso na simulação.
- [ ] **34. Página de política de frete** — Detalhamento das zonas, prazos e condições.
- [ ] **35. Páginas institucionais** — Termos de uso, política de privacidade, trocas e devoluções.

---

## 🟢 LOW (polimento, acessibilidade, testes)

- [ ] **36. Limpar boilerplate** — Remover `hello.ts`, SVGs placeholder (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)
- [ ] **37. Dark mode toggle** — CSS vars do dark mode existem mas sem toggle no UI (`globals.css:100-118`)
- [ ] **38. ARIA labels** — Faltam em elementos interativos (botão carrinho, busca, nav toggle)
- [ ] **39. Testes** — Zero testes. Configurar Jest + React Testing Library.
- [ ] **40. Analytics** — Sem Google Analytics, Plausible ou similar.
- [ ] **41. README.md** — Ainda o boilerplate do create-next-app.
- [ ] **42. `.env.example`** — Sem template de variáveis de ambiente.
- [ ] **43. Config de otimização de imagens** no `next.config.ts`.
- [ ] **44. Notificações do admin** — Sino (bell) com indicador laranja hardcoded (`AdminLayout.tsx:75`)

---

## 📊 Resumo

| Prioridade | Total | Pendentes |
|-----------|-------|-----------|
| 🔴 Critical | 6 | 6 |
| 🟠 High | 11 | 11 |
| 🟡 Medium | 18 | 18 |
| 🟢 Low | 9 | 9 |
| **Total** | **44** | **44** |

