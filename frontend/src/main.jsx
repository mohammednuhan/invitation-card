import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import { registerSW } from "virtual:pwa-register";
import "./styles/index.css";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (confirm("A new version is available. Reload?")) {
      updateSW(true);
    }
  }
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
