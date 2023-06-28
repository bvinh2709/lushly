import { useState } from 'react'
import { Toolbar, AppBar, Button, Typography, Menu, MenuItem  } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home'

function Navbar({user, onLogout}) {

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  function handleLogout() {
    onLogout()
    navigate('/login')
  }

  const handleDelete = () => {
    fetch(`users/${user.id}`,{
    method: 'DELETE'
    })
    handleLogout()
  }

  return (
    <div>
        { user ? (
            <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Button><Link to='/'><HomeIcon/></Link></Button>
            <Typography  className='text-green-600' variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Lushly
            </Typography>
            <nav>
              <Button><Link to='/products'>Products</Link></Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Typography>
                    Hello, {user?.user_f_name}
                </Typography>
              </Button>
              <Menu

                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}

                >
                  <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
                    <Button onClick={()=>navigate('/profile')}>
                      Profile
                      {/* <PermIdentityOutlined /> */}
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
                  <Button onClick={handleDelete}>
                      Deactivate
                      {/* <NoAccountsOutlined /> */}
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
                    <Button onClick={handleLogout}>
                      LogOut
                      {/* <LogoutOutlined /> */}
                    </Button>
                  </MenuItem>
                </Menu>
              <Button><Link to='/checkout'><ShoppingCartIcon/></Link></Button>
            </nav>
          </Toolbar>
        </AppBar>
        ) : (
            <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Button><Link to='/'><HomeIcon/></Link></Button>
                <Typography  className='text-green-600' variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Lushly
                </Typography>
                <nav>
                <Button><Link to='/products'>Products</Link></Button>
                <Button><Link to='/login'>Log In</Link></Button>
                <Button><Link to='/checkout'><ShoppingCartIcon/></Link></Button>
                </nav>
            </Toolbar>
            </AppBar>
        )}
    </div>
  )
}

export default Navbar
