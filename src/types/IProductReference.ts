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

  description;
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
