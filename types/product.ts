export type JewelryAttributes = {
  __component: "product.jewelry-attributes";
  id: number;
  material?: string;
};

export type ClothingAttributes = {
  __component: "product.clothing-attributes";
  id: number;
  color?: string;
  size?: string;
};

export type ProductDetail = JewelryAttributes | ClothingAttributes;

export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  price: number;
  details: ProductDetail[];
  images: {
    id: number;
    url: string;
  }[];
  category: {
    data: {
      attributes: {
        slug: string;
        categoryName: string;
      };
    };
  };
};
