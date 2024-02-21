import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        padding: "20px",
        backgroundColor: "#1976d2",
        width: "100%",
      }}
    >
      <Typography sx={{ color: "#fff" }}>Footer</Typography>
    </div>
  );
};

export default Footer;
