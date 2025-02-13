import React, { useState } from "react";

const basePath = "https://finnhub.io/api/v1";
const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY; 


console.log("API Key:", process.env.REACT_APP_FINNHUB_API_KEY);


const Stocks = () => {
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [stockPrice, setStockPrice] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);

  // Function to fetch stock search results
  const searchSymbol = async (query) => {
    try {
      const url = `${basePath}/search?q=${query}&token=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Stock search failed:", error);
      return { result: [] };
    }
  };

  // Function to fetch company details
  const fetchDetails = async (stockSymbol) => {
    try {
      const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setCompanyDetails(data);
    } catch (error) {
      console.error("Company details fetch failed:", error);
      setCompanyDetails(null);
    }
  };

  // Function to fetch real-time stock price
  const fetchStockPrice = async (stockSymbol) => {
    try {
      const url = `${basePath}/quote?symbol=${stockSymbol}&token=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setStockPrice(data.c); // 'c' represents the current price in Finnhub API
    } catch (error) {
      console.error("Stock price fetch failed:", error);
      setStockPrice(null);
    }
  };

  // Handle input change & fetch matching symbols
  const handleSearch = async (event) => {
    const query = event.target.value;
    setInput(query);

    if (query.trim() === "") {
      setMatches([]);
      setShowDropdown(false);
      return;
    }

    const data = await searchSymbol(query);
    setMatches(data.result || []);
    setShowDropdown(true);
  };

  // Handle selection from dropdown
  const handleSelect = async (symbol) => {
    setInput(symbol);
    setMatches([]);
    setShowDropdown(false);
    fetchDetails(symbol); // Get company details
    fetchStockPrice(symbol); // Get real-time price
  };

  return (
    <div className="p-10 flex flex-col min-h-screen bg-green-200 items-center justify-center space-y-5">
      <h1 className="text-3xl">Select or Search for a Stock Symbol:</h1>

      <div className="relative w-full max-w-xs">
        <input
          className="rounded-lg shadow-lg bg-white px-4 py-2 w-full"
          type="text"
          value={input}
          placeholder="Search or select stock..."
          onChange={handleSearch}
          onFocus={() => setShowDropdown(true)}
        />

        {/* Dropdown Search Results */}
        {showDropdown && matches.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
            {matches.map((stock) => (
              <li
                key={stock.symbol}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-0"
                onClick={() => handleSelect(stock.symbol)}
              >
                <strong>{stock.displaySymbol}</strong> - {stock.description} ({stock.type})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stock Details */}
      {companyDetails && (
        <div className="p-5 bg-white rounded-lg shadow-lg mt-5">
          <h2 className="text-xl font-bold">{companyDetails.name}</h2>
          <p><strong>Industry:</strong> {companyDetails.finnhubIndustry}</p>
          <p><strong>Market Cap:</strong> ${companyDetails.marketCapitalization}M</p>
          <p><strong>Exchange:</strong> {companyDetails.exchange}</p>
        </div>
      )}

      {/* Real-Time Stock Price */}
      {stockPrice !== null && (
        <div className="p-5 bg-blue-500 text-white rounded-lg shadow-lg mt-5 text-center">
          <h2 className="text-2xl font-bold">Current Price: ${stockPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default Stocks;
