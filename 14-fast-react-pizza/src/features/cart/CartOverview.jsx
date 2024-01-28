import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPizzaQuantity } from "./cartSlice";
import { getTotalCartPizzaPrice } from "./cartSlice";

function CartOverview() {
  const totalCartPizzaQuantity = useSelector(getTotalCartPizzaQuantity);
  const totalCartPizzaPrice = useSelector(getTotalCartPizzaPrice);
  if (!totalCartPizzaQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartPizzaQuantity} pizzas</span>
        <span>${totalCartPizzaPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
