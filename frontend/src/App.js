import React from 'react' 
import Home from './components/Home';
import Error from './components/Error'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  );
}

export default App;
