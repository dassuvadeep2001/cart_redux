import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url, end_url } from '../../api/api';

// Define API URLs
const categoryApi = base_url + end_url.category;
const productByCategoryApi = base_url + end_url.categorywise;

// Async Thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(categoryApi);
      return response.data; // Return the categories
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
);

// Async Thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'categories/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${productByCategoryApi}${category}`);
      return response.data; // Return products in the given category
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products by category');
    }
  }
);

// Create Category Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [], // Categories array
    productsByCategory: [], // Products array filtered by category
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsByCategory = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export reducer to configure the store
export default categorySlice.reducer;


