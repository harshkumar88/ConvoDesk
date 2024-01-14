import { HiOutlineHome, HiUserGroup, HiUserAdd } from "react-icons/hi";

import { FiLogOut } from "react-icons/fi";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { SiAndroidauto } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import {
  FaUserCog,
  FaUserFriends,
  FaStopwatch,
  FaListAlt,
} from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { TbArticle } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";

const nav_data = [
  {
    path: "/home",
    title: "Home",
    icon: <HiOutlineHome />,
    activeicon: <HiOutlineHome />,
    children: [],
  },
  {
    path: "/group",
    title: "Group",
    icon: <HiUserGroup />,
    activeicon: <HiUserGroup />,
    children: [],
  },
  {
    path: "/rtm",
    title: "RTM",
    icon: <IoMdAnalytics />,
    activeicon: <IoMdAnalytics />,
    children: [],
  },
  {
    path: "agent/dashboard",
    title: "Agent DashBoard",
    icon: <RxDashboard />,
    activeicon: <RxDashboard />,
    children: [],
  },
  // {
  //   path: "agent/ticket/details",
  //   title: "Agent Ticket Details",
  //   icon: <IoMdAnalytics />,
  //   activeicon: <IoMdAnalytics />,
  //   children: [],
  // },
  {
    path: "supervisor/dashboard",
    title: "Supervisor DashBoard",
    icon: <RxDashboard />,
    activeicon: <RxDashboard />,
    children: [],
    role: "Supervisor",
  },
  {
    path: "/risk/dashboard",
    title: "Risk DashBoard",
    icon: <BsFillChatLeftTextFill />,
    activeicon: <BsFillChatLeftTextFill />,
    children: [],
    role: "",
  },
  {
    path: "/automation/dashboard",
    title: "Automation DashBoard",
    icon: <BsFillChatLeftTextFill />,
    activeicon: <BsFillChatLeftTextFill />,
    children: [],
    role: "",
  },
  {
    path: "/ticket/dashboard",
    title: "Ticket DashBoard",
    icon: <BsFillChatLeftTextFill />,
    activeicon: <BsFillChatLeftTextFill />,
    children: [],
    role: "",
  },

  {
    path: "/smart-assign",
    title: "Smart Assign",
    icon: <HiUserAdd />,
    activeicon: <HiUserAdd />,
    children: [],
  },
  {
    path: "/canned/response",
    title: "Canned Response",
    icon: <BsFillChatLeftTextFill />,
    activeicon: <BsFillChatLeftTextFill />,
    children: [],
  },
  {
    path: "/ai/response",
    title: "AI Response",
    icon: <BsFillChatLeftTextFill />,
    activeicon: <BsFillChatLeftTextFill />,
    children: [],
  },
  {
    path: "/articles",
    title: "Articles",
    icon: <TbArticle />,
    activeicon: <TbArticle />,
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
    icon: <RiAdminFill />,
    activeicon: <RiAdminFill />,
    children: [
      {
        name: "Agents",
        path: "/agents",
        icon: <FaUserCog />,
      },
      {
        name: "Users",
        path: "/users",
        icon: <FaUserFriends />,
      },
      {
        name: "Business Hour",
        path: "/business-hour",
        icon: <FaStopwatch />,
      },
      {
        name: "Automation",
        path: "/automation",
        icon: <SiAndroidauto />,
      },
      {
        name: "Disposition",
        path: "/disposition",
        icon: <FaListAlt />,
      },
      {
        name: "Agents Status",
        path: "/agents/status",
        icon: <FaListAlt />,
      },
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
