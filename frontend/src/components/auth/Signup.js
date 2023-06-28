import * as React from 'react';
import { Avatar, Toolbar, AppBar, Button, Box, Grid,
         Typography, Container, TextField, CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'

function Signup() {

  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    f_name: yup
    .string()
    .required('Give me your damn name boi!'),
    l_name: yup
    .string()
    .required('Give me your damn name boi!'),
    email: yup
    .string()
    // .email("Invalid email")
    .required('Give me your damn email boi!'),
    password: yup
    .string()
    .required('Yes, I wont tell anyone that u using your ex bd!')
  })

  const formik = useFormik({
    initialValues: {
      f_name: "",
      l_name: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then(r => {
        if (r.ok) {
          r.json().then((user) => console.log(user))
          toast.success('Welcome new user!', {
            autoClose: 2000,
          })
          navigate('/login')
        } else {
          toast.error('Something is wrong!', {
            autoClose: 2000,
          })
        }
      })
    }
  })


  return (

    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form onSubmit={formik.handleSubmit}>
          <Box noValidate sx={{ mt: 3 }} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="f_name"
                  fullWidth
                  id="f_name"
                  label="First Name"
                  autoFocus
                  type='text'
                  placeholder='John'
                  value={formik.values.f_name}
                  onChange={formik.handleChange}
                />
                <Typography sx={{color: "red"}}>{formik.errors.f_name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="l_name"
                  label="Last Name"
                  name="l_name"
                  autoComplete="family-name"
                  type='text'
                  placeholder='Doe'
                  value={formik.values.l_name}
                  onChange={formik.handleChange}
                />
                <Typography sx={{color: "red"}}>{formik.errors.l_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type='email'
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="johndoe@gmail.com"
                />
                <Typography sx={{color: "red"}}>{formik.errors.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <Typography sx={{color: "red"}}>{formik.errors.password}</Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button type='submit'>
                  <Link to='/login'>Already have an account? Login here!</Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default Signup
