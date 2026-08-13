import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "@/types/product";
import { toast } from "sonner";
import { AlertCircle, ShoppingBag, StopCircle, Trash } from "lucide-react";

export type CartItem = ProductType & { quantity: number };

interface CartStore {
  items: CartItem[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeAll: () => void;
}
export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (existingItem) {
          return toast(
            <div className="flex items-center gap-2">
              El producto ya existe en el carrito.
            </div>
          );
        }
        set({
          items: [...get().items, { ...data, quantity: 1 }],
        });
        toast(
          <div className="flex items-center gap-2">
            <ShoppingBag />
            Producto agregado al carrito
          </div>
        );
      },

      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast(
          <div className="flex items-center gap-2">
            <Trash />
            Producto eliminado del carrito
          </div>
        );
      },

      increaseQuantity: (id: number) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },

      decreaseQuantity: (id: number) => {
        set({
          items: get().items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        });
      },

      removeAll: () => {
        set({ items: [] });
        toast(
          <>
            <Trash />
            "Todos los productos fueron eliminados del carrito."
          </>
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as CartStore;
        return {
          ...state,
          items: (state?.items ?? []).map((item) => ({
            ...item,
            quantity: item.quantity ?? 1,
          })),
        };
      },
    }
  )
);
