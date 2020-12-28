import React from "react";
import { Canvas } from "./components/Canvas/Canvas";
import { ControlPanel } from "./components/MaterialPicker/MaterialPicker";
import styles from "./App.css";
import { World } from "./components/World/World";

export default function App() {
  return (
    <div className={styles.contentContainer}>
      <World />
      {/* <Canvas /> */}
      {/* <ControlPanel /> */}
    </div>
  );
}
