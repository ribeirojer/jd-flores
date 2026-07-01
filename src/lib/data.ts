export const categorias = [
  { slug: "papeis", nome: "Papéis para Buquê", img: "/cat-papeis.jpg", desc: "Kraft, seda e couché em variados tamanhos." },
  { slug: "cachepots", nome: "Cachepôs", img: "/cat-cachepots.jpg", desc: "Cerâmica, terracota e tons neutros." },
  { slug: "vasos", nome: "Vasos", img: "/cat-vasos.jpg", desc: "Vidro e cerâmica para arranjos." },
  { slug: "espumas", nome: "Espumas Florais", img: "/cat-espumas.jpg", desc: "Para arranjos secos e frescos." },
  { slug: "cestas", nome: "Cestas", img: "/cat-cestas.jpg", desc: "Vime, rattan e fibras naturais." },
  { slug: "fitas", nome: "Fitas e Acessórios", img: "/cat-fitas.jpg", desc: "Cetim, gorgurão e detalhes finos." },
  { slug: "sprays", nome: "Sprays Florais", img: "/cat-sprays.jpg", desc: "Sprays para colorir arranjos, folhas e flores." },
];

export type ProdutoVariante = {
  nome: string;
  cor: string;
  preco?: number;
};

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  img: string;
  estoque: boolean;
  descricao: string;
  variantes?: ProdutoVariante[];
};

export const produtos: Produto[] = [
  { id: "p1", nome: "Papel Kraft Premium 60x60cm (100un)", preco: 89.9, categoria: "papeis", img: "/cat-papeis.jpg", estoque: true, descricao: "Folhas de papel kraft de alta gramatura ideais para buquês rústicos e arranjos modernos." },
  { id: "p2", nome: "Papel Seda Cru 50x70cm (500un)", preco: 145.0, categoria: "papeis", img: "/cat-papeis.jpg", estoque: true, descricao: "Papel seda em tom cru, leve e flexível para envolver buquês delicados." },
  { id: "p3", nome: "Cachepô Cerâmica Off-White P (12un)", preco: 219.0, categoria: "cachepots", img: "/cat-cachepots.jpg", estoque: true, descricao: "Cachepôs em cerâmica fosca branca, acabamento artesanal." },
  { id: "p4", nome: "Cachepô Terracota Médio (10un)", preco: 189.0, categoria: "cachepots", img: "/cat-cachepots.jpg", estoque: false, descricao: "Cachepô em terracota natural, ideal para suculentas e arranjos." },
  { id: "p5", nome: "Vaso Vidro Cilíndrico 20cm (24un)", preco: 312.0, categoria: "vasos", img: "/cat-vasos.jpg", estoque: true, descricao: "Vaso transparente em vidro temperado, formato cilíndrico." },
  { id: "p6", nome: "Espuma Floral Verde Bloco (24un)", preco: 96.5, categoria: "espumas", img: "/cat-espumas.jpg", estoque: true, descricao: "Bloco de espuma floral fenólica para arranjos hidratados." },
  { id: "p7", nome: "Cesta Vime Oval Natural (6un)", preco: 264.0, categoria: "cestas", img: "/cat-cestas.jpg", estoque: false, descricao: "Cesta artesanal de vime, perfeita para presentes e arranjos." },
  { id: "p8", nome: "Fita Cetim Verde Sálvia 38mm (10m)", preco: 22.9, categoria: "fitas", img: "/cat-fitas.jpg", estoque: true, descricao: "Fita de cetim premium em verde sálvia, acabamento elegante." },
  {
    id: "spray-150",
    nome: "Spray Floral 150ml",
    preco: 12.9,
    categoria: "sprays",
    img: "/spray-produto.jpg",
    estoque: true,
    descricao: "Spray floral de alta cobertura para pintar arranjos, folhas e flores. Secagem rápida, acabamento uniforme e cores vibrantes. Escolha a cor desejada abaixo.",
    variantes: [
      { nome: "Branco", cor: "#F5F5F5" },
      { nome: "Vermelho", cor: "#DC2626" },
      { nome: "Rosa", cor: "#EC4899" },
      { nome: "Azul", cor: "#2563EB" },
      { nome: "Amarelo", cor: "#EAB308" },
      { nome: "Verde", cor: "#16A34A" },
      { nome: "Dourado", cor: "#D4A017" },
      { nome: "Prateado", cor: "#A8A8A8" },
      { nome: "Roxo", cor: "#7C3AED" },
      { nome: "Laranja", cor: "#EA580C" },
      { nome: "Preto", cor: "#1F1F1F" },
      { nome: "Marrom", cor: "#78350F" },
    ],
  },
  {
    id: "spray-300",
    nome: "Spray Floral 300ml",
    preco: 19.9,
    categoria: "sprays",
    img: "/spray-produto.jpg",
    estoque: true,
    descricao: "Spray floral tamanho grande (300ml). Ideal para uso profissional em arranjos maiores. Alta cobertura, secagem rápida e acabamento uniforme.",
    variantes: [
      { nome: "Branco", cor: "#F5F5F5" },
      { nome: "Vermelho", cor: "#DC2626" },
      { nome: "Rosa", cor: "#EC4899" },
      { nome: "Azul", cor: "#2563EB" },
      { nome: "Amarelo", cor: "#EAB308" },
      { nome: "Verde", cor: "#16A34A" },
      { nome: "Dourado", cor: "#D4A017" },
      { nome: "Prateado", cor: "#A8A8A8" },
      { nome: "Roxo", cor: "#7C3AED" },
      { nome: "Laranja", cor: "#EA580C" },
    ],
  },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
