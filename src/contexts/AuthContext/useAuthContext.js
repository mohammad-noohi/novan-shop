import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("use AuthContext outside of provider");
  return context;
}

export { useAuthContext };
