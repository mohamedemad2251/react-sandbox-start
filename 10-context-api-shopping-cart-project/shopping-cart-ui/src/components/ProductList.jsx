import { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { products, isLoading, error } = useContext(ProductContext);
  return (
    <div className="md:w-1344/1440 w-392/440 max-w-[1500px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
