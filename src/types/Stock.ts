import { IOrderStock } from "./IOrderStock";
import { IProductReference } from "./IProductReference";

export type StockFormValues = {
  name: string;
  serialNumber: string;
  productReference: { id: string } | null;
  isAvailable: boolean;
};

export interface IStock {
  id: number;
  name: string;
  isAvailable: boolean;
  serialNumber: string;
  purchaseDataTime: Date;
  supplier: string;
  sku: string;
  productReference: IProductReference;
  orderStocks: IOrderStock[];
}
