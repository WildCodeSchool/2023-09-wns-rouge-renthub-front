import LayoutFull from "@/components/layout/LayoutFull";
import { GET_PRODUCT_REF } from "@/graphql/queryProdcutRef";
import { IProductReference } from "@/types/IProductReference";
import { useQuery } from "@apollo/client";
import Image from "next/image";

import PriceTime from "@/components/product/PriceTime";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { CardDescription } from "@/components/product/CardDesciption";
import { VariablesColors } from "@/styles/Variables.colors";

function Product(): React.ReactNode {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<{ item: IProductReference }>(
    GET_PRODUCT_REF,
    { variables: { getProductReferenceId: id } },
  );

  const productQuantity = 30;

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

  return (
    <>
      <Stack paddingBlock={4} bgcolor={new VariablesColors().greyColor}>
        {productPriceDetailBlock(product, productQuantity)}
      </Stack>

      <Stack bgcolor={new VariablesColors().lightGreyColor}>
        {assuranceBlock()}
      </Stack>

      <Stack paddingBlock={6} bgcolor={new VariablesColors().whiteColor}>
        {productDetailblock(product)}
      </Stack>
    </>
  );
}

function productPriceDetailBlock(
  product: IProductReference,
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
          src={
            product.pictureProduct[0]?.picture.urlMiniature ||
            product.pictureProduct[0]?.picture.url
          }
          width={450}
          height={400}
          objectFit={"contain"}
          alt="Raquettes Retrospec à neige"
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
          Raquettes Retrospec à neige
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
          <PriceTime price={45} time={4} isWeekend={false} />

          <PriceTime
            color="white"
            price={100}
            border
            isSelected
            time={8}
            isWeekend={false}
          />

          <PriceTime
            price={100}
            priceRental={68}
            border
            time={8}
            isWeekend={true}
          />
        </Box>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="start"
          paddingTop={4}
        >
          <OrangeBtnWhiteHover>Ajouter au panier</OrangeBtnWhiteHover>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "10px",
              border: "1px solid black",
              width: "200px",
            }}
            color={"secondary"}
          >
            {" "}
            <PhoneIcon />
            Réserver par téléphone
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
export default Product;
