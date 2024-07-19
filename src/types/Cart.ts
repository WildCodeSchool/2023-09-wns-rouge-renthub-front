import { IPicture } from "./IPicture";
import { ProductCart } from "./ProductCart";
import { UserInterface } from "./UserTypes";

export type Cart = {
  id: number;
  totalPrice: number;
  owner: UserInterface;
  productCarts: ProductCart[];
};
