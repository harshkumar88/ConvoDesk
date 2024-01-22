import { ReactComponent as Home } from "../../assets/drawer/icon/Home.svg";
import { ReactComponent as Admin } from "../../assets/drawer/icon/admin.svg";
import { ReactComponent as Logout } from "../../assets/drawer/icon/Logout.svg";

const nav_data = [
  {
    path: "/home",
    title: "Home",
    icon: <Home />,
    activeicon: <Home />,
    children: [],
  },
  {
    path: "/automation/dashboard",
    title: "Automations",
    icon: <Admin />,
    activeicon: <Admin />,
    children: [],
  },
  {
    path: "/admin",
    title: "Admin",
    icon: <Admin />,
    activeicon: <Admin />,
    children: [],
  },

  {
    path: "/logout",
    title: "Logout",
    icon: <Logout />,
    activeicon: <Logout />,
    children: [],
  },
];

export { nav_data };
