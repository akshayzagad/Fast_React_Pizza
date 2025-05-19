import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { totalCartPizzaQuantity, totalPizzaPrice1 } from "./cartSlice";

function CartOverview() {

  const totalPizzaQuantity = useSelector(totalCartPizzaQuantity);

  const totalPizzaPrice = useSelector(totalPizzaPrice1);

  if (!totalPizzaQuantity) return null;
  
    return (
      <div className="flex items-center justify-between bg-stone-700 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{totalPizzaQuantity} pizzas</span>
          <span>${totalPizzaPrice}</span>
        </p>
        <Link to="/cart">Open cart &rarr; </Link>
      </div>
    );
}

export default CartOverview;