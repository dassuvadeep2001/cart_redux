import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchCategories } from '../../../redux/categorySlice/categorySlice';
import { Link } from 'react-router-dom';

// Yellow theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#fdd835',
    },
    secondary: {
      main: '#ffeb3b',
    },
  },
});

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.category);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textTransform: 'uppercase' }}>
              Categories
            </Typography>
          </Toolbar>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: 'white',
              color: '#000',
              width: '200px',
              textAlign: 'center',
            },
          }}
        >
          {status === 'loading' && <MenuItem>Loading...</MenuItem>}
          {status === 'failed' && <MenuItem>Error: {error}</MenuItem>}
          {items.map((category) => (
            <MenuItem
              key={category}
              onClick={handleMenuClose}
              sx={{
                '&:hover': {
                  bgcolor: '#ffeb3b',
                  fontWeight: 'semibold',
                },
              }}
            >
             <Link to={`/category/${category}`} className="text-danger fs-4" style={{textDecoration:"none", color: "inherit"}}>{category.toUpperCase()}</Link> 
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </ThemeProvider>
  );
};

export default CategoryDropdown;

