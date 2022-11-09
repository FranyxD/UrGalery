import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Favorites from './components/Favorites';

function App() {
  return (
    <BrowserRouter>
    <Header />
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
