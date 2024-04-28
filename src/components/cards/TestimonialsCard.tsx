import { Card, CardContent, Box, Typography } from "@mui/material";
import React from "react";
import FormatQuoteSharpIcon from "@mui/icons-material/FormatQuoteSharp";
import { VariablesColors } from "@/styles/Variables.colors";
import type TestimonialCardPropsType from "@/types/TestimonialsTypes";

export default function Testimonials({
  card,
}: {
  card: TestimonialCardPropsType;
}) {
  const { orangeColor } = new VariablesColors();
  const redValue = parseInt(orangeColor.substring(1, 3), 16);
  const greenValue = parseInt(orangeColor.substring(3, 5), 16);
  const blueValue = parseInt(orangeColor.substring(5, 7), 16);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",

        height: "100%",
        maxWidth: { xs: "100%", md: "400px" },
        padding: { xs: "rem", md: "1.5rem" },

        borderRadius: "20px",
        boxShadow: "none",
        backgroundColor: `rgba(${redValue}, ${greenValue}, ${blueValue}, .2)`,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexDirection: "column" }}>
          {card.description.map((paragraph, index) => (
            <Typography key={index} variant="body2" fontStyle="italic">
              {paragraph}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 4,
          }}
        >
          <div>
            <Typography variant="body2">
              {card.author} - {card.company}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {card.domain}
            </Typography>
          </div>

          <FormatQuoteSharpIcon sx={{ fontSize: 54 }} color="primary" />
        </Box>
      </CardContent>
    </Card>
  );
}
