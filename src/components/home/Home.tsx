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
      maxWidth="xl"
      justifyContent={"center"}
      sx={{ ...styleHome }}
    >
      <Grid item xs={12} sx={{ ...styleHero }}>
        <Hero />
      </Grid>
      <Grid className="body" item xs={12}>
        <InfoLocation />
      </Grid>
      <Grid className="body" item xs={12}>
        <Promotions />
      </Grid>
      <Grid className="body" item xs={12}>
        <TopLocations />
      </Grid>
      <Grid className="body" item xs={12}>
        <Articles />
      </Grid>
      <Grid className="body" item xs={12}>
        <Testimonials />
      </Grid>
      <Grid className="body" item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Home;
