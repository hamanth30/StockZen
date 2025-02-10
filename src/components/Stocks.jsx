// import React from 'react';
// import bg from "./img.jpg";
// import axios from "axios"
// const Stocks = () => {

//   const [price,setPrice] = useState(null)
//   const [symbol,setSymbol] = useState("")
//   const [error,setError] = useState("")

//   const fetchPrice = async => {
//     if(!symbol)
//     {
//       setError("Please enter a valid stock name")
//       return
//     }
//     setError("")

//     const API_KEY = "cuji829r01qm7p9o6qtgcuji829r01qm7p9o6qu0"
//     const URL = "https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${API_KEY}"

//     try
//     {
//       const response = await axios.get(URL);
//       setPrice(response.data.c || "No data avilable")
//     }
//     catch(err){
//       setError("Cannot fetch the stock price due to invalid stock symbol")
//     }
//   }
  
  
//     return (
//     //<div className=' bg-red-300 flex items-center justify-center'>
//         <div className="min-h-screen p-10 text-white items-center justify-center"
//           style ={{
//               backgroundImage: `url(${bg})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center", }}>
//             <div className="text-4xl font-bold text-white ">Stock Zen</div>
//               <div className="rounded-lg shadow-lg p-40 bg-white bg-opacity-50">
//                   <input
//                   type = "text"
//                   placeholder='Enter stock symbol (like AAPL)'
//                   value = {symbol}
//                   onChange={(e)=>setSymbol(e.target.value)}
//                   />
//                   <button onClick={fetchPrice}>Check Price</button>

//                   {price!==}
//               </div>
            
//           </div>

//     //</div>

//   )
// }

// export default Stocks

import React, { useState } from "react";
import { sampleSearchResults } from "../consts/sample";
import { mockCompanyDetails } from "../consts/sample";

const Stocks = () => {
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState(sampleSearchResults.result); // Fix reference to 'result'

  // Function to handle live search
  const handleSearch = (event) => {
    const query = event.target.value;
    setInput(query);

    if (query.trim() === "") {
      setMatches(sampleSearchResults.result); // Reset results if input is empty
    } else {
      const filteredResults = sampleSearchResults.result.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.displaySymbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.description.toLowerCase().includes(query.toLowerCase())
      );
      setMatches(filteredResults);
    }
  };

  // Function to clear input and reset results
  const clear = () => {
    setInput("");
    setMatches(sampleSearchResults.result);
  };

  return (
    <div className="p-10 flex flex-col min-h-screen bg-green-200 items-center justify-center space-y-5">
      <h1 className="text-3xl">Enter the Stock symbol you want to check:</h1>

      <div className="flex items-center space-x-2">
        <input
          className="rounded-lg shadow-lg bg-white p-5 px-4 py-2 w-full max-w-xs"
          type="text"
          value={input}
          placeholder="Search by stock symbol..."
          onChange={handleSearch}
        />
        <button
          onClick={clear}
          className="p-5 bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {/* Display search results */}
      {matches.length > 0 && (
        <ul className="bg-white rounded shadow-lg p-4 w-full max-w-xs">
          {matches.map((stock) => (
            <li key={stock.symbol} className="p-2 border-b last:border-0">
              <strong>{stock.displaySymbol}</strong> - {stock.description} ({stock.type})
            </li>
          ))}
        </ul>
      )}

      {/* Stock details */}
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7">
        <div className="col-span-1 row-span-1">
          <h1 className="text-xl font-bold">{mockCompanyDetails.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
