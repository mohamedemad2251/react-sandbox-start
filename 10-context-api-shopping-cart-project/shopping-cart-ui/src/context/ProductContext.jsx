import { useState, useEffect, createContext } from "react";
import { getAllProducts } from "../api/products";

// ProductContext is the context we've created to be the entry point for {products,loading,error} across the project. Hence, it's the context for these global states.
export const ProductContext = createContext();

// ProductProvider is just a wrapper that uses <ProductContext.Provider><App/></ProductContext.Provider> which tells the App (i.e. child component): hey, you can use whatever I put in the "value="
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
