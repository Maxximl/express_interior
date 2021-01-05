import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas, CanvasContext } from "react-three-fiber";
import { Model } from "../Model/Model";
import styles from "./World.css";
import {
  Html,
  MapControls,
  OrbitControls,
  Stars,
  TransformControls,
  useProgress,
} from "drei";
import { Wall } from "../Wall/Wall";
import { Room } from "../Room/Room";
import { Controls } from "../Controls";
import { Sprite } from "../Sprite/Sprite";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../rootReducer";
import { IElement } from "../../reducers/elements.types";
import { Loader } from "../Loader/Loader";
import { setPosition, setSelectedId } from "../../reducers/elements.thunk";
import { Vector3 } from "three";

export const World: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [pathToTexture, setPathToTexture] = useState<string>("");
  const orbit = useRef<OrbitControls>();
  const transform = useRef<TransformControls>();
  const [mode, setMode] = useState<string>(null);
  const { elements, selectedId } = useSelector((state: RootState) => {
    return {
      elements: Object.values(state.elements.elements),
      selectedId: state.elements.selectedId,
    };
  });

  const [allElements, setAllElements] = useState<IElement[]>(elements);
  useEffect(() => {
    setAllElements(elements);
  }, [JSON.stringify(elements)]);

  const handleOnPathToTextureChanged = (path: string) => {
    setPathToTexture(path);
  };

  const handleOnToolSelected = (mode: string) => {
    setMode(mode);
  };

  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      controls.setMode(mode);
      const callback = (event: any) => {
        // orbit.current.enabled = !event.value;
        const { x, y, z } = event.target?.children[1]?.object.position;

        dispatch(
          setPosition(
            event.target?.children[0]?.object?.children[0]?.elementId,
            { x: x, y: y, z: z }
          )
        );
        console.log(event);
      };
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  const setSelected = (id: string) => (event: any): void => {
    event.stopPropagation();
    if (id !== selectedId) {
      dispatch(setSelectedId(id));
    }
  };

  const renderElements = (elems: IElement[]) => {
    debugger;
    return elems.map((element) => {
      const selected = selectedId === element.id;
      const { x, y, z } = element.position;
      console.log(element.id, element.position);

      return !!mode && selected ? (
        <Suspense fallback={null} key={element.id}>
          <TransformControls mode={mode} ref={transform} position={[x, y, z]}>
            <Sprite
              path={element.path}
              elementId={element.id}
              onClick={setSelected(element.id)}
              // position={[0.5, y, z]}
            />
          </TransformControls>
          {/* <OrbitControls ref={orbit} /> */}
        </Suspense>
      ) : (
        <Suspense fallback={null} key={element.id}>
          <Sprite
            path={element.path}
            elementId={element.id}
            onClick={setSelected(element.id)}
            position={[x, y, z]}
          />
          {/* <OrbitControls ref={orbit} /> */}
        </Suspense>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 2] }}
        onCreated={({ gl, scene }: CanvasContext) => {
          scene.background = new THREE.Color("black");
        }}
      >
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[100, 300, 100]} />
        <Room pathToTexture={pathToTexture} />
        {renderElements(allElements)}
      </Canvas>
      <Controls
        onPathToTextureChanged={handleOnPathToTextureChanged}
        handleOnToolSelected={handleOnToolSelected}
      />
    </div>
  );
};
