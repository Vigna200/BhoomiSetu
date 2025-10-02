import React, { useState } from "react";

function CropMarket() {
  const [commodity, setCommodity] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [markets, setMarkets] = useState([]);
  const [market, setMarket] = useState("");
  const [quantity, setQuantity] = useState("");
  const [prices, setPrices] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [loading, setLoading] = useState(false);

  // 👉 Your backend URL
  const backendUrl = "https://bhoomisetu-2.onrender.com";

  // Step 1: When crop is selected → fetch states
  const fetchStates = async (crop) => {
    setState("");
    setMarket("");
    setMarkets([]);
    setPrices([]);
    setTotalRevenue(null);
    if (!crop) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=100&filters[commodity]=${crop}`
      );
      const data = await res.json();
      if (data.records) {
        const uniqueStates = [...new Set(data.records.map((r) => r.state))];
        setStates(uniqueStates);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch states.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: When state is selected → fetch markets
  const fetchMarkets = async (crop, stateName) => {
    setMarket("");
    setMarkets([]);
    setPrices([]);
    setTotalRevenue(null);
    if (!crop || !stateName) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=100&filters[commodity]=${crop}&filters[state]=${stateName}`
      );
      const data = await res.json();
      if (data.records) {
        const uniqueMarkets = [
          ...new Set(
            data.records.map((r) => `${r.market} (${r.arrivals_in_qtl} qtl)`)
          ),
        ];
        setMarkets(uniqueMarkets);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch markets.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Fetch prices from backend
  const fetchPrices = async () => {
    if (!commodity || !state || !market || !quantity) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const marketName = market.split(" (")[0];
      const url = `${backendUrl}/request?commodity=${commodity}&state=${state}&market=${marketName}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setPrices([]);
        setTotalRevenue(null);
        return;
      }

      setPrices(data);
      const latestPrice = parseInt(data[0]["Modal Price"]);
      setTotalRevenue(latestPrice * quantity);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch prices.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>🌾 Smart Crop Market Price Lookup</h2>

      <div className="form-grid">
        <div className="field">
          <label>Crop:</label>
          <select
            value={commodity}
            onChange={(e) => {
              setCommodity(e.target.value);
              fetchStates(e.target.value);
            }}
          >
            <option value="">Select Crop</option>
            <option value="Onion">Onion</option>
            <option value="Tomato">Tomato</option>
            <option value="Potato">Potato</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Maize">Maize</option>
          </select>
        </div>

        <div className="field">
          <label>Quantity (quintals):</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="field">
          <label>State:</label>
          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              fetchMarkets(commodity, e.target.value);
            }}
            disabled={!commodity}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Market:</label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            disabled={!state}
          >
            <option value="">Select Market</option>
            {markets.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={fetchPrices} disabled={loading}>
        {loading ? "Fetching..." : "Get Prices"}
      </button>

      {prices.length > 0 && (
        <div className="table-container animate-fadeIn">
          <h3>
            Market Prices for {commodity} in {market}, {state}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Min Price</th>
                <th>Modal Price</th>
                <th>Max Price</th>
                <th>Market</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p, index) => (
                <tr key={index}>
                  <td>{p.Date}</td>
                  <td>₹{p["Min Price"]}</td>
                  <td>₹{p["Modal Price"]}</td>
                  <td>₹{p["Max Price"]}</td>
                  <td>{p.Market}</td>
                  <td>{p.State}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalRevenue !== null && (
        <div className="revenue animate-bounce">
          <strong>💰 Estimated Revenue:</strong> ₹{totalRevenue}
        </div>
      )}

      {/* 👉 CSS inside same file */}
      <style>{`
        body { background: linear-gradient(135deg, #e0f7fa, #f1f8e9); }
        .container {
          max-width: 950px;
          margin: 50px auto;
          padding: 25px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          font-family: "Segoe UI", sans-serif;
          animation: fadeIn 1.2s ease-in;
        }
        h2 { text-align: center; background: -webkit-linear-gradient(#2e7d32, #43a047);
             -webkit-background-clip: text; -webkit-text-fill-color: transparent;
             font-size: 28px; margin-bottom: 25px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .field label { font-weight: 600; margin-bottom: 5px; display: block; }
        input, select {
          width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ccc;
          transition: 0.3s; background: #fafafa;
        }
        input:focus, select:focus { border-color: #2e7d32; box-shadow: 0 0 8px #a5d6a7; }
        button {
          width: 100%; padding: 14px; font-size: 16px; font-weight: bold;
          background: linear-gradient(90deg, #2e7d32, #43a047);
          color: white; border: none; border-radius: 8px; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.3s;
        }
        button:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(46,125,50,0.4); }
        .table-container { margin-top: 30px; overflow-x: auto; border-radius: 12px; }
        table { width: 100%; border-collapse: collapse; overflow: hidden; }
        th, td { padding: 12px; border: 1px solid #ddd; text-align: center; font-size: 15px; }
        th { background: #a5d6a7; }
        tr:hover { background: #e8f5e9; transition: 0.3s; }
        .revenue { margin-top: 25px; font-size: 20px; color: #1b5e20; text-align: center; font-weight: bold; }
        .animate-fadeIn { animation: fadeIn 1s ease-in; }
        .animate-bounce { animation: bounce 1.5s infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media(max-width: 700px) { .form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default CropMarket;
