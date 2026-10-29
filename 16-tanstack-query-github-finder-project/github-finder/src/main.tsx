import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Tanstack Query is an open-source, framework-agnostic library designed for managing, fetching, caching, and synchronizing server state in web applications.

// It allows you to have smooth API interactions via revalidations, caching and other.

// To use Tanstack Query, we need to have a QueryClient defined as well as a QueryClientProvider (basically a context provider) so that all the children components have access to such client.

// Create the tanstack query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // Provide the client via the provider
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
      <ReactQueryDevtools position="bottom" initialIsOpen={false} />
    </StrictMode>
  </QueryClientProvider>,
);
