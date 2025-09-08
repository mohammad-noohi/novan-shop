import { useContext } from "react";
import { DiscountContext } from "./DiscountContext";

function useDiscountContext() {
  const context = useContext(DiscountContext);
  if (context === undefined) throw new Error("use DiscountContext outside of provider");
  return context;
}

export { useDiscountContext };
