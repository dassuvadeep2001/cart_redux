import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Rating,
  Paper,
  Divider,
  Container
} from '@mui/material';
import { fetchProductById } from '../../../redux/slice/productSlice';
import { additem } from '../../../redux/cartslice/cartSlice';  // Import the addToCart action

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from the URL
  const dispatch = useDispatch();
  const { productById, status, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)); // Dispatch the action to fetch product details
    }
  }, [dispatch, id]);

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

  if (!productById) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h4">Product not found</Typography>
      </Box>
    );
  }

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    dispatch(additem(productById)); // Dispatch action to add the product to the cart
    navigate('/cart'); // Navigate to the Cart page
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white', // Light yellow background
        py: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left: Product Image */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', justifyContent: 'center', boxShadow: 'none' }}>
              <img
                src={productById.image || 'https://via.placeholder.com/300x200'}
                alt={productById.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'contain',
                }}
              />
            </Paper>
          </Grid>

          {/* Right: Product Details */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, boxShadow: 'none' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fdd835' }}>
                {productById.title}
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, color: '#FFB22C' }}>
                Price: ${productById.price}
              </Typography>

              {/* Rating */}
              <Box sx={{ mt: 2 }}>
                <Rating
                  name="product-rating"
                  value={productById.rating?.rate || 0}
                  precision={0.1}
                  readOnly
                />
                <Typography variant="body2" sx={{ color: '#888' }}>
                  {productById.rating?.rate} ({productById.rating?.count} reviews)
                </Typography>
              </Box>

              {/* Product Description */}
              <Typography variant="body1" sx={{ mt: 2, color: '#444' }}>
                {productById.description}
              </Typography>

              {/* Add to Cart Button */}
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    width: '60%',
                    fontWeight: 'bold',
                    py: 1.5,
                    fontSize: '1rem',
                    borderRadius: '5px',
                    bgcolor: '#FFB22C',
                    color: 'black',
                  }}
                  onClick={handleAddToCart} // Add onClick handler for navigation
                >
                  Add to Cart
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
      </Container>
    </Box>
  );
};

export default ProductDetailPage;


