import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Words from "./components/pages/words.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="words" element={<Words />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
