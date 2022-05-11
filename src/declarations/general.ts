export interface TProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>;
  isEditable: boolean;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface TStore {
  products: {
    [id: string]: TProduct;
  };
}
