import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import FormatQuoteSharpIcon from "@mui/icons-material/FormatQuoteSharp";
import { VariablesColors } from "@/styles/Variables.colors";

import { NextButton, PreviousButton } from "../utils/OrangeNextButton";
import { ArrowBackIos } from "@mui/icons-material";
import { useState } from "react";
interface TestimonialCardPropsType {
  id: number;
  author: string;
  company?: string;
  domain?: string;
  description: string[];
}

const testimonialCards = [
  {
    id: 1,
    author: "Jean Bertot",
    company: "L'agence",
    domain: "Agence de voyage",
    description: [
      "“J'ai loué des skis chez RentHub pour mon séjour à la montagne et j'ai été très satisfait du service.",
      "Le matériel était en excellent état et le personnel était très professionnel.",
      "Je n'hésiterai pas à faire appel à eux lors de mon prochain voyage.”",
    ],
  },
  {
    id: 2,
    author: "Sophie Martin",
    company: "Sport Extrême",
    domain: "Magasin de sport",
    description: [
      "“J'ai loué un snowboard pour une journée avec RentHub.",
      "Le processus de réservation était simple et rapide, et le matériel était de très bonne qualité.",
      "Je recommande vivement leurs services.”",
    ],
  },
  {
    id: 3,
    author: "Lucas Dubois",
    company: "Aventure Sportive",
    domain: "Club de randonnée",
    description: [
      "“RentHub propose une large gamme d'équipements de montagne à louer.",
      "J'ai loué des raquettes de neige pour une excursion en montagne et j'ai été très content du matériel et du service client.",
      "Le personnel était très accueillant et m'a donné de bons conseils pour choisir l'équipement adapté à mes besoins.”",
    ],
  },

  // {
  //   id: 4,
  //   author: "Olivier FRETAY",
  //   company: "DG Code Rousseau",
  //   domain: "location del tel materile de sport",
  //   description: [
  //     "“Isdem diebus Apollinaris Domitiani gener, paulo ante agens palatii Caesaris curam, ad Mesopotamiam missusbus apollinarispaulo ante.”",
  //   ],
  // },
];

function Testimonials() {
  const { orangeColor } = new VariablesColors();
  const redValue = parseInt(orangeColor.substring(1, 3), 16);
  const greenValue = parseInt(orangeColor.substring(3, 5), 16);
  const blueValue = parseInt(orangeColor.substring(5, 7), 16);

  function viewAll() {
    console.warn("view all testimonials");
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < testimonialCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,

        alignItems: "center",

        padding: { xs: "1.5rem 0.5rem", md: "5rem" },

        bgcolor: `rgba(${redValue}, ${greenValue}, ${blueValue}, .1)`,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        align="center"
        fontFamily="Poppins"
        fontWeight={900}
        padding={{
          xs: "0.5rem 0",
          md: "2rem 0",
        }}
        fontSize={{
          xs: "1.5rem",
          md: "2rem",
        }}
      >
        Nos témoignages
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },

          gap: 2,
          justifyContent: "center",
        }}
      >
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PreviousButton key={0} onClick={handleNext} disabled={false} />
          </Box>
          {testimonialCards?.map((card) => (
            <Card
              key={card.id}
              sx={{
                width: { xs: "100%", md: "400px" },
                padding: { xs: "rem", md: "1.5rem" },
                overflow: "hidden",
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
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NextButton key={0} onClick={handleNext} disabled={false} />
          </Box>
        </>
      </Box>
    </Box>
  );
}

export default Testimonials;
