import { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';


function Cart() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('/orders')
    .then(r=>r.json())
    .then(orderData => setOrders(orderData))
  }, [])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {orders.map((order) => (
          <ListItem key={order.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={order.name} secondary={order.desc} />
            <Typography variant="body2">{order.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      </>
  );
}

export default Cart;