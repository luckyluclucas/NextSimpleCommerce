import { useContext } from "react";
import CartContext from "@/app/contexts/cartContext";

export default function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart failed at getting Context");
  }

  return context;
}
