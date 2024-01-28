import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
    </div>
  );
}

export default Sidebar;
