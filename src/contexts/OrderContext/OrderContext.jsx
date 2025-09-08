import { createContext } from "react";

const OrderContext = createContext();

function OrderProvider({ children }) {
  // States  , functions...

  return <OrderContext.Provider value={{}}>{children}</OrderContext.Provider>;
}

export { OrderContext, OrderProvider };
