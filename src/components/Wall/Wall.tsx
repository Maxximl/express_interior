import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { useGLTF, useTexture } from "drei";
import { Mesh, MeshStandardMaterial, Texture } from "three";
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
  //   const [texture, setTexture] = useState(null);
  const wall = useRef<THREE.Mesh>(null);

  const texture = useMemo(
    () => loadMaterial(pathToMaterial, selectedName === name),
    [pathToMaterial]
  );

  useEffect(() => {
    if (texture) {
      wall.current.material = new MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: texture,
      });
    }
  }, [texture]);

  //   useEffect(() => {
  //     if (texture) {
  //       wall.current.material = new MeshStandardMaterial({
  //         side: THREE.DoubleSide,
  //         color,
  //         // map: texture,
  //       });
  //     }
  //   }, [texture]);

  //   const color = selectedName === name ? "hotpink" : outerColor;
  return (
    <mesh
      {...props}
      ref={wall}
      material={
        new MeshStandardMaterial({
          side: THREE.DoubleSide,
          //   color,
        })
      }
    >
      <planeBufferGeometry args={[width, height]} />
    </mesh>
  );
};

export const loadMaterial = (pathToMaterial: string, selected: boolean) => {
  if (pathToMaterial && selected) {
    return new THREE.TextureLoader().load(pathToMaterial);
  }
  return null;
};
