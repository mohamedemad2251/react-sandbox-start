import { BiMinus, BiPlus } from "react-icons/bi";
import { useCart } from "../context/CartContext";

const CartModal = () => {
  const { cart, setCart } = useCart();

  const incrementProduct = (product) => {
    setCart((prev) => {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  };

  const decrementProduct = (product) => {
    setCart((prev) => {
      const targetItem = prev.find((item) => item.id === product.id);
      return targetItem.quantity === 1
        ? prev.filter((item) => item.id !== product.id)
        : prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
    });
  };

  const CartItem = ({ item }) => {
    return (
      <li className="relative w-full flex gap-2 items-center py-2">
        <div className="relative w-15 aspect-square flex justify-center items-center">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>{item.name}</p>
          <p className="text-sm  text-[#616161]">
            ${item.price.toLocaleString()}
          </p>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] h-px bg-[#ccc]/70" />

        <div className="ml-auto w-[30%] flex justify-between items-center px-2 py-1 bg-white rounded-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              decrementProduct(item);
            }}
          >
            <BiMinus className="text-sm" />
          </button>
          <p className="leading-none">{item.quantity}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              incrementProduct(item);
            }}
          >
            <BiPlus className="text-sm" />
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="absolute right-0 top-10 w-[300px] min-h-[300px] flex justify-center bg-[#eee] shadow-lg rounded-md z-50 p-6">
      <ul className="w-full flex flex-col gap-4 ">
        {cart.length > 0
          ? cart.map((item, index) => (
              <CartItem key={item.id} item={item} />
            ))
          : "No items found, please add some!"}
      </ul>
    </div>
  );
};

export default CartModal;
