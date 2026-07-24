import { ProductType } from "@/types/product";

export function getProductColor(product: ProductType): string | undefined {
  const clothing = product.details?.find(
    (detail) => detail.__component === "product.clothing-attributes"
  );
  return clothing?.__component === "product.clothing-attributes"
    ? clothing.color
    : undefined;
}

export function getProductSize(product: ProductType): string | undefined {
  const clothing = product.details?.find(
    (detail) => detail.__component === "product.clothing-attributes"
  );
  return clothing?.__component === "product.clothing-attributes"
    ? clothing.size
    : undefined;
}

export function getProductMaterial(product: ProductType): string | undefined {
  const jewelry = product.details?.find(
    (detail) => detail.__component === "product.jewelry-attributes"
  );
  return jewelry?.__component === "product.jewelry-attributes"
    ? jewelry.material
    : undefined;
}

export function getProductBadge(product: ProductType): string | undefined {
  return getProductColor(product) ?? getProductMaterial(product);
}

export function hasClothingAttributes(product: ProductType): boolean {
  return (
    product.details?.some(
      (detail) => detail.__component === "product.clothing-attributes"
    ) ?? false
  );
}
