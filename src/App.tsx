import React from "react";
import { Canvas } from "./components/Canvas/Canvas";
import { ControlPanel } from "./components/MaterialPicker/MaterialPicker";
import styles from "./App.css";
// import { Controls, Line } from "./components/World/World";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
// import { Canvas } from "react-three-fiber";
import { Room } from "./components/Room/Room";
import { MapControls } from "drei";
import { World } from "./components/World/World";
import { useDispatch } from "react-redux";

export default function App() {
  return (
    <div className={styles.contentContainer}>
      <World />
      {/* <Canvas /> */}
      {/* <ControlPanel /> */}
    </div>
  );
}
