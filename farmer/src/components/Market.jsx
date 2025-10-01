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

  const apiKey = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
  const resourceId = "9ef84268-d588-465a-a308-a864a43d0070";

  const CORS_PROXY = "https://api.allorigins.win/get?url="; // free CORS proxy

  // Helper to fetch data from Data.gov.in
  const fetchData = async (paramsObj) => {
    const params = new URLSearchParams({
      "api-key": apiKey,
      format: "json",
      limit: 100,
      ...paramsObj,
    });

    const targetUrl = encodeURIComponent(`https://api.data.gov.in/resource/${resourceId}?${params.toString()}`);
    const res = await fetch(`${CORS_PROXY}${targetUrl}`);
    const data = await res.json();

    if (!data || !data.contents) return [];
    const parsed = JSON.parse(data.contents);
    return parsed.records || [];
  };

  // Fetch states for selected crop
  const fetchStates = async (crop) => {
    setState("");
    setMarket("");
    setMarkets([]);
    setPrices([]);
    setTotalRevenue(null);
    setStates([]);
    if (!crop) return;

    try {
      setLoading(true);
      const records = await fetchData({ "filters[commodity]": crop });
      const uniqueStates = [...new Set(records.map((r) => r.state))];
      setStates(uniqueStates);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch states.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch markets for selected crop + state
  const fetchMarkets = async (crop, stateName) => {
    setMarket("");
    setMarkets([]);
    setPrices([]);
    setTotalRevenue(null);
    if (!crop || !stateName) return;

    try {
      setLoading(true);
      const records = await fetchData({
        "filters[commodity]": crop,
        "filters[state]": stateName,
      });
      const uniqueMarkets = [...new Set(records.map((r) => `${r.market} (${r.arrivals_in_qtl} qtl)`))];
      setMarkets(uniqueMarkets);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch markets.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch prices for selected crop + state + market
  const fetchPrices = async () => {
    if (!commodity || !state || !market || !quantity) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const marketName = market.split(" (")[0]; // remove "(xx qtl)"
      const records = await fetchData({
        "filters[commodity]": commodity,
        "filters[state]": state,
        "filters[market]": marketName,
      });

      if (!records || records.length === 0) {
        alert("No prices found!");
        setPrices([]);
        setTotalRevenue(null);
        return;
      }

      setPrices(records);
      const latestPrice = parseInt(records[0].modal_price);
      setTotalRevenue(latestPrice * quantity);
    } catch (err) {
      console.error(err);
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
              <option key={s} value={s}>{s}</option>
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
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={fetchPrices} disabled={loading}>
        {loading ? "Fetching..." : "Get Prices"}
      </button>

      {prices.length > 0 && (
        <div className="table-container">
          <h3>Market Prices for {commodity} in {market}, {state}</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Min Price</th>
                <th>Modal Price</th>
                <th>Max Price</th>
                <th>Arrivals (qtl)</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p, i) => (
                <tr key={i}>
                  <td>{p.arrival_date}</td>
                  <td>₹{p.min_price}</td>
                  <td>₹{p.modal_price}</td>
                  <td>₹{p.max_price}</td>
                  <td>{p.arrivals_in_qtl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalRevenue !== null && (
        <div className="revenue">
          <strong>💰 Estimated Revenue:</strong> ₹{totalRevenue}
        </div>
      )}

      <style>{`
        .container { max-width: 950px; margin:50px auto; padding:25px; background:#fff; border-radius:16px; font-family:Segoe UI,sans-serif; }
        h2 { text-align:center; margin-bottom:25px; }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
        .field label { font-weight:600; display:block; margin-bottom:5px; }
        input, select { width:100%; padding:10px; border-radius:8px; border:1px solid #ccc; }
        button { width:100%; padding:14px; background:linear-gradient(90deg,#2e7d32,#43a047); color:white; font-weight:bold; border:none; border-radius:8px; cursor:pointer; }
        table { width:100%; border-collapse:collapse; margin-top:20px; }
        th, td { padding:12px; border:1px solid #ddd; text-align:center; }
        th { background:#a5d6a7; }
        .revenue { margin-top:25px; font-size:20px; text-align:center; color:#1b5e20; font-weight:bold; }
        @media(max-width:700px){.form-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

export default CropMarket;
