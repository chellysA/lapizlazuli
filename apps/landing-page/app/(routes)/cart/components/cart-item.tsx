import { CartItem as CartItemType, useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formarProce";
import { cn } from "@/lib/utils";
import { getProductColor, getProductSize } from "@/lib/product-attributes";
import { Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartItemProps {
  product: CartItemType;
}
const CartItem = (props: CartItemProps) => {
  const { product } = props;
  const router = useRouter();
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();
  const color = getProductColor(product);
  const size = getProductSize(product);

  return (
    <li className="flex py-6 border-b">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <img
          src={`${product.images[0].url}`}
          alt="Product"
          className="w-24h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
        />
      </div>
      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{product.productName}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-3 mt-2">
            {size && (
              <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                {size}
              </p>
            )}
            {color && (
              <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                {color}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center border rounded-full">
              <button
                type="button"
                className="p-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={product.quantity <= 1}
                onClick={() => decreaseQuantity(product.id)}
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} className="cursor-pointer" />
              </button>
              <span className="w-6 text-center">{product.quantity}</span>
              <button
                type="button"
                className="p-1.5"
                onClick={() => increaseQuantity(product.id)}
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} className="cursor-pointer" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Subtotal: {formatPrice(product.price * product.quantity)}
            </p>
          </div>
        </div>
        <div>
          <button
            className={cn(
              "rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition",
            )}
          >
            <X
              size={20}
              className="cursor-pointer"
              onClick={() => removeItem(product.id)}
            />
          </button>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
