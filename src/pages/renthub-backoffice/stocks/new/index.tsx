import AdminProtection from "@/components/backoffice/AdminProtection";
import StockForm from "@/components/backoffice/stocks/StockForm";
import React from "react";

const AddProduit = (): React.ReactNode => {
  return <StockForm />;
};

export default AdminProtection(AddProduit);
