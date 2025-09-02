import { useContext } from "react";
import { CartContext } from "./CartContext";

function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("use CartContext outside of provider");
  return context;
}

export { useCartContext };
