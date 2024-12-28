import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#FFB22C', py: 2 }}>
        <Typography variant="body2" align="center" sx={{ color: 'white' }}>
          © {new Date().getFullYear()} Suvadeep. All rights reserved.
        </Typography>
      </Box>
  );
};

export default Footer;