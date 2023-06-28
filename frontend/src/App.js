import React from 'react'
import Home from './components/Home';
import Error from './components/Error'
import {Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Checkout from './components/checkout/Checkout'
import Products from './components/Products';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/products' element={<Products/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  );
}

export default App;
