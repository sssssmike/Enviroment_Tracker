import React, { useState } from "react";
import Login from "../Components/Login";

// Pages are good for organizing multiple components together

function Home() {
  return (
    <div className="App">
      <h1>Environment Tracker</h1>
      <Login/>
    </div>
  );
}

export default Home;