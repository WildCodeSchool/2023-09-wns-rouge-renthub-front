import { IPicture } from "./IPicture";
import { IProductReference } from "./IProductReference";
import { Cart } from "./Cart";

export type ProductCart = {
  id: number;
  quantity: number;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  productReference: IProductReference;
  cartReference: Cart;
};
