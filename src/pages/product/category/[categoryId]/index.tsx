import ProductCard from "@/components/cards/ProductCard";
import LayoutFull from "@/components/layout/LayoutFull";
import { GET_CATEGORY_PRODUCT } from "@/graphql/queryCategoryWithProducts";
import { ICategory } from "@/types/ICategory";
import { useQuery } from "@apollo/client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function List(): React.ReactNode {
  const router = useRouter();
  const { categoryId } = router.query;
  const { data, loading, error } = useQuery<{ item: ICategory }>(
    GET_CATEGORY_PRODUCT,
    { variables: { findCategoryId: categoryId } },
  );

  useEffect(() => {
    console.debug("111", data);
  });

  const sortedProducts = data
    ? [...data.item?.productReferences].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    : [];
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

  return (
    <LayoutFull title="RentHub : Product">
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} lg={9}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: "center", marginTop: 5 }}
          >
            Liste des produits - {data.item.name}
          </Typography>

          <Box
            minWidth={"400px"}
            marginBlock={5}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={4}
            display={"flex"}
            sx={{ flexWrap: "wrap" }}
          >
            {sortedProducts &&
              sortedProducts?.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      textAlign: "center",
                      margin: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
                      cursor: "pointer",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <ProductCard
                    id={product.id}
                    brandName={product.brandName}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    src={
                      product.pictureProduct
                        ? product.pictureProduct[0]?.picture.urlMiniature
                        : undefined
                    }
                  />
                </Link>
              ))}
          </Box>
        </Grid>
      </Grid>
    </LayoutFull>
  );
}
export default List;
