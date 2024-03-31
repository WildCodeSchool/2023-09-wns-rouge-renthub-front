import { Stack, Typography } from "@mui/material";
import InfoCard from "../cards/InfoCard";

const infoCards = [
  {
    id: 1,
    title: "Réservez en ligne",
    icon: "/images/infoCardIcons/cardIcon1.png",
    paragraphs: [
      "Choisissez votre matériel et une période de location",
      "Meilleurs prix et disponibilité en temps réel",
    ],
  },
  {
    id: 2,
    title: "Traitement par l'agence",
    icon: "/images/infoCardIcons/cardIcon2.png",
    paragraphs: [
      "Préparation de votre commande",
      "Réponse sous 2h si besoin d'une confirmation",
    ],
  },
  {
    id: 3,
    title: "Retirez le materiel",
    icon: "/images/infoCardIcons/cardIcon3.png",
    paragraphs: [
      "Retrait du matériel en agence ou livraison le jour du départ",
      "Paiement au retour du matériel",
    ],
  },
];

function InfoLocation() {
  return (
    <Stack
      direction={"column"}
      flexWrap={"wrap"}
      gap={"2rem"}
      paddingTop={"5rem"}
    >
      <Stack direction={"column"} gap={2}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          fontFamily={"Poppins"}
          fontWeight={700}
        >
          Réservez en ligne, c&apos;est simple et rapide !
        </Typography>
        <Typography
          variant="body1"
          textAlign={"center"}
          marginInline={"auto"}
          fontFamily={"Poppins"}
          fontWeight={400}
          width={"33ch"}
        >
          Nos équipes vous accompagnent tout au long de votre location.
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={"2rem"}
      >
        {infoCards.map((infoCard) => (
          <InfoCard key={infoCard.id} {...infoCard} />
        ))}
      </Stack>
    </Stack>
  );
}

export default InfoLocation;
