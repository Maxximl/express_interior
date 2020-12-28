import * as THREE from "three";
import React, { useEffect, useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { useGLTF } from "drei";
import { Mesh } from "three";
import { IWallProps } from "./Wall.types";

export const Wall: React.FC<IWallProps> = (props) => {
  const {
    width,
    height,
    outerColor,
    selectedName,
    name,
    pathToMaterial,
  } = props;
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    const texture = loadMaterial(pathToMaterial, selectedName === name);
    setTexture(texture);
  }, [pathToMaterial]);
  //   const texture = useMemo(
  //     () => loadMaterial(pathToMaterial, selectedName === name),
  //     [pathToMaterial]
  //   );
  console.log(texture);

  const color = selectedName === name ? "hotpink" : outerColor;
  return (
    <mesh {...props}>
      <planeBufferGeometry args={[width, height]} />

      {texture && (
        <meshStandardMaterial
          attach="material"
          transparent
          side={THREE.DoubleSide}
          color={color}
        >
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      )}
      {/* <meshStandardMaterial color={color} side={THREE.DoubleSide} /> */}
    </mesh>
  );
};

export const loadMaterial = (pathToMaterial: string, selected: boolean) => {
  if (pathToMaterial && selected) {
    return new THREE.TextureLoader().load(pathToMaterial);
  }
  return null;
};
