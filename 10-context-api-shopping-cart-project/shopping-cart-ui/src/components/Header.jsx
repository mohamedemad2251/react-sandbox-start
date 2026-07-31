import { useEffect, useRef, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import CartModal from "./CartModal";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartElementRef = useRef(null);
  const { cart } = useCart();
  useEffect(() => {
    const clickOutsideCartListener = (e) => {
      e.target !== cartElementRef.current &&
      !cartElementRef.current.contains(e.target)
        ? setIsOpen(false)
        : "";
    };
    addEventListener("click", clickOutsideCartListener);

    return () => {
      removeEventListener("click", clickOutsideCartListener);
    };
  }, []);
  return (
    <header className="z-50 w-full h-15 flex justify-center items-center shadow-sm shadow-[#ddd] bg-white">
      <div className="md:w-1344/1440 w-392/440 max-w-[1500px] flex justify-between items-center">
        {/* First Flex Item: Header Title */}
        <p className="text-blue-500 font-bold text-2xl">ShopMate</p>
        {/* Second Flex Item: Shopping Cart */}
        <div ref={cartElementRef} className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative text-2xl rounded-full hover:bg-[#eee] transition-[background-color] duration-300 cursor-pointer"
          >
            { cart.length > 0 && <div className="absolute w-5 h-5 -right-2 -top-2 flex justify-center items-center rounded-full   bg-red-500 text-white text-xs leading-none">{cart.reduce((curr,acc)=>curr + acc.quantity,0)}</div>}
            <CgShoppingCart />
          </button>
          {isOpen && <CartModal />}
        </div>
      </div>
    </header>
  );
};

export default Header;
