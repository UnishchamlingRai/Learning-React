import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="pt-2 text-xl font-bold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
