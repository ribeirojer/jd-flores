import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from "react";
import { type Produto, produtos } from "@/lib/data";

type CartItem = {
  id: string;
  nome: string;
  preco: number;
  img: string;
  qtd: number;
  estoque: boolean;
  variante?: string;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: { id: string; qtd?: number; variante?: string } }
  | { type: "REMOVE_ITEM"; payload: { id: string; variante?: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; qtd: number; variante?: string } }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const vid = action.payload.variante ?? "";
      const existing = state.items.find(
        (i) => i.id === action.payload.id && (i.variante ?? "") === vid
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id && (i.variante ?? "") === vid
              ? { ...i, qtd: i.qtd + (action.payload.qtd ?? 1) }
              : i
          ),
        };
      }
      const produto = produtos.find((p) => p.id === action.payload.id);
      if (!produto) return state;
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: produto.id,
            nome: action.payload.variante ? `${produto.nome} — ${action.payload.variante}` : produto.nome,
            preco: produto.preco,
            img: produto.img,
            estoque: produto.estoque,
            qtd: action.payload.qtd ?? 1,
            variante: action.payload.variante,
          },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) =>
          i.id === action.payload.id && (i.variante ?? "") === (action.payload.variante ?? "")
            ? false
            : true
        ),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && (i.variante ?? "") === (action.payload.variante ?? "")
            ? { ...i, qtd: Math.max(1, action.payload.qtd) }
            : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (id: string, qtd?: number, variante?: string) => void;
  removeItem: (id: string, variante?: string) => void;
  updateQty: (id: string, qtd: number, variante?: string) => void;
  clearCart: () => void;
};

const CART_KEY = "jd-carrinho";

function loadCart(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [] };
    const items = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(items)) return { items: [] };
    return { items };
  } catch {
    return { items: [] };
  }
}

function saveCart(state: CartState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state.items));
  } catch {
    // localStorage cheio ou indisponível
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, loadCart);

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const count = state.items.reduce((s, i) => s + i.qtd, 0);
  const subtotal = state.items.reduce((s, i) => s + i.preco * i.qtd, 0);

  const addItem = useCallback((id: string, qtd?: number, variante?: string) => {
    dispatch({ type: "ADD_ITEM", payload: { id, qtd, variante } });
  }, []);

  const removeItem = useCallback((id: string, variante?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, variante } });
  }, []);

  const updateQty = useCallback((id: string, qtd: number, variante?: string) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, qtd, variante } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <CartContext.Provider
      value={{ items: state.items, count, subtotal, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCarrinho deve ser usado dentro de <CartProvider>");
  }
  return ctx;
}
