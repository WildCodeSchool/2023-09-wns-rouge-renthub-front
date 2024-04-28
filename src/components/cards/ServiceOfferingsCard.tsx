import { Box, CardMedia, Typography } from "@mui/material";
import ServiceOfferingsProps from "@/types/ServiceOfferingsType";

export default function ServiceOfferingsCards({
  card,
}: {
  card: ServiceOfferingsProps;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        borderRadius: "20px",

        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        color: "white",
        padding: "1rem 0",
        margin: "0rem",
      }}
    >
      <CardMedia
        sx={{ margin: "auto", width: "auto", height: "100px" }}
        component="img"
        image={card.image}
        alt={card.alt}
      />
      <Typography
        variant="h6"
        component="div"
        textAlign="center"
        fontWeight={700}
      >
        {card.title}
      </Typography>

      <Typography
        variant="body1"
        width={"70%"}
        component="div"
        textAlign="center"
        marginTop={"1rem"}
      >
        {card.description}
      </Typography>
    </Box>
  );
}
