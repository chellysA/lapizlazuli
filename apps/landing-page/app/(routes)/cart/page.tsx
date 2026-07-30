"use client";

import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formarProce";
import { Separator } from "@/components/ui/separator";
import CartItem from "./components/cart-item";
import { getWhatsAppUrl } from "@/lib/whatsapp";

function buildWhatsAppMessage(products: CartItemType[], totalPrice: number) {
  const lines = products.map(
    (product) =>
      `- ${product.productName} x${product.quantity} - ${formatPrice(
        product.price
      )} c/u - Subtotal: ${formatPrice(product.price * product.quantity)}`
  );

  return [
    "¡Hola! Quiero finalizar la compra de los siguientes productos:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(totalPrice)}`,
  ].join("\n");
}

export default function Page() {
  const { items } = useCart();
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
    const message = buildWhatsAppMessage(items, totalPrice);
    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold">Carrito de Compras</h1>

      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-6 rounded-lg bg-slate-100">
            <p className="mb-3 text-lg font-semibold">Resumen del Pedido</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p>Total del Pedido</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              <Button
                className="w-full cursor-pointer"
                disabled={items.length === 0}
                onClick={handleWhatsAppCheckout}
              >
                Finalizar compra
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
