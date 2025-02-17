import React from 'react'
import bg from "./img.jpg"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate= useNavigate()
    
    const handleClick= () =>
    {
        navigate("/Stocks")
    }

  return (
    <div className="min-h-screen items-center justify-center"
        style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div className='text-4xl font-bold text-white p-10'>
                StockZen
        </div>

        <div className="rounded-lg shadow-lg p-20 mr-150 ml-10 mt-4 bg-green-100 text-2xl font-bold text-red">
                Welcome to StockZen!!
                Get your self updated with latest Stock prices of buisness companies 💵📈📊
                <div className='items-center ml-75 mt-5'>
                        <button className='rounded-lg shadow-lg p-4 ml-4 bg-red-400 text-white'
                        onClick = {handleClick}>
                            Start Now!
                        </button>
                </div>
        </div>

    </div>
  )
}

export default Home