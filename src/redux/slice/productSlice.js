import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url, end_url } from '../../api/api';

// API endpoints
let productApi = base_url + end_url.product;
console.log("Product API:", productApi);

// Async Thunks to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get(productApi);
  console.log("axios response from Product page", res);
  return res?.data;
});

// Async Thunk to fetch product by ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const res = await axios.get(`${productApi}${id}`);
  console.log("axios response from Product page by ID", res);
  return res?.data;
});

// Product Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // List of all products
    productById: null, // Single product details
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetching all products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Fetching product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.productById = null; // Reset the product details while loading
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productById = action.payload; // Set the product details when fetched
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
