import { Grid, useMediaQuery } from "@mui/material";
import Hero from "./Hero";
import InfoLocation from "./InfoLocation";
import Promotions from "./Promotions";
import Articles from "./Articles";
import Testimonials from "./Testimonials";
import Footer from "../footer/Footer";
import TopLocations from "./TopLocations";

function Home() {
  const matchesSmall = useMediaQuery("(max-width:599px)");
  const matchesSuperSmall = useMediaQuery("(max-width:359px)");

  const styleHome = {
    margin: "auto",
  };

  const styleHero = {
    position: "relative",
    background: "url('/images/heroBackground.jpg')",
    backgroundAttachment: "fixed",
    backgroundPosition: "center 30%",
    backgroundSize: "cover", // Use 'cover' to ensure the image covers the entire container
    height: matchesSuperSmall ? "650px" : matchesSmall ? "630px" : "500px",
  };

  return (
    <Grid
      container
      component={"main"}
      maxWidth="xl"
      justifyContent={"center"}
      sx={{ ...styleHome }}
    >
      <Grid item xs={12} sx={{ ...styleHero }} component={"section"}>
        <Hero />
      </Grid>
      <Grid item xs={12} component={"section"}>
        <InfoLocation />
      </Grid>
      <Grid item xs={12} component={"section"}>
        <Promotions />
      </Grid>
      <Grid item xs={12} component={"section"}>
        <TopLocations />
      </Grid>
      <Grid item xs={12} component={"section"}>
        <Articles />
      </Grid>
      <Grid item xs={12} component={"section"}>
        <Testimonials />
      </Grid>
    </Grid>
  );
}

export default Home;
