import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store";
import { Provider } from "react-redux";
import { stables } from "./constants";

// Initialize QueryClient
const client = new QueryClient();

axios.defaults.baseURL = stables.API_BASE_URL;

// const client = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

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
