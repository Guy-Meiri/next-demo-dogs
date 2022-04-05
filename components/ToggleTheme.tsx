import React, { useState } from "react";
import styles from "./ToggleTheme.module.css";

export default function ToggleTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function onThemeChangedHandler() {
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);
    document.documentElement.setAttribute("theme", newIsDarkTheme ? "dark" : "light");
  }

  return (
    <div className={styles.container}>
      <input id="checkbox" className={styles.checkbox} onChange={onThemeChangedHandler} type="checkbox" />
      <label className={styles.label} htmlFor="checkbox"></label>
      <div className={styles.dot}></div>
    </div>
  );
}
