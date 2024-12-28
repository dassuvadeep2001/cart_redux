import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  allitem: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  Totalprice: JSON.parse(localStorage.getItem("total")) || 0,
};

export const allproduct = createAsyncThunk("/all", async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res?.data;
});

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    additem: (state, { payload }) => {
      const newitem = {
        id: payload?.id,
        title: payload?.title,
        price: payload?.price,
        newprice: payload?.price,
        image: payload?.image,
        quantity: 1,
      };
      const itemind = state.cart.findIndex((item) => item.id === payload.id);
      if (itemind === -1) {
        state.cart.push(newitem);
      } else {
        state.cart = state.cart.map((item, ind) => {
          if (ind === itemind) {
            item.quantity++;
            item.newprice = item.quantity * item.price;
            return item;
          } else {
            return item;
          }
        });
      }
      state.Totalprice += Math.floor(payload?.price);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },
    incrementQty: (state, { payload }) => {
      state.cart = state.cart.map((item) => {
        if (item.id === payload) {
          item.quantity++;
          item.newprice = item.quantity * item.price;
          return item;
        } else {
          return item;
        }
      });
      state.Totalprice = state.cart.reduce((accum, item) => {
        return accum + Math.floor(item.newprice);
      }, 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },
    decrementQty: (state, { payload }) => {
      state.cart = state.cart.map((item) => {
        if (item.id === payload) {
          item.quantity--;
          item.newprice = item.quantity * item.price;
          return item;
        } else {
          return item;
        }
      });
      state.Totalprice = state.cart.reduce((accum, item) => {
        return accum + Math.floor(item.newprice);
      }, 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },
    deleteitem: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
      state.Totalprice = state.cart.reduce((accum, item) => {
        return accum + Math.floor(item.newprice);
      }, 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },
    clearCart: (state) => {
      state.cart = [];
      state.Totalprice = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allproduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(allproduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allitem = payload;
    })
    .addCase(allproduct.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { additem, incrementQty, decrementQty, deleteitem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;


