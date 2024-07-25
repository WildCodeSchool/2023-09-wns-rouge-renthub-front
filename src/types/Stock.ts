export type StockFormValues = {
  name: string;
  serialNumber: string;
  productReference: { id: string } | null;
  isAvailable: boolean;
};
