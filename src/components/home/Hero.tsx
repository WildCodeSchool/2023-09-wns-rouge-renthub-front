import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { VariablesColors } from "@/styles/Variables.colors";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import Carousel from "../utils/carousel/Carousel";

function Hero() {
  const { whiteColor, blackColor } = new VariablesColors();
  const matches = useMediaQuery("(max-width:599px)");
  const matchesMedium = useMediaQuery("(max-width:800px)");

  const styleOverlay = {
    background:
      "linear-gradient(45deg, rgba(21,37,53, .9) 0%, rgba(68,80,92,0.76) 30%, rgba(0,0,0,0) 77%, rgba(217,217,217,0) 100%)",
    ...(matches && { display: "block" }),
  };

  const styleTitleHeroWrapper = {
    gap: "1rem",
    padding: "50px",
    ...(matches && {
      alignItems: "center",
      padding: "2rem 2rem 0 2rem",
      justifyContent: "flex-start",
    }),
  };

  const styleTitleHero = {
    fontSize: "2.5rem",
    textShadow: `-2px 3px 5px ${blackColor}`,
    textWrap: "balance",
    ...(matchesMedium && { fontSize: "2rem" }),
    ...(matches && { textAlign: "center", fontSize: "1.7rem" }),
  };

  return (
    <Grid
      item
      container
      xs={12}
      position={"absolute"}
      className="overlay"
      height={"100%"}
      sx={{ ...styleOverlay }}
    >
      <Grid
        className="title-hero"
        item
        container
        direction={"column"}
        justifyContent={"flex-end"}
        alignSelf={"flex-end"}
        color={whiteColor}
        xs={12}
        sm={6}
        sx={{ ...styleTitleHeroWrapper }}
      >
        <Typography variant="h1" sx={{ ...styleTitleHero }}>
          {`Louez des équipements de sport pour l'hiver et profitez de la
          neige en toute sécurité !`}
        </Typography>
        <OrangeBtnWhiteHover>Voir notre sélection</OrangeBtnWhiteHover>
      </Grid>
      <Grid
        className="carousel-hero"
        alignSelf={"center"}
        color={whiteColor}
        item
        xs={12}
        sm={6}
      >
        <Carousel type="Hero" />
      </Grid>
    </Grid>
  );
}

export default Hero;
