const options1 = [
  { value: "Delhi", label: "Delhi" },
  { value: "Gurgaon", label: "Gurgaon" },
  { value: "Banglore", label: "Banglore" },
];

const options2 = [
  { value: "Approved", label: "Approved" },
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" },
];
const customStyles = {
  control: (provided) => ({
    ...provided,
    background: "none",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: "#000", // Change the color to match your design
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%", // Set dropdown width to 100%,
    left: "4px",
    zIndex: 4,
  }),
};

const options = [
  { value: "live", label: "live" },
  { value: "static", label: "static" },
  { value: "Demo", label: "Demo" },
];

const chartData = {
  live: {
    data: [25, 10, 30, 20, 100],
    categories: ["5th July", "6th July", "7th July", "8th July", "9th July"],
    series: [25, 40, 60],
    labels: ["Satisfied", "Neutral", "Not satisfied"],
  },
  static: {
    data: [25, 10, 30, 20, 100],
    categories: ["5th July", "6th July", "7th July", "8th July", "9th July"],
    series: [25, 90, 60],
    labels: ["Satisfied", "Neutral", "Not satisfied"],
  },
  Demo: {
    data: [125, 10, 30, 120, 100],
    categories: ["5th July", "6th July", "7th July", "8th July", "9th July"],
    series: [25, 90, 10],
    labels: ["Satisfied", "Neutral", "Not satisfied"],
  },
};

const details = [
  {
    id: 43,
    apartment_name: "Woods Society",
    address: "Sector 63, Gurugram",
    description: "The Rosewood, sector 63",
    towers: "Tower A, Tower B, Tower C...",
    city: "delhi",
    status: "Approved",
  },
  {
    id: 8129,
    apartment_name: "Rosewood Society",
    address: "Sector 61, Gurugram",
    description: "The Rosewood, sector 63",
    towers: "Tower A, Tower B, Tower C...",
    city: "gurgaon",
    status: "Rejected",
  },
  {
    id: 431,
    apartment_name: "Rosewood Society",
    address: "Sector 60, Gurugram",
    description: "The Rosewood, sector 63",
    towers: "Tower A, Tower B, Tower C...",
    city: "gurgaon",
    status: "Approved",
  },
  {
    id: 44,
    apartment_name: "Rosewood Society",
    address: "Sector 60, Gurugram",
    description: "The Rosewood, sector 63",
    towers: "Tower A, Tower B, Tower C...",
    city: "delhi",
    status: "Approved",
  },
  {
    id: 45,
    apartment_name: "Rosewood Society",
    address: "Sector 60, Gurugram",
    description: "The Rosewood, sector 63",
    towers: "Tower A, Tower B, Tower C...",
    city: "gurgaon",
    status: "Pending",
  },
  {
    id: 46,
    apartment_name: "Rosewood Society",
    address: "Sector 60, Gurugram",
    description: "The Rosewood, sector 63",
    towers: "Tower A, Tower B, Tower C...",
    city: "delhi",
    status: "Approved",
  },
  {
    id: 47,
    apartment_name: "Rosewood Society",
    address: "Sector 60, Gurugram",
    description: "The Rosewood, sector 63",
    towers: "Tower A, Tower B, Tower C...",
    city: "delhi",
    status: "Pending",
  },
];

let list = [
  { type: "Total tickets", value: "25", check: 0 },
  { type: "Total tickets", value: "25", check: 1 },
  { type: "Total tickets", value: "25", check: 1 },
  { type: "Total tickets", value: "25", check: 0 },
  { type: "Total tickets", value: "25", check: 2 },
  { type: "Total tickets", value: "25", check: 1 },
  { type: "Total tickets", value: "25", check: 2 },
];

let ticket_list = [
  {
    issue_type: "Payment related",
    total_tickets: "96",
    tickets_within_sla: "17",
    calls: "25",
    calls_within_sla: "8",
    chats: "25",
    chats_within_sla: "25",
  },
  {
    issue_type: "Item related",
    total_tickets: "96",
    tickets_within_sla: "17",
    calls: "25",
    calls_within_sla: "8",
    chats: "25",
    chats_within_sla: "25",
  },
  {
    issue_type: "Delivery related",
    total_tickets: "96",
    tickets_within_sla: "17",
    calls: "25",
    calls_within_sla: "8",
    chats: "25",
    chats_within_sla: "25",
  },
  {
    issue_type: "Reward wallet related",
    total_tickets: "96",
    tickets_within_sla: "17",
    calls: "25",
    calls_within_sla: "8",
    chats: "25",
    chats_within_sla: "25",
  },
];

export {
  options1,
  options2,
  customStyles,
  details,
  chartData,
  options,
  list,
  ticket_list,
};
