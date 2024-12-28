import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Container,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchProducts } from '../../../redux/slice/productSlice';
import { Link } from 'react-router-dom';

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

const ProductPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState('name'); // Default sort by name

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

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
      <Box sx={{ backgroundColor: '#fffde7', py: 2 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{ color: '#fdd835', fontWeight: 'bold' }}
          >
            Our Products
          </Typography>

          {/* Sorting */}
          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} onChange={handleSortChange}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Product List */}
          <Grid container spacing={4}>
            {currentItems.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '90%', // Uniform height
                    boxShadow: 3,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      height: '300px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mx: 'auto',
                      py: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image || 'https://via.placeholder.com/300x200'}
                      alt={product.name}
                      sx={{
                        height: '100%',
                        width: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
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
                     <Link to={`/details/${product.id}`} className="text-danger fs-4" style={{textDecoration:"none", color: "inherit"}}>
                     View Product
                     </Link> 
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(items.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ProductPage;


