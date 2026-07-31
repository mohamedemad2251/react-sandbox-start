// As you can see, we did "props drilling" where the global state "products" is in the App.jsx and we want to pass it down to the ProductCard level; so App -> ProductList -> ProductCard. If we have complex logic, it'd be hard to keep using props drilling, specially if many props are in the picture like callbacks, etc. The solution is to use the Context API (i.e. useContext()) which React provides for this specific case/scenario. OR we can use a global state management system like Zustand, Redux, etc.

import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  // Remember, if you defined cart, setCart outside of the functional component, that would break the rule of hooks (being the top-level of the component). Also, you cannot define a state/hook-related variable in an event-handler helper (I learned that the hard way)
  const { cart, setCart } = useCart();
  const addToCart = (product) => {
    // Concatenate the new item to the cart
    setCart((prev) => {
      const exists = cart.find((item) => item.id === product.id);
      const newCart = exists
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { ...product, quantity: 1 }];
      console.log(newCart);
      return newCart;
    });
  };

  return (
    <div className="w-full flex flex-col gap-3 shadow-md bg-white rounded-lg p-4">
      <div className="relative w-full h-[200px]">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      <p className="font-bold text-lg">{product.name}</p>
      {product.description && (
        <p className=" text-[#616161]">{product.description}</p>
      )}
      {product.price && (
        <p className="font-bold text-lg mt-auto">
          ${product.price.toLocaleString()}
        </p>
      )}
      <button
        onClick={() => addToCart(product)}
        className="w-full py-2 mt-auto bg-blue-500 hover:bg-blue-600 text-white text-center leading-tight cursor-pointer rounded-md transition-[background-color] duration-300"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
