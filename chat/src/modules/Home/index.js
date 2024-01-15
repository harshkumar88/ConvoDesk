import { useEffect, useState, useRef, useContext, createContext } from "react";
import styles from "./css/style.module.css";
import Header from "../../components/Header/Header";
import Test from "./components/Test";
import { get_data, post_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import { AppContext } from "../../App";
import { get_agent_id } from "../../ReactLib/auth";
import { Outlet } from "react-router-dom";

const ChatContext = createContext();

function Home() {
  const appContext = useContext(AppContext);
  const arr = [
    {
      name: "Overall pending conversations",
      value: 1,
      filter: [
        { type: "key", key: "status", value: "O" },
        { type: "key", key: "stage", value: 2 },
        { type: "in", key: "agent_id", value: [0] },
      ],
    },
    {
      name: "All open assigned conversations",
      value: 2,
      filter: [
        { type: "key", key: "status", value: "O" },
        { type: "key", key: "stage", value: 2 },
        { type: "gt", key: "agent_id", value: [0] },
      ],
    },
    {
      name: "My open conversations",
      value: 3,
      filter: [
        { type: "key", key: "status", value: "O" },
        { type: "key", key: "stage", value: 2 },
        { type: "in", key: "agent_id", value: [get_agent_id()] },
      ],
    },
    {
      name: "All resolved conversations",
      value: 4,
      filter: [{ type: "key", key: "status", value: "R" }],
    },
    {
      name: "Bot conversations",
      value: 5,
      filter: [
        { type: "key", key: "status", value: "O" },
        { type: "key", key: "stage", value: 1 },
      ],
    },
  ];
  let [current, setCurrent] = useState(arr[0]);
  let [msgServer, setMsgServer] = useState({});
  let [chats, setChats] = useState([]);
  let [data, setData] = useState({});
  let [hey, setHey] = useState(false);
  let [hello, setHello] = useState(false);
  let [reload, setReload] = useState(true);
  let [filteredChat, setFilteredChat] = useState([]);
  let [sidebar, setSidebar] = useState(false);
  let [trigger, setTrigger] = useState(true);
  let [next, setNext] = useState(true);
  let [page, setPage] = useState(1);
  let [filters, setFilters] = useState({});
  let [conversationDetails, setConversationDetails] = useState({});
  const [active, setActive] = useState("details");
  let [socketTrigger, setSocketTrigger] = useState(true);
  let [metrics, setMetrics] = useState([]);
  let [count, setCount] = useState(0);
  let [checkedIds, setCheckedIds] = useState([]);
  let [name, setName] = useState([]);
  const ws = useRef(null);
  function shouldAddWSMsg(dataFromServer) {
    // console.log("shoudl add", dataFromServer);
    if (current["value"] == 1) {
      return (
        dataFromServer["stage"] == 2 &&
        dataFromServer["status"] == "O" &&
        dataFromServer["agent_id"] == 0
      );
      //All open and unassigned conversations
      // return dataFromServer["agent_id"] == 0;
    } else if (current["value"] == 2) {
      return (
        dataFromServer["stage"] == 2 &&
        dataFromServer["status"] == "O" &&
        dataFromServer["agent_id"] > 0
      );
      //All open and unassigned conversations
      // return dataFromServer["agent_id"] == 0;
    } else if (current["value"] == 3) {
      //agent id from local storage
      return (
        dataFromServer["agent_id"] == get_agent_id() &&
        dataFromServer["stage"] == 2 &&
        dataFromServer["status"] == "O"
      );
    } else if (current["value"] == 4) {
      return false;
    } else if (current["value"] == 5) {
      // return true;
      return dataFromServer["stage"] == 1 && dataFromServer["status"] == "O";
    } else if (current["value"] == 6) {
      return (
        dataFromServer["stage"] == 2 &&
        dataFromServer["status"] == "O" &&
        dataFromServer["agent_id"] == current["agent_id"]
      );
    }
    return false;
  }
  useEffect(
    function () {
      if (typeof filters === "object" && Object.keys(filters).length > 0) {
        getMetrics();
      }
    },
    [sidebar, filters]
  );
  useEffect(
    function () {
      // console.log("before unique case", chats);
      let temp = chats.sort(function (a, b) {
        return b.epoch - a.epoch;
      });
      // console.log("after epoch sorting", temp);
      let s = new Set();
      let ans = [];
      let temp2 = temp.map(function (item, idx) {
        if (!s.has(item.id)) {
          ans.push(item);
          s.add(item.id);
        }
      });
      // console.log("after unique sorting", ans);

      // console.log(ans);
      temp2 = ans.sort(function (a, b) {
        return b.id - a.id;
      });
      // console.log("after conversation id  sorting", ans);

      // let unique = chats
      //   .filter(
      //     (v, i, a) => a.map((e) => String(e.id)).indexOf(String(v.id)) == i
      //   )
      //   .sort(function (a, b) {
      //     return a.id <= b.id;
      //   });
      // console.log("unique case", unique);
      setFilteredChat(temp2);
    },
    [hey]
  );
  function modifyAssignCase(msgServer, temp) {
    // console.log("assign case");
    if (current["value"] == 1) {
      // console.log("pedning case");
      let isFound = false;
      temp.map(function (element, idx) {
        if (temp.id == msgServer["conversation_id"]) {
          isFound = true;
        }
      });
      // console.log("temp", temp, isFound);
      if (!isFound) {
        // console.log("appending pending casse");
        setChats((prevState) => [...prevState, msgServer]);
      }
    } else if (current["value"] == 2) {
      let isFound = false;
      temp.map(function (element, idx) {
        if (temp.id == msgServer["conversation_id"]) {
          isFound = true;
        }
      });
      if (!isFound) {
        setChats((prevState) => [...prevState, msgServer]);
      }
    } else if (current["value"] == 3) {
      if (msgServer["agent_id"] == get_agent_id()) {
        let isFound = false;
        temp.map(function (element, idx) {
          if (temp.id == msgServer["conversation_id"]) {
            isFound = true;
          }
        });
        if (!isFound) {
          setChats((prevState) => [...prevState, msgServer]);
        }
      }
    } else if (current["value"] == 5) {
      temp = temp.filter(function (item, idx) {
        return item.id != msgServer["conversation_id"];
      });
      setChats(temp);
    } else if (current["value"] == 6) {
      if (msgServer["agent_id"] == current["agent_id"]) {
        let isFound = false;
        temp.map(function (element, idx) {
          if (temp.id == msgServer["conversation_id"]) {
            isFound = true;
          }
        });
        if (!isFound) {
          setChats((prevState) => [...prevState, msgServer]);
        }
      }
    }
  }
  useEffect(
    function () {
      // console.log("msg recueved", msgServer);
      let temp = chats;
      msgServer["epoch"] = Date.now();
      if (!msgServer["id"]) {
        msgServer["id"] = msgServer["conversation_id"];
      }
      if (msgServer?.chat_type == "resolve") {
        // console.log("resolve case", chats, msgServer);
        if (current["value"] != 4) {
          temp = temp
            .filter(function (item, idx) {
              return item.conversation_id != msgServer["conversation_id"];
            })
            .filter(function (item, idx) {
              return item.id != msgServer["conversation_id"];
            });
        }
        // console.log("after filter", temp);
        setChats(temp);
      } else if (msgServer?.chat_type == "assign") {
        modifyAssignCase(msgServer, temp);
      } else if (shouldAddWSMsg(msgServer)) {
        temp.map(function (item, idx) {
          if (item.phone == msgServer["phone"]) {
            msgServer["name"] = item.name;
            item.is_due = false;
          }
        });
        setChats((prevState) => [...prevState, msgServer]);
      }
      setHey(Math.round(Math.random() * 1100000));
    },
    [hello]
  );

  useEffect(
    function () {
      get_chats(true);
      // console.log("chats debug", chats);
      if (ws && ws.current) {
        return;
      }

      ws.current = new WebSocket("wss://ws.crofarm.com/agent?agent_id=0");
      ws.current.onopen = () => {
        // console.log("WebSocket Client Connected");
      };
      ws.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        dataFromServer["latest_msg"] = dataFromServer["message"];
        dataFromServer["id"] = dataFromServer["conversation_id"];

        // console.log("onmessage", chats);
        setMsgServer(dataFromServer);
        setHello(Math.round(Math.random() * 1100000));
        // if (shouldAddWSMsg(dataFromServer)) {
        //   setChats((prevState) => [...prevState, dataFromServer]);
        //   setHey(Math.round(Math.random() * 1100000));
        // }
      };
    },
    [trigger]
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setSocketTrigger(!socketTrigger);
    }, 30000);

    return () => clearInterval(interval);
  }, [socketTrigger]);

  useEffect(
    function () {
      if (ws && ws.current) {
        ws.current.close();
      }

      ws.current = new WebSocket("wss://ws.crofarm.com/agent?agent_id=0");
      ws.current.onopen = () => {
        // console.log("WebSocket Client Connected");
      };
      ws.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        dataFromServer["latest_msg"] = dataFromServer["message"];
        dataFromServer["id"] = dataFromServer["conversation_id"];

        // console.log("onmessage", chats);
        setMsgServer(dataFromServer);
        setHello(Math.round(Math.random() * 1100000));
      };
    },
    [socketTrigger]
  );

  function get_chats(is_new = false) {
    post_data(
      `${API_URL}/hook/agent/conversation/v1/`,
      { filters: current["filter"], page: page },
      appContext
    ).then(function (data) {
      setCount(data.count);
      if (is_new) {
        setChats(
          data.data.map(function (item, idx) {
            item["epoch"] = Date.now() - item["seconds_elapsed"] * 1000; //converted to milliseconds
            return item;
          })
        );
        setFilteredChat(data.data);
      } else {
        setChats(chats.concat(data.data));
        setFilteredChat(chats.concat(data.data));
      }
      setNext(data.has_next);
      setPage(data.page);
    });
    // get_data(`${API_URL}/hook/agent/conversation/v1/?agent_id=0`).then(
    //   function (data) {
    //     setChats(data.data);
    //     setFilteredChat(data.data);
    //   }
    // );
  }

  function format_data(msg) {
    let data = "";
    try {
      data = JSON.parse(msg);
    } catch (e) {
      data = msg;
    }
    return { data: data, is_object: typeof data == "object" };
  }

  function get_modified_data(obj) {
    let modified_data = { first_line: "", second_line: "" };
    if (obj?.data?.header) {
      modified_data["first_line"] = obj?.data?.header?.text;
    } else if (obj?.data?.body) {
      modified_data["first_line"] = obj?.data?.body?.text;
    } else {
      modified_data["first_line"] = "-";
    }

    if (obj?.data?.type === "button") {
      modified_data["second_line"] = "Buttons were sent";
    } else if (obj?.data?.type === "list") {
      modified_data["second_line"] = "List was sent";
    } else if (obj?.data?.type === "carousel") {
      modified_data["second_line"] = "Carousel was sent";
    } else {
      modified_data["second_line"] = "-";
    }
    return modified_data;
  }
  function getMetrics() {
    get_data(`${API_URL}/neon/conversation/metrics/v1/`, appContext).then(
      function (data) {
        if (data) {
          let agentCtDict = data?.data?.agent_dict;
          let ct_dict = data?.data?.ct_dict;

          let allAgents = filters?.agent?.choices
            .map(function (item, idx) {
              let agent_id = item.value;
              if (agent_id == get_agent_id()) {
                ct_dict["3"] = agentCtDict[agent_id];
              }
              if (agentCtDict[agent_id]) {
                item["chat_ct"] = agentCtDict[agent_id];
              } else {
                item["chat_ct"] = 0;
              }
              return item;
            })
            .filter(function (item, idx) {
              return item["chat_ct"] > 0;
            });
          setMetrics({ ct_dict: ct_dict, agents: allAgents });
        }
      }
    );
  }
  function reloadHandler() {
    setReload(!reload);
  }

  function toggleTrigger() {
    setPage(1);
    setTrigger(!trigger);
  }
  useEffect(
    function () {
      setFilters(appContext.filters);
    },
    [appContext.filters]
  );

  let value = {
    toggleTrigger,
    filters,
    conversationDetails,
    setConversationDetails,
    active,
    setActive,
    checkedIds,
    setCheckedIds,
    name,
    setName,
  };
  return (
    <div className={styles.container}>
      <ChatContext.Provider value={value}>
        <Header />
        <div className={styles.app}>
          <div className={styles.sidebar} id="scrollableDiv">
            <Test
              handler={get_chats}
              setPage={setPage}
              next={next}
              filteredChat={filteredChat}
              format_data={format_data}
              get_modified_data={get_modified_data}
              setData={setData}
              sidebar={sidebar}
              setSidebar={setSidebar}
              trigger={trigger}
              setTrigger={setTrigger}
              reloadHandler={reloadHandler}
              current={current}
              setCurrent={setCurrent}
              arr={arr}
              count={count}
              metrics={metrics}
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
              name={name}
              setName={setName}
            />
          </div>
          <Outlet />
        </div>
      </ChatContext.Provider>
    </div>
  );
}

export default Home;
export { ChatContext };
