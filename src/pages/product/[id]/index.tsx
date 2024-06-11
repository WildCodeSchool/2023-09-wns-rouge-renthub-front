import ProductCard from "@/components/cards/ProductCard";
import ContactHeader from "@/components/contact/ContactHeader";
import LayoutFull from "@/components/layout/LayoutFull";
import { GET_PRODUCT_REF } from "@/graphql/queryProdcutRef";
import { IProductReference } from "@/types/IProductReference";
import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function Product(): React.ReactNode {
  const router = useRouter();
  const { id } = router.query;
  console.debug("acces index product");
  const { data, loading, error } = useQuery<{ item: IProductReference }>(
    GET_PRODUCT_REF,
    { variables: { getProductReferenceId: id } },
  );
  if (loading) {
    return (
      <LayoutFull title="RentHub : Product">
        <Typography>Loading...</Typography>
      </LayoutFull>
    );
  }
  if (error) {
    return (
      <LayoutFull title="RentHub : Product">
        <Typography>Error: {error.message}</Typography>
      </LayoutFull>
    );
  }

  const product = data.item;
  console.debug("ProductId", { data, loading, error });
  return (
    <LayoutFull title="RentHub : Product">
      <Box
        minWidth={"400px"}
        margin={5}
        flexDirection={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        gap={4}
        display={"flex"}
        sx={{ flexWrap: "wrap" }}
      >
        {" "}
        <ProductCard
          id={product.id}
          brandName={product.brandName}
          name={product.name}
          price={product.price}
          description={product.description}
          src={product.pictureProduct[0]?.picture.urlMiniature || undefined}
        />
      </Box>
    </LayoutFull>
  );
}

export default Product;
