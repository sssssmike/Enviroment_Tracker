import React, { useState } from "react";
import Map from "../Components/Map";
import Navbar from "../Components/Navbar";

// Pages are good for organizing multiple components together
document.body.style.overflow = "hidden"

function MapPage() {
  return (
    <div className="App">
      <Navbar />
      <div className = "mapBorder">
        <Map/>
      </div>
    </div>
  );
}

export default MapPage;