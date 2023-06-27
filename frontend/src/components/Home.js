import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'

function Home() {
  return (
    <>
      Lushly<br/>
      <Button>
        <Link to='signup'>Sign Up</Link>
      </Button><br/>
      <Button>
        <Link to='/login'>Login</Link>
      </Button>
    </>
  )
}

export default Home
