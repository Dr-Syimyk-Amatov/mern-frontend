import { Box } from "@mui/material";

export const ColorWidget = ({ color }: { color: string }) => (
  <Box display="flex" alignItems="center">
    <span
      style={{ display: "inline-block", backgroundColor: color, width: "14px", height: "14px", borderRadius: "2px" }}
    ></span>
    <span style={{ display: "inline-block", marginLeft: "8px" }}>{color}</span>
  </Box>
);
