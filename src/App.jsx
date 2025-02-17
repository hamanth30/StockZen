import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Stocks from './components/Stocks'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Stocks/>
    // <Home/>
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/Stocks" element={<Stocks />}/>
      
    </Routes>
  </BrowserRouter>
  )
}

export default App
