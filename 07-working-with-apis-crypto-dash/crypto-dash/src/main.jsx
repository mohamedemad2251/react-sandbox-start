import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* For routing, we'll use react-router (declarative mode) which is the legacy mode that is defaulted to SPA's (Single Page Applications). Basically, all pages will be loaded in one chunk but only the page we're routed to will appear (handled via JavaScript) */}
    {/* The layering for routing is: <BrowserRouter/> (Website Routing Wrapper) -> <Routes/> (List) -> <Route/> (Each Route) */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
