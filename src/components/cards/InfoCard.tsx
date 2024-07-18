import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { VariablesColors } from "@/styles/Variables.colors";

type InfoCardPropsType = {
  id: number;
  title: string;
  icon?: string;
  paragraphs?: string[];
};

function InfoCard({ id, title, icon, paragraphs }: InfoCardPropsType) {
  const { orangeColor } = new VariablesColors();
  const redValue = parseInt(orangeColor.substring(1, 3), 16);
  const greenValue = parseInt(orangeColor.substring(3, 5), 16);
  const blueValue = parseInt(orangeColor.substring(5, 7), 16);

  return (
    <Card
      sx={{
        width: "300px",
        padding: "1.2rem",
        borderRadius: "20px",
        boxShadow: "none",
        backgroundColor: `rgba(${redValue}, ${greenValue}, ${blueValue}, .2)`,
      }}
    >
      <CardContent>
        <Stack direction={"column"} gap={2} alignItems={"flex-start"}>
          <Stack direction={"row"} justifyContent={"center"} gap={1.5}>
            <CardMedia
              component="img"
              alt={title}
              image={icon}
              sx={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
            <Typography
              variant="body2"
              fontFamily={"Poppins"}
              fontWeight={700}
              fontSize={"1.2rem"}
            >
              {title}
            </Typography>
          </Stack>
          {paragraphs?.map((paragraph, index) => (
            <Stack key={index} direction={"row"} gap={1}>
              <ArrowForwardIcon sx={{ width: "1rem" }} />
              <Typography variant="body2">{paragraph}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
