import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fr } from "date-fns/locale";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import { DateRangeState } from "../../pages/cart/[productId]/add";
import { CiCalendarDate } from "react-icons/ci";

type DateRangePickerProps = {
  state: DateRangeState;
  setState: (state: any) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  quantityAvailable: number;
  addProductCart: () => void;
};

export default function DateRangePicker({
  state,
  setState,
  quantity,
  setQuantity,
  quantityAvailable,
  addProductCart,
}: DateRangePickerProps) {
  const { orangeColor } = new VariablesColors();

  return (
    <Box>
      <Box display={"flex"} gap={1} alignItems={"baseline"}>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <CiCalendarDate size={40} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            mt={3}
            textAlign={"center"}
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2.5rem",
              },
            }}
          >
            Quelle est votre période de location ?
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        pb={20}
        pt={5}
        sx={{
          flexDirection: "column",
        }}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          locale={fr}
          rangeColors={[orangeColor]}
          minDate={new Date()}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              type="number"
              label="Quantité"
              size="small"
              value={quantity}
              onChange={(e) => {
                Number(e.target.value) <= quantityAvailable &&
                  Number(e.target.value) > 0 &&
                  setQuantity(Number(e.target.value));
              }}
              sx={{ width: "30%" }}
            />
            <Typography variant="body1">
              Disponible : {quantityAvailable}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{ color: "white" }}
              onClick={addProductCart}
            >
              Valider la période
            </Button>
            <Link href="#" underline="hover" sx={{ color: "black" }}>
              Effacer la période
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
