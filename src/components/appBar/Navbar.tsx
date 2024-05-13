import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ResponsiveMenu from "./ResponsiveMenu";
import { VariablesColors } from "@/styles/Variables.colors";

function Navbar() {
  const [globalFilterValue, setGlobalFilterValue] =
    React.useState<string>(""); /* global filter for search field */
  const router = useRouter();
  const { orangeColor } = new VariablesColors();

  /* Menu item, redirect to the well path */
  const pages = [
    { title: "Nos agences", path: "/agences" },
    { title: "Se connecter", path: "/signin" },
    { title: "Mon panier", path: "/cart" },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            display={"flex"}
            gap={2}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Image
              src={"/images/renthub-logo.png"}
              alt="logo"
              width={201}
              height={38.74}
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/");
              }}
            />
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
              variant="contained"
              size="large"
            >
              Nos matériels
            </Button>
          </Box>
          {/* Responsive */}
          {/* Display favicon logo on mobile */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <Image
              src="/images/favicon.png"
              alt="logo"
              width={40}
              height={40}
            />
            {/* @TODO: set modal in responsive menu */}
            <IconButton
              aria-label="materiels"
              size="large"
              sx={{
                color: orangeColor,
              }}
              onClick={() => {
                // displaying the modal...
              }}
            >
              <ExpandCircleDownOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <FormControl sx={{ mx: "auto", width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="search" size="small">
              Rechercher
            </InputLabel>
            <OutlinedInput
              id="search"
              type="text"
              size="small"
              onClick={(e) => {
                const inputElement = e.target as HTMLInputElement;
                setGlobalFilterValue(inputElement.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Rechercher"
            />
          </FormControl>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
            gap={2}
          >
            {pages.map((page, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  router.push(page.path);
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          {/* Responsive Component usefull for displaying menu item {page} with menu icon icon  */}
          <ResponsiveMenu pages={pages} router={router} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
