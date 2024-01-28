import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./UI/Home";
import Menu, { loader as menuLoader } from "./features/Menu/Menu";
import Cart from "./features/Cart/Cart";
import Order, { loader as orderLoader } from "./features/Order/Order";
import CreateOrder, {
  action as actionCreateOrder,
} from "./features/Order/CreateOrder";
import AppLayout from "./UI/AppLayout";
import Error from "./UI/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: actionCreateOrder,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
