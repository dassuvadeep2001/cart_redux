import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchProductsByCategory } from '../../../redux/categorySlice/categorySlice';
import { Link, useParams } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fdd835', // Yellow theme
    },
    secondary: {
      main: '#ffeb3b',
    },
  },
});

const FetchByCategoryProduct = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { productsByCategory, status, error } = useSelector((state) => state.category);

  // State to manage sorting option and sorted products
  const [sortOption, setSortOption] = useState('');
  const [sortedProducts, setSortedProducts] = useState(productsByCategory);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [dispatch, category]);

  // Update sortedProducts when the fetched productsByCategory change
  useEffect(() => {
    setSortedProducts(productsByCategory);
  }, [productsByCategory]);

  // Function to handle sorting based on selected option
  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedProducts = [...productsByCategory]; // Create a shallow copy of the array to avoid mutation

    if (option === 'name') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    // Update the sorted products state
    setSortedProducts(sortedProducts);
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h4" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: '#fffde7', // Light yellow background
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ color: '#fdd835', fontWeight: 'bold' }}
          >
            Products in "{category.toUpperCase()}"
          </Typography>

          {/* Sort Dropdown */}
          <Box textAlign="right" mb={2}>
            <FormControl variant="outlined" sx={{ width: 100 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} onChange={handleSortChange} label="Sort By">
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Products Grid */}
          <Grid container spacing={4}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    boxShadow: 3,
                  }}
                >
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image || 'https://via.placeholder.com/300x200'}
                      alt={product.title}
                      sx={{
                        height: '100%',
                        width: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ color: '#fdd835', fontWeight: 'bold' }}
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FFB22C' }}>
                      Price: ${product.price}
                    </Typography>
                  </CardContent>
                  <Box textAlign="center" pb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: '50%', fontWeight: 'semibold' }}
                    >
                      <Link to={`/details/${product.id}`} className="text-danger fs-4" style={{textDecoration:"none", color: "inherit"}}>View Product</Link> 
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FetchByCategoryProduct;

