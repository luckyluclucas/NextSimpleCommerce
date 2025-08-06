"use client";
import CartContext from "@/app/contexts/cartContext";
import { ReactNode, useState } from "react";
import cartItem from "../types/cartItem";
import { product } from "../types/product";
import { useEffect } from "react";

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<cartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartContext");
      if (storedCart) {
        return JSON.parse(storedCart);
      } else {
        return [];
      }
    }
  });

  useEffect(() => {
    localStorage.setItem("cartContext", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: product) => {
    setCart((prevCart) => {
      const cartHasProduct = prevCart.find((p) => p.productId === product.id);
      if (cartHasProduct) {
        return prevCart.map((p) =>
          p.productId === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        const NewCartItem: cartItem = {
          productId: product.id,
          product: product,
          quantity: 1,
        };
        return [...prevCart, NewCartItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.productId !== id)
    );
  };

  const decreaseFromCart = (id: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((p) => p.quantity > 0);
    });
  };

  const increaseFromCart = (id: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseFromCart,
        increaseFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
