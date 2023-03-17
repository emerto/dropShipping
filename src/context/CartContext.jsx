import { createContext, useReducer } from "react";

export const CartContext = createContext();
export const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        //! Get the store ID of the first product in the cart
        const storeId = state.length > 0 ? state[0].store_id : null;
        //! Check if the product being added is from the same store
        if (storeId && action.payload.store_id !== storeId) {
          return state;
        }
        //! Check if the product is already in the cart
        const tempstate = state.filter(
          (product) => action.payload.id === product.id
        );
        if (tempstate.length > 0) {
          return state;
        } else {
          return [...state, action.payload];
        }
      case "INCREASE":
        const tempstate1 = state.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
        return tempstate1;
      case "DECREASE":
        const tempstate2 = state.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product;
          }
        });
        return tempstate2;
      case "REMOVE":
        const tempstate3 = state.filter(
          (product) => product.id !== action.payload.id
        );
        return tempstate3;
      case "REMOVE_ALL":
        return [];

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, []);
  const info = { state, dispatch };
  return (
    <CartContext.Provider value={info}>{props.children}</CartContext.Provider>
  );
};
