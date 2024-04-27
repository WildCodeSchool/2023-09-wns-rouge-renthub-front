import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { VariablesColors } from "@/styles/Variables.colors";

import { useState } from "react";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import type TestimonialCardPropsType from "@/types/TestimonialsTypes";
import CardsTestimials from "@/components/cards/Testimonials";

const testimonialCards: TestimonialCardPropsType[] = [
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

  {
    id: 4,
    author: "Olivier FRETAY",
    company: "DG Code Rousseau",
    domain: "location del tel materile de sport",
    description: [
      "“Isdem diebus Apollinaris Domitiani gener, paulo ante agens palatii Caesaris curam, ad Mesopotamiam missusbus apollinarispaulo ante.”",
    ],
  },
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
  const responsive = {
    xxxxl: {
      breakpoint: { max: 4000, min: 2300 },
      items: 3,
      partialVisibilityGutter: 150,
    },
    xxxl: {
      breakpoint: { max: 2300, min: 1274 },
      items: 3,
      partialVisibilityGutter: 0,
    },
    xxl: {
      breakpoint: { max: 1274, min: 865 },
      items: 1,
      partialVisibilityGutter: 150,
    },
    xl: {
      breakpoint: { max: 864, min: 725 },
      items: 1,
      partialVisibilityGutter: 60,
    },
    l: {
      breakpoint: { max: 724, min: 660 },
      items: 1,
      partialVisibilityGutter: 30,
    },
    m: {
      breakpoint: { max: 659, min: 600 },
      items: 1,
    },
    s: {
      breakpoint: { max: 599, min: 525 },
      items: 2,
      partialVisibilityGutter: 0,
    },
    xs: {
      breakpoint: { max: 524, min: 455 },
      items: 1,
      partialVisibilityGutter: 200,
    },
    xxs: {
      breakpoint: { max: 454, min: 404 },
      items: 1,
      partialVisibilityGutter: 150,
    },
    xxxs: {
      breakpoint: { max: 403, min: 360 },
      items: 1,
      partialVisibilityGutter: 0,
    },
    smallest: {
      breakpoint: { max: 359, min: 0 },
      items: 1,
    },
  };
  return (
    // <Box
    //   sx={{
    //     // display: "flex",
    //     // flexDirection: "column",
    //     // gap: 2,

    //     // alignItems: "center",

    //     padding: { xs: "1.5rem 0.5rem", md: "5rem" },

    //     bgcolor: `rgba(${redValue}, ${greenValue}, ${blueValue}, .1)`,
    //   }}
    // >
    <div className="testimonials-container">
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
          flexDirection: { xs: "column", md: "column" },

          gap: 2,
          justifyContent: "center",
        }}
      >
        <>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           <PreviousButton key={0} onClick={handleNext} disabled={false} /> 
          </Box> */}
          <Carousel
            responsive={responsive}
            infinite
            showDots={false}
            autoPlay={true}
            partialVisible={true}
            keyBoardControl={true}
            containerClass={"testimonials-carousel"}
          >
            {testimonialCards?.map((card) => (
              <CardsTestimials card={card} key={card.id} />
            ))}
          </Carousel>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <OrangeBtnWhiteHover>
              Découvrir tous les témoignages
            </OrangeBtnWhiteHover>
          </Box>
        </>
      </Box>
    </div>
  );
}

export default Testimonials;
