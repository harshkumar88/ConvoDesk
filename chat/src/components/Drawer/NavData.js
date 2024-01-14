import { HiOutlineHome, HiUserAdd } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";
import { GoFileMedia } from "react-icons/go";
import { GrDocumentPerformance } from "react-icons/gr";
import { ReactComponent as Performance } from "../../assets/performance/trial.svg";
import { ReactComponent as Admin } from "../../assets/drawer/Admin.svg";
import { ReactComponent as Home } from "../../assets/drawer/Home.svg";
import { ReactComponent as Logout } from "../../assets/drawer/Logout.svg";
import { ReactComponent as Rtm } from "../../assets/drawer/Rtm.svg";
import { ReactComponent as SmartAssign } from "../../assets/drawer/SmartAssign.svg";

const nav_data = [
  {
    path: "/home",
    title: "Home",
    icon: <Home />,
    activeicon: <Home />,
    children: [
      // {
      //   name: "xyz",
      //   path: "/xyz",
      //   icon: <HiOutlineTicket />,
      // },
    ],
  },

  // {
  //   path: "/admin",
  //   title: "Admin",
  //   icon: <Admin />,
  //   activeicon: <Admin />,
  //   children: [
  //     // {
  //     //   name: "Automation",
  //     //   path: "/automation",
  //     //   icon: <SiAndroidauto />,
  //     // },
  //   ],
  // },
  {
    path: "/performance",
    title: "Performance",
    icon: <Performance />,
    activeicon: <Performance />,
    children: [],
    role: "Supervisor",
  },
  {
    path: "/whatsapp/templates",
    title: "WhatsappTemplates",
    icon: <GoFileMedia />,
    activeicon: <GoFileMedia />,
    children: [],
    role: "Whatsapp Template",
  },
  {
    path: "/rtm",
    title: "RTM",
    icon: <Rtm />,
    activeicon: <Rtm />,
    children: [],
    role: "Supervisor",
  },
  {
    path: "/smart-assign",
    title: "Smart Assign",
    icon: <SmartAssign />,
    activeicon: <SmartAssign />,
    children: [],
    role: "Supervisor",
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
