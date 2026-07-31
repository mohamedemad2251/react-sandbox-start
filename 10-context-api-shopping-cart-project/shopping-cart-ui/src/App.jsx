import { getAllProducts } from "./api/products";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <main className="w-screen min-h-screen  bg-[#eee]">
      {/* Header */}
      <Header />
      {/* Main Page */}
      <article className="w-full flex justify-center mt-5">
        <ProductList />
      </article>
    </main>
  );
};

export default App;
