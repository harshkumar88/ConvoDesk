import { ReactComponent as Home } from "../../assets/drawer/icon/Home.svg";
import { ReactComponent as SmartAssign } from "../../assets/drawer/icon/Smart-assign.svg";
import { ReactComponent as Articles } from "../../assets/drawer/icon/Articles.svg";
import { ReactComponent as Admin } from "../../assets/drawer/icon/admin.svg";
import { ReactComponent as RTM } from "../../assets/drawer/icon/RTM.svg";
const nav_data = [
  {
    path: "/home",
    title: "Home",
    icon: <Home />,
    activeicon: <Home />,
    children: [],
  },
  // {
  //   path: "/group",
  //   title: "Group",
  //   icon: <HiUserGroup />,
  //   activeicon: <HiUserGroup />,
  //   children: [],
  // },
  {
    path: "/rtm",
    title: "RTM",
    icon: <RTM />,
    activeicon: <RTM />,
    children: [],
  },
  // {
  //   path: "agent/dashboard",
  //   title: "Agent DashBoard",
  //   icon: <Agent />,
  //   activeicon: <Agent />,
  //   children: [],
  // },
  // {
  //   path: "agent/ticket/details",
  //   title: "Agent Ticket Details",
  //   icon: <IoMdAnalytics />,
  //   activeicon: <IoMdAnalytics />,
  //   children: [],
  // },
  // {
  //   path: "supervisor/dashboard",
  //   title: "Supervisor DashBoard",
  //   icon: <Supervisor />,
  //   activeicon: <Supervisor />,
  //   children: [],
  //   role: "Supervisor",
  // },
  // {
  //   path: "/risk/dashboard",
  //   title: "Risk DashBoard",
  //   icon: <Risk />,
  //   activeicon: <Risk />,
  //   children: [],
  //   role: "",
  // },
  // {
  //   path: "/automation/dashboard",
  //   title: "Automation DashBoard",
  //   icon: <BsFillChatLeftTextFill />,
  //   activeicon: <BsFillChatLeftTextFill />,
  //   children: [],
  //   role: "",
  // },
  // {
  //   path: "/ticket/dashboard",
  //   title: "Ticket DashBoard",
  //   icon: <BsFillChatLeftTextFill />,
  //   activeicon: <BsFillChatLeftTextFill />,
  //   children: [],
  //   role: "",
  // },

  {
    path: "/smart-assign",
    title: "Smart Assign",
    icon: <SmartAssign />,
    activeicon: <SmartAssign />,
    children: [],
  },
  // {
  //   path: "/canned/response",
  //   title: "Canned Response",
  //   icon: <BsFillChatLeftTextFill />,
  //   activeicon: <BsFillChatLeftTextFill />,
  //   children: [],
  // },
  // {
  //   path: "/ai/response",
  //   title: "AI Response",
  //   icon: <BsFillChatLeftTextFill />,
  //   activeicon: <BsFillChatLeftTextFill />,
  //   children: [],
  // },
  {
    path: "/articles",
    title: "Articles",
    icon: <Articles />,
    activeicon: <Articles />,
    children: [
      // {
      //   name: "create article",
      //   path: "/article/new",
      //   icon: <HiOutlineTicket />,
      // },
    ],
  },

  {
    path: "/admin",
    title: "Admin",
    icon: <Admin />,
    activeicon: <Admin />,
    children: [],
  },

  // {
  //   path: "/logout",
  //   title: "Logout",
  //   icon: <FiLogOut />,
  //   activeicon: <FiLogOut />,
  //   children: [],
  // },
];

export { nav_data };
