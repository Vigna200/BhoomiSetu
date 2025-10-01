import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Crop from "./components/Crop";
import Disease from "./components/Disease";
import Fertilizer from "./components/Fertilizer";
import Market from "./components/Market";
import Weather from "./components/Weather";
import Feedback from "./components/Feedback";
import Chatbot from "./components/Chatbot";
import "./App.css";


function App() {
return (
<Router>
<div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white text-green-900">
<Navbar />
<main className="flex-1">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/crop" element={<Crop />} />
<Route path="/disease" element={<Disease />} />
<Route path="/fertilizer" element={<Fertilizer />} />
<Route path="/market" element={<Market />} />
<Route path="/weather" element={<Weather />} />
<Route path="/feedback" element={<Feedback />} />
<Route path="/chatbot" element={<Chatbot />} />
</Routes>
</main>
<Footer />
</div>
</Router>
);
}


export default App;