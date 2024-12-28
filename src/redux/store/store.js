import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../slice/productSlice'
import categoryReducer from '../categorySlice/categorySlice'
import cartReducer from '../cartslice/cartSlice'
const store=configureStore({
    reducer:{
        product:productReducer,
        category:categoryReducer,
        cart:cartReducer
    }
})
export default store