import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const FooterItem = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 20px;
  background: linear-gradient(
    90deg,
    rgba(5, 3, 66, 1) 37%,
    rgba(5, 3, 66, 0.9640231092436975) 49%,
    rgba(3, 25, 66, 1) 63%,
    rgba(3, 25, 66, 0.9500175070028011) 98%
  );
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterItem>
      <Typography sx={{ color: "#fff" }}>Coppy right @ 2024 VietNam</Typography>
    </FooterItem>
  );
};

export default Footer;
