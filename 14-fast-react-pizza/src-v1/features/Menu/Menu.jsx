// import { useLoaderData } from "react-router-dom/dist";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { pizzaMenu } from "../../Utils/";
function Menu() {
  // const pizzaMenu = useLoaderData();
  const pizzaMenu = console.log(pizzaMenu);
  console.log("hello");

  return (
    <div>
      {pizzaMenu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

export async function loader() {
  const data = await getMenu();
  console.log("data:", data);
  return data;
}

export default Menu;
