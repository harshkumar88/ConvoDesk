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
  singleValue: (provided) => ({
    ...provided,
    color: "#12344d", // Set the color of the selected text to red
  }),
};

export { customStyles };
