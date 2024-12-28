import React from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Header from '../component/layout/header/header'
import Footer from '../component/layout/footer/footer'
import ProductPage from '../component/pages/product/product'
import { Grid } from '@mui/material'
import CategoryDropdown from '../component/pages/category/category'
import FetchByCategoryProduct from '../component/pages/categorywiseProduct/categoryProduct'
import ProductDetailPage from '../component/pages/detailsproduct/productdetails'
import Cart from '../component/pages/cart/cart'


function Routing() {
  return (
    <Router>
      <Header/>
        <Routes>
        <Route
          path="/"
          element={
            <Grid sx={{backgroundColor: '#fffde7'}}>
               {/* Product List Section */}
                <Grid item xs={0} sm={0} md={0}>
                <CategoryDropdown/>
              </Grid>
              {/* Product List Section */}
              <Grid item xs={12} sm={12} md={12}>
                <ProductPage/>
              </Grid>
            </Grid>
          }
        />
        <Route
          path="/category/:category"
          element={
            <Grid sx={{backgroundColor: '#fffde7'}}>
               {/* Product List Section */}
                <Grid item xs={0} sm={0} md={0}>
                <CategoryDropdown/>
              </Grid>
              {/* Product List Section */}
              <Grid item xs={12} sm={12} md={12}>
                <FetchByCategoryProduct/>
              </Grid>
            </Grid>
          }
        />
        <Route
          path="/details/:id"
          element={
            <Grid sx={{backgroundColor: '#fffde7'}}>
               {/* Product List Section */}
                <Grid item xs={0} sm={0} md={0}>
                <CategoryDropdown/>
              </Grid>
              {/* Product List Section */}
              <Grid item xs={12} sm={12} md={12}>
                <ProductDetailPage/>
              </Grid>
            </Grid>
          }
        />
        <Route path="/cart" element={<Cart/>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default Routing