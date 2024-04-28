import { Grid, useMediaQuery } from "@mui/material";
import Hero from "./Hero";
import InfoLocation from "./InfoLocation";
import Promotions from "./Promotions";
import Articles from "./Articles";
import Testimonials from "./Testimonials";
import Footer from "../footer/Footer";
import TopLocations from "./TopLocations";
import ServiceOfferings from "./ServiceOfferings";

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
    backgroundSize: "cover",
    height: "500px",
  };

  return (
    <Grid container justifyContent={"center"} sx={{ ...styleHome }}>
      <Grid item xs={12} lg={9} sx={{ ...styleHero }}>
        <Hero />
      </Grid>
      <Grid className="body" item xs={9}>
        <InfoLocation />
      </Grid>
      <Grid className="body" item xs={9}>
        <Promotions />
      </Grid>
      <Grid className="body" item xs={9}>
        <TopLocations />
      </Grid>
      <Grid item xs={12} component={"section"}>
        <Articles />
      </Grid>
      <Grid item xs={12}>
        <Testimonials />
      </Grid>
      <Grid item xs={12}>
        <ServiceOfferings />
      </Grid>
    </Grid>
  );
}

export default Home;
