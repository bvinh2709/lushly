
import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia,
         Grid, Box, Typography, Container }from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import lushly from './lushly.png'

export default function Album() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/products')
    .then(r=>r.json())
    .then(productData => setProducts(productData))
  }, [])

  return (
    <>
      <main className='bg-slate-400'>
        {/* Hero unit */}
        <Box className='bg-white pt-2 pb-6'>
          <Container maxWidth="sm">
            <Typography
              className='text-green-600'
              component="h1"
              variant="h2"
              align="center"
              color="text.success.main"
              gutterBottom
            >
              Lushly Products
            </Typography>
            <Typography variant="h5" align="center"
            color="text.secondary" paragraph>
              Welcome to the Lushly Product Page
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                    }} />
                    <img alt='company' src={product.image} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>
                    {product.desc}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ display:'flex', justifyContent:'space-between' }}>
                    {/* <Button size="small"><EditIcon/></Button> */}
                    <Box size="small">${product.price}</Box>
                    <Button size="extra small"><AddShoppingCartIcon/></Button>
                    {/* <Button></Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}