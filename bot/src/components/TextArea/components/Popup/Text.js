import React from "react";

function Text({ data, setData }) {
  return (
    <div>
      <input
        type="text"
        value={data.key}
        onChange={function (e) {
          setData({ ...data, key: e.target.value });
        }}
      />
    </div>
  );
}

export default Text;
