export type CategoryType = {
  id: number;
  name: string;
  description?: string;
  images: {
    id: number;
    url: string;
  }[];
  slug: string;
};
