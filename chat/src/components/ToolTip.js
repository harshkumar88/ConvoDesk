import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "50px",
            // transform: "translateX(-50%)",
            background: "white",
            color: "black",
            padding: "0.5vh 0.5vw",
            borderRadius: "4px",
            top: "7px",
            left: "52px",
            fontSize: "1rem",
            fontWeight: "500",
            boxShadow: "0px 0px 10px 0px #5252526b",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
