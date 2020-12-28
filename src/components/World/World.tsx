import React, { useState } from "react";
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Model } from "../Model/Model";
import styles from "./World.css";
import { OrbitControls } from "drei";
import { Wall } from "../Wall/Wall";
import { Room } from "../Room/Room";
import { Controls } from "../Controls";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  );
}

export const World: React.FC = () => {
  const [pathToTexture, setPathToTexture] = useState<string>("");
  const handleOnPathToTextureChanged = (path: string) => {
    debugger;
    setPathToTexture(path);
  };

  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[100, 300, 100]} />
        <Room pathToTexture={pathToTexture} />
        {/* <Suspense fallback={<Box />}>
          <Model url="assets/scene.glb" />
        </Suspense> */}
        <OrbitControls />
      </Canvas>
      <Controls onPathToTextureChanged={handleOnPathToTextureChanged} />
    </div>
  );
};
