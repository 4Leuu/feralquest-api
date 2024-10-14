export interface Products {
  id: string;
  name: string;
  fabric: string;
  colors: Color[];
  totalQuantity: number;
  description: string;
  price: number;
  typeProduct: TypeProduct;
}

interface Color {
  color: string;
  sizes: Size[];
}

interface Size {
  size: string;
  quantity: number;
}

interface TypeProduct {
  id: string;
  type: string;
}
