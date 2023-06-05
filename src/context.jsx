import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./Reducer";
const AppContext = createContext();
import cartItems from "./data";
import {
  CLEART_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./Actions";
import { getTotal } from "./utils";
const url = "https://www.course-api.com/react-useReducer-cart-project";

const intialState = {
  loading: false,
  cart: new Map()
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const { totalAmount, totalCost } = getTotal(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEART_CART });
  };
  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };
  const fetchData = async ()=>{
    dispatch({type:LOADING})
    const reponse = await fetch(url)
    const cart = await reponse.json()
    dispatch({type:DISPLAY_ITEMS,payload:{cart}})
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
