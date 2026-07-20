"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formarProce";
import { Separator } from "@/components/ui/separator";
import CartItem from "./components/cart-item";
import { ProductType } from "@/types/product";
import { getWhatsAppUrl } from "@/lib/whatsapp";

function buildWhatsAppMessage(products: ProductType[], totalPrice: number) {
  const itemsById = new Map<number, { product: ProductType; quantity: number }>();
  products.forEach((product) => {
    const existing = itemsById.get(product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      itemsById.set(product.id, { product, quantity: 1 });
    }
  });

  const lines = Array.from(itemsById.values()).map(
    ({ product, quantity }) =>
      `- ${product.productName} x${quantity} - ${formatPrice(
        product.price
      )} c/u - Subtotal: ${formatPrice(product.price * quantity)}`
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
  const { items, removeAll } = useCart();
  const prices = items.map((product) => product.price);
  const totalPrice = prices.reduce((total, price) => total + price, 0);

  const handleWhatsAppCheckout = () => {
    const message = buildWhatsAppMessage(items, totalPrice);
    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>

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
            <p className="mb-3 text-lg font-semibold">Order Sumary</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p>Order Total</p>
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
