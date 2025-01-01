import { createContext, useMemo, useReducer } from "react";
export const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          tempId: action.tempId,
          title: action.title,
          price: action.price,
          quantity: action.quantity,
          img: action.img,
          priceOption: action.priceOption,
        },
      ];

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.tempId === action.tempId) {
          arr[index] = {
            ...food,
            quantity: parseInt(action.quantity) + parseInt(food.quantity),
          };
        }
      });
      return arr;

    case "REMOVE":
      // let newarr = [...state];
      // newarr.splice(action.index, 1);
      // return newarr;

      return state.filter((item) => item.id !== action.id);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, item.quantity + action.delta) }
          : item
      );
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);

    default:
      console.log("");
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
