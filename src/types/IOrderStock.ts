import { IOrder } from "./IOrder";
import { IStock } from "./Stock";

export interface IOrderStock {
  id: number;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  order: IOrder;
  stock: IStock;
}
