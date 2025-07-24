import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "sonner";
import { Heart, HeartCrack, Trash } from "lucide-react";

interface UseLovedProductsType {
  lovedItems: ProductType[];
  addLoveItem: (data: ProductType) => void;
  removeLovedItem: (id: number) => void;
}

export const useLovedProducts = create(
  persist<UseLovedProductsType>(
    (set, get) => ({
      lovedItems: [],
      addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find(
          (item) => item.id === data.id
        );
        if (existingItem) {
          return toast(
            <div className="flex gap-2 items-center">
              <HeartCrack />
              El producto ya existe en la lista.
            </div>
          );
        }

        set({
          lovedItems: [...get().lovedItems, data],
        });
        toast(
          <div className="flex gap-2 items-center">
            <Heart />
            Producto agregado a tus favoritos.
          </div>
        );
      },
      removeLovedItem: (id: number) => {
        set({
          lovedItems: [...get().lovedItems.filter((item) => item.id !== id)],
        });
        toast(
          <div className="flex gap-2 items-center">
            <Trash />
            El producto se ha eliminado de la lista.
          </div>
        );
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
