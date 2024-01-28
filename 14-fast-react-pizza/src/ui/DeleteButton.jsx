import { useDispatch } from "react-redux";
import Button from "./Button";
import { deleteCart } from "../features/cart/cartSlice";

function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();
  function handelDelete() {
    dispatch(deleteCart(pizzaId));
  }
  return (
    <Button type="small" onClick={handelDelete}>
      Delete
    </Button>
  );
}

export default DeleteButton;
