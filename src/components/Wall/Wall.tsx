import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
import { useGLTF, useTexture } from "drei";
import { Mesh, MeshStandardMaterial, Texture, Vector2 } from "three";
import { IWallProps } from "./Wall.types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../rootReducer";

export const Wall: React.FC<IWallProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { width, height, outerColor, elementId, pathToMaterial } = props;
  //   const [texture, setTexture] = useState(null);
  const wall = useRef<THREE.Mesh>(null);

  const { selectedId } = useSelector((state: RootState) => {
    return {
      selectedId: state.elements.selectedId,
    };
  });

  const color = selectedId === elementId ? "#EFF958" : outerColor;
  const texture = useMemo(() => loadMaterial(pathToMaterial), [pathToMaterial]);
  const [material, setMaterial] = useState(
    new MeshStandardMaterial({
      side: THREE.DoubleSide,
      color,
      opacity: 0.3,
      transparent: true,
    })
  );

  useEffect(() => {
    debugger;
    if (texture) {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      // texture.repeat = new Vector2(10, 10);
      setMaterial(
        new MeshStandardMaterial({
          side: THREE.DoubleSide,
          map: texture,
          color,
          opacity: 1,
        })
      );
    } else {
      setMaterial(
        new MeshStandardMaterial({
          side: THREE.DoubleSide,
          color,
          opacity: 1,
        })
      );
    }
  }, [texture, selectedId]);

  return (
    <mesh {...props} ref={wall} material={material}>
      <planeBufferGeometry args={[width, height]} />
    </mesh>
  );
};

export const loadMaterial = (pathToMaterial: string) => {
  if (pathToMaterial) {
    return new THREE.TextureLoader().load(pathToMaterial);
  }
  return null;
};
