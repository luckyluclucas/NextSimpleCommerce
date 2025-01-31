import { createContext } from "react";
import cartItem from "../types/cartItem";
import { product } from "../types/product";

interface CartContextType {
    cart: cartItem[];
    addToCart: (product: product) => void;
    removeFromCart: (id: number) => void;
    decreaseFromCart: (id: number) => void;

}

const CartContext = createContext<CartContextType | undefined>(undefined)

export default CartContext