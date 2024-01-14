import { HiOutlineHome, HiUserAdd } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { FaUserCog, FaUserFriends, FaStopwatch } from "react-icons/fa";
import { SiAndroidauto } from "react-icons/si";
const nav_data = [
  {
    path: "/home",
    title: "Home",
    icon: <HiOutlineHome />,
    activeicon: <HiOutlineHome />,
    children: [
      // {
      //   name: "xyz",
      //   path: "/xyz",
      //   icon: <HiOutlineTicket />,
      // },
    ],
  },

  {
    path: "/admin",
    title: "Admin",
    icon: <RiAdminFill />,
    activeicon: <RiAdminFill />,
    children: [
      // {
      //   name: "Smart Assign",
      //   path: "/smart-assign",
      //   icon: <HiUserAdd />,
      // },
      // {
      //   name: "Agents",
      //   path: "/agents",
      //   icon: <FaUserCog />,
      // },
      // {
      //   name: "Users",
      //   path: "/home",
      //   icon: <FaUserFriends />,
      // },
      // {
      //   name: "Business Hour",
      //   path: "/home",
      //   icon: <FaStopwatch />,
      // },
      // {
      //   name: "Automation",
      //   path: "/automation",
      //   icon: <SiAndroidauto />,
      // },
    ],
  },

  {
    path: "/logout",
    title: "Logout",
    icon: <FiLogOut />,
    activeicon: <FiLogOut />,
    children: [],
  },
];

export { nav_data };
