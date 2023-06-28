import { useState, useEffect } from 'react'
import Home from './components/Home';
import Error from './components/Error'
import {Routes, Route, useLocation} from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Checkout from './components/checkout/Checkout'
import Products from './components/Products';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import axios from 'axios'

const ScrollToTop = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null

}

function App() {

  const [user, setUser] = useState(null)

  function handleLogin(user) {
    setUser(user);
  }

  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
          response.json().then((user) => {
            setUser(user);
            console.log(user)
          })
      }
  });

  }, [])

  function handleLogout() {
    axios.delete('/logout')
    .then(response => {
      setUser(null);
    })
    .catch(error => {
      console.log(error)
    })
}

  return (
    <>

        <ToastContainer />
        <ScrollToTop />
        <Navbar user={user} onLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login handleLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/products' element={<Products/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
    </>
  );
}

export default App;
