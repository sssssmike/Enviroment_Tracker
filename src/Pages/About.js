import React, { useState } from "react";
import Navbar from "../Components/Navbar";
// Pages are good for organizing multiple components together

import testP from "../resources/both_circles.png";

function About() {
  return (
    <div className="App">
      <Navbar />
      <h1>About Us</h1>
      <div className="content">
        <img src={testP} alt="React Image"/>
        <div style={{ 
          border: "1px solid black", 
          padding: "10px", 
          backgroundColor: "#2EAF7D",
          margin: "0 500px"
        }}>
          <p style={{ fontSize: "20px" }}>
            Environment tracker keeps track of a wide range of atmospheric readings from arduinos spread out across an area. Based on the readings from these devices the 
            map will display the readings and a circle around the arduinos location if the readings get to deadly levels as you can see in the picture.
          </p>
        </div>
      </div>
    </div>
  );
}


export default About;