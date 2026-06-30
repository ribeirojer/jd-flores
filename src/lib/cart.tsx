import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import { type Produto, produtos } from "@/lib/data";

type CartItem = {
  id: string;
  nome: string;
  preco: number;
  img: string;
  qtd: number;
  estoque: boolean;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: { id: string; qtd?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; qtd: number } }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
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
            nome: produto.nome,
            preco: produto.preco,
            img: produto.img,
            estoque: produto.estoque,
            qtd: action.payload.qtd ?? 1,
          },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
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
  addItem: (id: string, qtd?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qtd: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const count = state.items.reduce((s, i) => s + i.qtd, 0);
  const subtotal = state.items.reduce((s, i) => s + i.preco * i.qtd, 0);

  const addItem = useCallback((id: string, qtd?: number) => {
    dispatch({ type: "ADD_ITEM", payload: { id, qtd } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }, []);

  const updateQty = useCallback((id: string, qtd: number) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, qtd } });
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
