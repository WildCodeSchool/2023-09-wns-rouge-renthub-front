import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { VariablesColors } from "@/styles/Variables.colors";
import { Grid, Typography } from "@mui/material";
import Carousel from "../utils/Carousel";

function Hero() {
  const { color6, color7 } = new VariablesColors();

  const styleOverlay = {
    background:
      "linear-gradient(45deg, rgba(21,37,53, .9) 0%, rgba(68,80,92,0.76) 30%, rgba(0,0,0,0) 77%, rgba(217,217,217,0) 100%)",
  };

  const styleTitleHeroWrapper = {
    gap: "1rem",
    padding: "50px",
  };

  const styleTitleHero = {
    fontSize: "2rem",
    textShadow: `-2px 3px 5px ${color7}`,
    textWrap: "balance",
    fontFamily: "Impact",
  };

  const styleCarouselHeroWrapper = {};

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
        color={color6}
        xs={12}
        sm={6}
        sx={{ ...styleTitleHeroWrapper }}
      >
        <Typography variant="h2" component="h1" sx={{ ...styleTitleHero }}>
          Louez des équipements de sport pour l&#39;hiver et profitez de la
          neige en toute sécurité !
        </Typography>
        <OrangeBtnWhiteHover>Voir notre sélection</OrangeBtnWhiteHover>
      </Grid>
      <Grid
        className="carousel-hero"
        alignSelf={"center"}
        color={"white"}
        item
        xs={12}
        sm={6}
        sx={{ ...styleCarouselHeroWrapper }}
      >
        <Carousel />
      </Grid>
    </Grid>
  );
}

export default Hero;
