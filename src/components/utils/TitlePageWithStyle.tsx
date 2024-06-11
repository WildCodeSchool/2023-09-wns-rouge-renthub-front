import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface TitlePageWithStyleProps {
  title: string;
  icon?: React.ReactNode;
  sx?: object;
}

/**
 * Renders a title for any page (with an optional icon).
 *
 * @param {string} props.title - The title to be displayed.
 * @param {React.ReactNode} [props.icon=null] - The optional icon to be displayed.
 * @param {Object} [props.sx=null] - The optional custom styles for the component.
 */
export function TitlePageWithStyle({
  title,
  icon = null,
  sx = null,
}: TitlePageWithStyleProps): React.ReactNode {
  return (
    <Box width={"100%"} sx={sx}>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        {icon}
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Divider />
    </Box>
  );
}
