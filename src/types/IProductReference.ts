import { ICategory } from "./ICategory";
import { IPicture } from "./IPicture";

export interface IPictureProduct {
  name: string;
  uri: string;
  urlMiniature: string;
  mimetype: string;
  updatedAt: string;
  urlHD: string;
}

export interface IStock {
  id: number;
  name: string;
  isAvailable: boolean;
  sku: string;
  serialNumber: string;
  purchaseDataTime: Date;
  supplier?: string;
  productReference: number;
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
  pictures: IPicture;
  stock: Partial<IStock>[];
}

export interface ProduitFormValues {
  name: string;
  brandName: string;
  description: string;
  price: number;
  category: { id: string } | null;
  pictures: [{ id: number }] | null;
}
