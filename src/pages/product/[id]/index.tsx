import LayoutFull from "@/components/layout/LayoutFull";
import { IProductReference } from "@/types/IProductReference";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import PriceTime from "@/components/product/PriceTime";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import HourIcon from "@mui/icons-material/AccessTime";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import { CardDescription } from "@/components/product/CardDesciption";
import { VariablesColors } from "@/styles/Variables.colors";
import { GET_PRODUCT_REF } from "@/graphql/productReference/queryProdcutRef";

function Product(): React.ReactNode {
  const router = useRouter();
  const { id } = router.query;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const phoneNumber = "+33612121212"; // Replace this with the actual phone number

  const { data, loading, error } = useQuery<{ item: IProductReference }>(
    GET_PRODUCT_REF,
    { variables: { getProductReferenceId: id } },
  );

  const product = useMemo(() => data?.item, [data]);

  const price2days = useMemo(() => {
    if (!product) {
      return 0;
    }
    return product.price;
  }, [product]);

  const priceWeekend = useMemo(() => {
    if (!product) {
      return 0;
    }
    return product.price - (10 / 100) * product.price;
  }, [product]);

  const price4days = useMemo(() => {
    if (!product) {
      return 0;
    }
    return product.price - (20 / 100) * product.price;
  }, [product]);

  const productQuantity = useMemo(() => {
    // Assuming you have several conditions to determine the quantity
    if (!data?.item || !data?.item.stock) {
      return 0;
    }
    const quantityStock = data.item.stock.filter(
      (item) => item.isAvailable,
    ).length;

    return quantityStock || 0;
  }, [data]);

  function addProductToCart(productId: number) {
    router.push({
      pathname: "/cart/add",
      query: { productId: productId },
    });
  }

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
    <>
      <Stack paddingBlock={4} bgcolor={new VariablesColors().greyColor}>
        {productPriceDetailBlock(
          product,
          { price2days, price4days, priceWeekend },
          productQuantity,
        )}
      </Stack>

      <Stack bgcolor={new VariablesColors().lightGreyColor}>
        {assuranceBlock()}
      </Stack>

      <Stack paddingBlock={6} bgcolor={new VariablesColors().whiteColor}>
        {productDetailblock(product)}
      </Stack>
    </>
  );

  function productPriceDetailBlock(
    product: IProductReference,
    prices: { price2days: number; priceWeekend: number; price4days: number },
    productQuantity: number,
  ): React.ReactNode {
    return (
      <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }}>
        <Grid
          border={0}
          container
          sm={6}
          sx={{ xs: { width: "50%" }, sm: { width: "100%" } }}
          borderRadius={2}
          alignContent={"center"}
          gap={4}
          justifyContent={"end"}
          padding={{ xs: 2, sm: 4 }}
        >
          <Image
            style={{ borderRadius: "1rem" }}
            src={`${process.env.NEXT_PUBLIC_PATH_IMAGE}/${product.pictures[0].name}`}
            width={450}
            height={400}
            objectFit={"contain"}
            alt={product.name}
          />
        </Grid>

        <Grid padding={2} item xs={12} sm={6}>
          <Typography variant="h6" component="div" gutterBottom>
            Location
          </Typography>
          <Typography
            marginBlockEnd={2}
            variant="h4"
            component="div"
            gutterBottom
          >
            {product.name}
          </Typography>
          <Typography
            component="span"
            padding={1}
            sx={{ borderRadius: "10px", border: "1px solid black" }}
            variant="body1"
            color="text.secondary"
            gutterBottom
          >
            Quantité totale : {productQuantity}
          </Typography>
          <Typography
            marginBlockStart={4}
            fontWeight={600}
            variant="h6"
            component="div"
            gutterBottom
          >
            Tarif et durée de location
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "start",
              gap: "1rem", // Assurez-vous que la valeur est correcte
              mx: "0rem",
            }}
          >
            <PriceTime price={prices.price2days} time={2} isWeekend={false} />

            <PriceTime
              color="white"
              price={prices.price4days}
              border
              time={4}
              isWeekend={false}
            />

            <PriceTime
              price={prices.price2days}
              priceRental={prices.priceWeekend}
              border
              time={2}
              isWeekend={true}
            />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="start"
            paddingTop={4}
          >
            <OrangeBtnWhiteHover onClick={(e) => addProductToCart(product.id)}>
              Ajouter au panier
            </OrangeBtnWhiteHover>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
                border: "1px solid black",
                width: "200px",
              }}
              color={"secondary"}
              onClick={() => setShowPhoneNumber(true)}
            >
              <PhoneIcon />
              {showPhoneNumber ? phoneNumber : "Réserver par téléphone"}
            </Button>
          </Stack>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="body2" color="text.secondary">
              • Matériel contrôlé et testé entre chaque location
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Matériel de qualité professionnelle
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Démonstration du matériel lors du retrait
            </Typography>
          </Box>
        </Grid>
      </Stack>
    );
  }

  function assuranceBlock(): React.ReactNode {
    return (
      <>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"stretch"}
          maxWidth="xl"
          gap={{ xs: 0, md: 10 }}
          paddingBlock={{ xs: 2, md: 4 }}
          sx={{
            margin: "auto",
          }}
        >
          <Typography
            variant="body2"
            component="div"
            gutterBottom
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <CheckCircleIcon sx={{ marginRight: 1 }} />
            Assurance casse et vol incluse
          </Typography>
          <Typography
            variant="body2"
            component="div"
            gutterBottom
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            {" "}
            <CheckCircleIcon sx={{ marginRight: 1 }} />
            Retrait à la livraison
          </Typography>
          <Typography
            variant="body2"
            component="div"
            gutterBottom
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            {" "}
            <CheckCircleIcon sx={{ marginRight: 1 }} />
            Retrait en 15 minutes
          </Typography>
        </Stack>
      </>
    );
  }

  function productDetailblock(product: IProductReference): React.ReactNode {
    return (
      <>
        <Container>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            gap={4}
            paddingBlock={{ xs: 0, md: 4 }}
          >
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Typography
                variant="body1"
                component="div"
                fontWeight={900}
                fontSize={24}
                gutterBottom
                sx={{ mt: 4, mb: 2 }}
              >
                Description et avantage
              </Typography>
              <Typography variant="h6" component="div" gutterBottom>
                {product.description}
              </Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }} marginBlockStart={4}>
              <CardDescription />
            </Box>
          </Stack>
        </Container>
      </>
    );
  }
}
export default Product;
