import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "@/types/product";
import { toast } from "sonner";
import { AlertCircle, ShoppingBag, StopCircle, Trash } from "lucide-react";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
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
          items: [...get().items, data],
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
    }
  )
);
