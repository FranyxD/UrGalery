import React from "react";
import "../App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Favorites from './pages/Favorites';

function App() {
  
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/UrGalery" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/Favorites" element={<Favorites />}/>
    </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
