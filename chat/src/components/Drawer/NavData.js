import { ReactComponent as Performance } from "../../assets/drawer/Performance.svg";
import { ReactComponent as Home } from "../../assets/drawer/Home.svg";
import { ReactComponent as Rtm } from "../../assets/drawer/RTM.svg";
import { ReactComponent as SmartAssign } from "../../assets/drawer/Smart_assign.svg";
import { ReactComponent as Whatsapp } from "../../assets/drawer/whatsapp.svg";
const nav_data = [
  {
    path: "/home",
    title: "Home",
    icon: <Home />,
    activeicon: <Home />,
    children: [],
  },

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
    icon: <Whatsapp />,
    activeicon: <Whatsapp />,
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
];

export { nav_data };
