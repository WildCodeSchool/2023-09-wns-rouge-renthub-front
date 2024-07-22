import { ICategory } from "./ICategory";

export interface IPictureProduct {
  name: string;
  uri: string;
  urlMiniature: string;
  mimetype: string;
  updatedAt: string;
  urlHD: string;
}
export interface IProductReference {
  id: number;
  name: string;

  createdAt: string;
  updatedAt: string;

  description: string;
  index: number;
  display: boolean;
  brandName: string;
  price: number;
  category: ICategory;
  pictureProduct: { id: number; picture: Partial<IPictureProduct>[] } | null;

  stock: {
    name: string;
    isAvailable: boolean;
  }[];
}

export interface ProduitFormValues {
  name: string;
  brandName: string;
  description: string;
  price: number;
  category: { id: string } | null;
  pictureProduct: { id: string } | null;
}
