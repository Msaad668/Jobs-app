import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
