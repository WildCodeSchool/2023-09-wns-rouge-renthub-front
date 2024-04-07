import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";

type ArticlePropsType = {
  bgColor?: string;
  odd?: boolean;
  article: {
    title: string;
    image: string;
    content: string[];
  };
};

function Article({ bgColor, article, odd }: ArticlePropsType) {
  // side Image choice
  const sideImage = new Image();
  sideImage.src = odd ? "/images/trapezoids.png" : "/images/trapezoids_2.png";
  // does side Image exists ? (if not, MediaCard will not be displayed)
  const isSideImage = sideImage.height != 0;

  return (
    <Box
      padding={{ xs: "2rem 0", md: "4rem 0" }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(bgColor && { backgroundColor: bgColor }),
        height: "fit-content",
      }}
    >
      <Grid
        container
        item
        maxWidth="xl"
        alignItems="center"
        xs={9}
        direction={{ xs: "column", md: odd ? "row" : "row-reverse" }}
        rowGap={"1.7rem"}
      >
        <Grid
          item
          position={"relative"}
          xs={5.7}
          padding={{
            xs: "1rem",
            md: odd ? "4rem 4rem 4rem 0" : "4rem 0 4rem 4rem",
          }}
        >
          {isSideImage && (
            <CardMedia
              component="img"
              alt="image"
              sx={{
                position: "absolute",
                ...(odd ? { left: "-70%" } : { right: "-25%" }),
                rotate: odd ? "60deg" : "-10deg",
                top: odd ? "40%" : "80%",
                zIndex: "1",
                transform: "translateY(-50%)",
                scale: "1.2",
                objectFit: "cover",
              }}
              image={sideImage.src}
            />
          )}

          <CardMedia
            component="img"
            alt="image"
            sx={{
              position: "relative",
              zIndex: "2",
              objectFit: "cover",
              borderRadius: "20px",
            }}
            image={article.image}
          />
        </Grid>
        <Grid
          item
          container
          xs={6.3}
          direction={"column"}
          rowGap={"1rem"}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Typography
            component="h2"
            fontWeight={900}
            fontSize={{ xs: "1.5rem", md: "2rem" }}
          >
            {article.title}
          </Typography>
          {article.content.map((paragraph, index) => (
            <Typography key={index} fontSize={{ xs: "0.8rem", md: "1rem" }}>
              {paragraph}
            </Typography>
          ))}
          <Link href={`/?productId=`} style={{ textDecoration: "none" }}>
            <OrangeBtnWhiteHover>Découvrir nos produits</OrangeBtnWhiteHover>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Article;
