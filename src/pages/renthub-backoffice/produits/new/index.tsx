import AdminProtection from "@/components/backoffice/AdminProtection";
import ProductForm from "@/components/backoffice/produits/ProductForm";
import React from "react";

const AddProduit = (): React.ReactNode => {
  return <ProductForm />;
};

export default AdminProtection(AddProduit);
