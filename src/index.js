import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MapPage from "./Pages/MapPage";
import About from "./Pages/About";
import News from "./Pages/News";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <div>
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/News" element={<News />} />
        </Routes>
      </main>
    </div>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();