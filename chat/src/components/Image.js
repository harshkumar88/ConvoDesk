import Image from "react-image-enlarger";
import React, { useState } from "react";

function ImageContainer({ src, className }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Image
      style={{ width: "10vw", height: "auto" }}
      zoomed={zoomed}
      src={src}
      //   className={!zoomed ? className : ""}
      onClick={() => setZoomed(true)}
      onRequestClose={() => setZoomed(false)}
    />
  );
}

export default ImageContainer;
