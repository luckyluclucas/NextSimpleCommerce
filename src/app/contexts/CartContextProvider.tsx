"use client"
import CartContext from "@/app/contexts/cartContext";
import { ReactNode, useState } from "react";
import cartItem from "../types/cartItem";

export default function CartContextProvider({ children }: {
    children: ReactNode
}) {
    const [cart, setCart] = useState<cartItem[]>([])

    const addToCart = (product: cartItem) => {
        setCart((prevCart) => {
            const cartHasProduct = prevCart.find((p) => p.id === product.id)
            if (cartHasProduct) {
                return prevCart.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }

        })
    }

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== id))
    }

    const decreaseFromCart = (id: number) => {
        setCart((prevCart) => {
            return prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((p) => p.quantity > 0)
        })
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseFromCart }}>
            {children}
        </CartContext.Provider>
    )
}