export interface Products {
  id: string;
  name: string;
  fabric: string;
  sizes: Sizes[];
  totalQuantity: number;
  description: string;
  price: number;
  typeProduct: TypeProduct;
}

interface Sizes {
  size: string;
  quantity: number;
}

interface TypeProduct {
  id: string;
  type: string;
}
