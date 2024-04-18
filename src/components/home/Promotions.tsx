import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { PromoTag } from "@/styles/MuiStyled";
import { VariablesColors } from "@/styles/Variables.colors";
import { CardMedia, Grid, Stack, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function Promotions() {
  const { color1, color6 } = new VariablesColors();

  const stylePromotions = {
    borderRadius: "20px",
    color: color6,
  };
  const matches = useMediaQuery("(max-width:800px)");

  return (
    <Grid
      container
      padding={"5rem 5rem 5rem 5rem"}
      sx={{ ...stylePromotions, backgroundColor: color1 }}
      {...(matches && { direction: "column", padding: "4rem", gap: "2rem" })}
    >
      <Grid item xs={5} alignContent={"center"}>
        <Stack direction={"column"} gap="1rem" alignItems={"center"}>
          <PromoTag> promo ! </PromoTag>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            fontWeight={700}
            fontFamily="Poppins"
            lineHeight={1.5}
            sx={{ textWrap: "balance" }}
          >
            Forfait week-end à des prix imbattables !
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            fontSize="1.2rem"
            fontWeight={400}
            maxWidth={"30ch"}
          >
            Des prix réduits pour toute location du vendredi 16h au lundi 12h
          </Typography>
          <OrangeBtnWhiteHover>J&apos;en profite !</OrangeBtnWhiteHover>
        </Stack>
      </Grid>
      <Grid
        item
        xs={7}
        justifyContent={"center"}
        alignContent={"center"}
        position={"relative"}
      >
        <CardMedia
          component="img"
          alt="Promotions"
          image="/images/trapezoids.png"
          sx={{ marginInline: "2rem", ...(matches && { marginInline: 0 }) }}
        />
        <CardMedia
          component="img"
          alt="Promotions"
          image="/images/skiPromotion.png"
          sx={{
            position: "absolute",
            inset: 0,
            left: "2rem",
            margin: "auto",
            ...(matches && { left: 0 }),
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Promotions;
