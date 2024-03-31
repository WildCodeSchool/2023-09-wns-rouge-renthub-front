import { Grid } from "@mui/material";
import Hero from "./Hero";
import InfoLocation from "./InfoLocation";
import Promotions from "./Promotions";
import Articles from "./Articles";
import Testimonials from "./Testimonials";
import Footer from "../footer/Footer";
import TopLocations from "./TopLocations";

function Home() {
  const styleHome = {
    margin: "auto",
  };

  const styleHero = {
    position: "relative",
    background: "url('/images/heroBackground.jpg')",
    backgroundAttachment: "fixed",
    backgroundPosition: "center 30%",
    backgroundSize: "cover", // Use 'cover' to ensure the image covers the entire container
    height: "60vh",
    minHeight: "400px",
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
