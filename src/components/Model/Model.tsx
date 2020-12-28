import * as THREE from "three";
import React, { useEffect, useMemo, useState } from "react";
import { IThingProps as IModelProps } from "./Model.types";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { useGLTF } from "drei";
import { Mesh } from "three";

export const Model: React.FC<IModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  const [children, setChildren] = useState<Mesh[]>([]);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (hovered === child.name) {
            child.material.color.set("red");
          } else {
            child.material.color.set("gainsboro");
          }
        }
      });
    }
  }, [hovered]);

  return (
    <primitive
      object={scene}
      position={[-1.1, -0.5, 0]}
      onClick={(e: any) => setHovered(e.object.name)}
      rotation={[0, 0, 0]}
    />
  );
};
