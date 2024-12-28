import React from 'react';
import { Avatar, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography, Box, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, deleteitem, incrementQty, clearCart } from '../../../redux/cartslice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = () => {
  const { cart, Totalprice } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increment = (id) => {
    dispatch(incrementQty(id));
  };

  const decrement = (id) => {
    dispatch(decrementQty(id));
  };

  const remove = (id) => {
    dispatch(deleteitem(id));
  };

  const placeOrder = () => {
    // Display SweetAlert for order confirmation
    Swal.fire({
      title: 'Success!',
      text: 'Your order has been placed successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      dispatch(clearCart()); // Clear cart after order
      navigate('/'); // Navigate to home page after order
    });
  };

  /*      MUI styles     */
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.yellow,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Box sx={{ backgroundColor: '#fff', p: 5, height: 'auto' }}>
      <Container maxWidth="xl">
        {cart.length === 0 ? (
          // When cart is empty
          <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 9 }}>
            <img
              src="https://img.freepik.com/free-vector/empty-shopping-basket-concept-illustration_114360-22411.jpg?t=st=1727096732~exp=1727100332~hmac=8e94ccda2b690bba058bb29365681f586d7c4d7d3dbacca04b5d23d536a278fe&w=740"
              alt="Empty Cart"
              height="230px"
            />
            <h2 style={{ color: '#000', fontSize: '1.5rem' }}>Your cart is empty!</h2>
            <p>There are no items in your cart. Let's add some items.</p>
            <Link to="/">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FFB800',
                  color: 'black',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '10px',
                }}
              >
                Shop Now
              </Button>
            </Link>
          </Box>
        ) : (
          // When cart has items
          <>
          <Box sx={{py: 5}}>
            <Typography variant="h4" sx={{ textAlign: 'center', color: 'black', mb: 5 }}>
              Total: ${Totalprice}
            </Typography>

            <TableContainer component={Paper} className="table" sx={{ boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#FFB800' }}>
                  <StyledTableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell align="center">Title</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Increment</StyledTableCell>
                    <StyledTableCell align="right">Decrement</StyledTableCell>
                    <StyledTableCell align="right">Total Items</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {cart.map((item) => (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell align="right">
                        <Avatar src={item?.image} sx={{ width: 100, height: 100 }} />
                      </StyledTableCell>
                      <StyledTableCell align="center">{item?.title}</StyledTableCell>
                      <StyledTableCell align="right">${item?.price}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#FFB800', color: 'black' }}
                          onClick={() => increment(item?.id)}
                        >
                          +
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#FFB800', color: 'black' }}
                          onClick={item.quantity === 1 ? () => remove(item.id) : () => decrement(item.id)}
                        >
                          <RemoveIcon />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography>{item.quantity}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          onClick={() => remove(item?.id)}
                          sx={{
                            backgroundColor: '#FFB800',
                            color: 'black',
                            '&:hover': {
                              backgroundColor: '#FF8C00',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ textAlign: 'center', mt: 8, mb: 10 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FFB800',
                  color: 'black',
                  fontWeight: 'bold',
                  padding: '12px 25px',
                  borderRadius: '10px',
                }}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </Box>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Cart;

