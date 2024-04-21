import React from "react";
import { Box, IconButton, Slide, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const TestCarou = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const texts = ["Texte 1", "Texte 2", "Texte 3"];
  const handleNext = () => {
    setActiveIndex((prevActiveIndex) => (prevActiveIndex + 1) % texts.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevActiveIndex) => (prevActiveIndex - 1 + texts.length) % texts.length,
    );
  };

  return (
    <Box sx={{ maxWidth: 800 }}>
      {/* <Stack sx={{ height: 400, position: "relative" }}>
        {texts.map((text, index) => (
          <Slide key={index} direction="left">
            <Box
              sx={{
                height: 400,
                width: "auto",
                padding: 20,
                textAlign: "center",
              }}
            >
              <Typography variant="body1">{text}</Typography>
              test
            </Box>
          </Slide>
        ))}
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
          }}
          onClick={handlePrev}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
          }}
          onClick={handleNext}
        >
          <NavigateNextIcon />
        </IconButton>
      </Stack> */}
    </Box>
  );
};
