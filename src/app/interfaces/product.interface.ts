export interface ProductImage {
  url: string;
  id: number;   
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryid: number;
  images?: string[];

  // ✅ ASSOCIATIONS
  Category?: ProductCategory;
  ProductImages?: ProductImage[];
}
