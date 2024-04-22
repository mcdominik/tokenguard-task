import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

axios.defaults.baseURL = "https://api.tokenguard.io/db-api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "top", isClosable: true, duration: 3000 },
      }}
    >
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
