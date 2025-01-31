import { createContext } from "react";
import cartItem from "../types/cartItem";

interface CartContextType {
    cart: cartItem[];
    addToCart: (product: cartItem) => void;
    removeFromCart: (id: number) => void;
    decreaseFromCart: (id: number) => void;

}

const CartContext = createContext<CartContextType | undefined>(undefined)

export default CartContext