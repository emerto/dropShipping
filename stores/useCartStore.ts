import { create } from "zustand";

type product = {
  id: number;
  name: string;
  price: number;
  store_id: number;
  supplier_prod_image: string;
  supplier_product_id: number;
  quantity: number;
};

export interface CartStore {
  cart: product[];
  total: number;
  addToCart: (item: product) => void;
  removeFromCart: (item: product) => void;
  increaseQuantity: (item: product) => void;
  decreaseQuantity: (item: product) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  total: 0,
  addToCart: (item) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex((i) => i.id === item.id);
      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        const updatedCart = [
          ...state.cart.slice(0, existingItemIndex),
          updatedItem,
          ...state.cart.slice(existingItemIndex + 1),
        ];
        return {
          cart: updatedCart,
          total: state.total + item.price,
        };
      }
      const newItem = { ...item, quantity: 1 };
      return {
        cart: [...state.cart, newItem],
        total: state.total + item.price,
      };
    }),
  removeFromCart: (item) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== item.id),
      total: state.total - item.price * item.quantity,
    })),
  increaseQuantity: (item) =>
    set((state) => {
      const cartItemIndex = state.cart.findIndex((i) => i.id === item.id);
      const cartItem = state.cart[cartItemIndex];
      const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
      const updatedCart = [
        ...state.cart.slice(0, cartItemIndex),
        updatedItem,
        ...state.cart.slice(cartItemIndex + 1),
      ];
      return {
        cart: updatedCart,
        total: state.total + cartItem.price,
      };
    }),
  decreaseQuantity: (item) =>
    set((state) => {
      const cartItemIndex = state.cart.findIndex((i) => i.id === item.id);
      const cartItem = state.cart[cartItemIndex];
      if (cartItem.quantity === 1) {
        return {
          cart: state.cart.filter((i) => i.id !== item.id),
          total: state.total - cartItem.price,
        };
      }
      const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
      const updatedCart = [
        ...state.cart.slice(0, cartItemIndex),
        updatedItem,
        ...state.cart.slice(cartItemIndex + 1),
      ];
      return {
        cart: updatedCart,
        total: state.total - cartItem.price,
      };
    }),
}));
