import React, { useState } from "react";
import styles from "./styles.module.scss";
import AddTemplate from "./AddTemplate";

function Header({ headerContext }) {
  const { loader } = headerContext;
  return (
    <div className={styles.header}>
      <h2>Whatsapp Templates</h2>
      {!loader ? <AddTemplate headerContext={headerContext} /> : <></>}
    </div>
  );
}

export default Header;
