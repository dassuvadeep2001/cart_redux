import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FCC737" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Button
          component={Link}
          to="/"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          Products
        </Button>
        <Button
          component={Link}
          to="/cart"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          My Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
