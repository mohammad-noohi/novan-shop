import { useContext } from "react";
import { OrderContext } from "./OrderContext";

function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) throw new Error("use order context outside of provider");
  return context;
}

export { useOrderContext };
