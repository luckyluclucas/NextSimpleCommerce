"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import { ShoppingCartIcon } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export default function CartPage() {
  const { cart, decreaseFromCart, increaseFromCart, removeFromCart } =
    useCart();

  return (
    <main className="mt-[100px] md:mt-0 max-w-7xl flex flex-col w-full min-h-full mx-auto p-6 content-center justify-center space-y-6">
      <h1 className="text-2xl font-semibold flex flex-col-1 w-full px-2 border-b-[1px] py-2">
        Seu Carrinho
        <ShoppingCartIcon className="my-auto ml-auto" />
      </h1>

      {cart.length === 0 ? (
        <p className="text-muted-foreground">Seu carrinho está vazio.</p>
      ) : (
        <div className="grid w-full md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => {
              const mainImage = item.product.images.find((img) => img.isMain);
              return (
                <Card
                  className="bg-transparent dark:bg-background"
                  key={item.productId}
                >
                  <CardContent className="flex flex-col md:flex-row gap-4 p-4 items-center">
                    <img
                      src={mainImage?.imageUrl}
                      alt={mainImage?.altText}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        R$ {item.product.price}
                      </p>
                      <div className="mt-2 flex gap-2 items-center">
                        <Button
                          variant="outline"
                          className="rounded-full bg-secondary hover:bg-secondary hover:cursor-pointer"
                          size="xs"
                          onClick={() => decreaseFromCart(item.productId)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          className="rounded-full bg-secondary hover:bg-secondary hover:cursor-pointer"
                          size="xs"
                          onClick={() => increaseFromCart(item.productId)}
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          className="rounded-full hover:text-white hover:cursor-pointer"
                          size="sm"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                    <div className="text-right font-medium">
                      R${" "}
                      {(parseInt(item.product.price) * item.quantity).toFixed(
                        2
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="col-span-1 justify-center">
            <Card className="mx-auto bg-transparent dark:bg-background">
              <CardContent className="p-4 space-y-4">
                <h2 className="text-xl font-semibold">Resumo do Pedido</h2>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span>R$ --</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>R$ {}</span>
                </div>
                <Button className="w-full mt-4">Finalizar Compra</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
