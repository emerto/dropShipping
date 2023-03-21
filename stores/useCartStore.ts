import { create } from "zustand";
import { Database } from "../types/supabase";

type product = Database["public"]["Tables"]["products"]["Row"];

export interface CartStore {
  cart: product[];
  total: number;
  addToCart: (item: product) => void;
  removeFromCart: (item: product) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  total: 0,
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
      total: state.total + item.price,
    })),
  removeFromCart: (item) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== item.id),
      total: state.total - item.price,
    })),
}));
