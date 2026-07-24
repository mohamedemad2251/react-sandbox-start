import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

const App = () => {
  return (
    <>
      <Header />
      {/* To use routing, we need to give a routes list (<Routes/>) with <Route/> in it */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin-details/:id" element={<CoinDetailsPage />} />
        {/* Not Found Routing */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
