import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
  Box,
  Divider,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import BackOfficeAppBar from "../appBar/BackOfficeAppBar";
import { menuItems } from "./MenuList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const { whiteColor, orangeColor } = colors;

const BackOfficeSidebar = () => {
  const router = useRouter();
  const [open, setOpen] = useState({});

  // Expand and collapse the menus
  const handleClick = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Open the menu corresponding to the URL
  useEffect(() => {
    const openStates = {};
    menuItems.forEach((item) => {
      item.subMenus.forEach((sub) => {
        if (router.pathname.includes(sub.href)) {
          openStates[item.id] = true;
        }
      });
    });
    setOpen(openStates);
  }, [router.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <BackOfficeAppBar />
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            marginTop: "25px",
            width: 300,
            boxSizing: "border-box",
            backgroundColor: whiteColor,
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: orangeColor }}>
                {React.createElement(DashboardIcon)}
              </ListItemIcon>
              <Link href="/renthub-backoffice" underline="none" color="inherit">
                <ListItemText primary="Dashboard" />
              </Link>
            </ListItemButton>
          </ListItem>
          <Divider />
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleClick(item.id)}>
                  <ListItemIcon sx={{ color: orangeColor }}>
                    {React.createElement(item.icon)}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
              <Divider />
              {item.subMenus && (
                <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenus.map((sub) => (
                      <ListItem key={sub.text} disablePadding>
                        <Link href={sub.href} underline="none" color="inherit">
                          <ListItemButton
                            component="a"
                            sx={{
                              pl: 4,
                            }}
                          >
                            <ListItemIcon sx={{ color: orangeColor }}>
                              {React.createElement(sub.icon)}
                            </ListItemIcon>
                            <ListItemText primary={sub.text} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default BackOfficeSidebar;
