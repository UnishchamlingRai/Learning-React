import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import {
  decreaseCartQuanitity,
  getCurrentCartById,
  increaseCartQuanitity,
} from "../features/cart/cartSlice";

function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  const currenCart = useSelector(getCurrentCartById(pizzaId));

  if (!quantity) {
    quantity = currenCart?.quantity;
  }
  function handelIncrease() {
    dispatch(increaseCartQuanitity(pizzaId));
  }
  function handelDecrease() {
    dispatch(decreaseCartQuanitity(pizzaId));
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <Button type="small" onClick={handelDecrease}>
        -
      </Button>
      <p>{quantity}</p>
      <Button type="small" onClick={handelIncrease}>
        +
      </Button>
    </div>
  );
}
export default UpdateItemQuantity;
