import { createContext, useReducer } from "react";
import { Item } from "semantic-ui-react";

export const CartContext = createContext();
export const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        const tempstate = state.filter(
          (product) => action.payload.id === product.id
        );
        if (tempstate.length > 0) {
          return state;
        } else {
          return [...state, action.payload];
        }
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
