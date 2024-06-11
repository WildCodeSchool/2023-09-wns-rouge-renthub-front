import { IPicture } from "./IPicture";
import { IProductReference } from "./IProductReference";

export interface ICategory {
  id: string;
  name: string;
  index: string;
  display: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  parentCategory: ICategory | null;
  childCategories: ICategory[] | null;
  picture: IPicture | null;
  productReference: IProductReference[] | null;
}
