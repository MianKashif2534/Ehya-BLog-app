import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store";
import { Provider } from "react-redux";

// Initialize QueryClient
const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <App />
        {/* Add Devtools for better debugging */}
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
