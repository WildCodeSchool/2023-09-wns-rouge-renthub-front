import { IOrderStock } from "./IOrderStock";
import { UserInterface } from "./UserTypes";

export interface IOrder {
  id: number;
  status: string;
  user: UserInterface;
  orderStocks: IOrderStock[];
}
