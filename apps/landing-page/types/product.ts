export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  color: string;
  size: string;
  price: number;
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
