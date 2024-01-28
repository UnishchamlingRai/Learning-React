import { Outlet, useNavigation } from "react-router-dom/dist";
import CartOverview from "../features/Cart/CartOverview";
import Header from "./Header";
import Loading from "./Loading";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // console.log(navigation);
  return (
    <div className="appLayout">
      {isLoading && <Loading />}
      <Header />
      <main>
        <h1>Main Content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
