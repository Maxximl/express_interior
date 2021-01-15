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
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { AppDispatch } from "../../store";
import { RootState } from "../../rootReducer";
import { IElement } from "../../reducers/elements/elements.types";
import { Loader } from "../Loader/Loader";
import {
  deleteElement,
  setPosition,
  setScale,
  setSelectedId,
} from "../../reducers/elements/elements.thunk";
import { Vector3 } from "three";

export const World: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [pathToTexture, setPathToTexture] = useState<string>("");
  const orbit = useRef<OrbitControls>();
  const transform = useRef<TransformControls>();
  const [mode, setMode] = useState<string>("translate");
  const { elements, selectedId } = useSelector((state: RootState) => {
    return {
      elements: Object.values(state.elements.elements),
      selectedId: state.elements.selectedId,
    };
  });

  useEffect(() => {
    const onDelKeyPress = (event: any) => {
      debugger;
      if (event.key === "Delete") {
        if (selectedId) {
          dispatch(deleteElement(selectedId));
        }
      }
    };
    document.addEventListener("keydown", onDelKeyPress);
    return () => document.removeEventListener("keydown", onDelKeyPress);
  }, [selectedId]);

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
        const {
          x: posX,
          y: posY,
          z: posZ,
        } = event.target?.children[1]?.object.position;
        const {
          x: scaleX,
          y: scaleY,
          z: scaleZ,
        } = event.target?.children[1]?.object.scale;
        const { elementId } = event.target?.children[0]?.object?.children[0];

        dispatch(setPosition(elementId, { x: posX, y: posY, z: posZ }));

        dispatch(setScale(elementId, { x: scaleX, y: scaleY, z: scaleZ }));
      };
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  const setSelected = (id: string) => (event: any): void => {
    event.stopPropagation();
    debugger;
    if (id !== selectedId) {
      dispatch(setSelectedId(id));
    }
  };

  const renderElements = (elems: IElement[]) => {
    debugger;
    return elems.map((element) => {
      const selected = selectedId === element.id;
      const { x: posX, y: posY, z: posZ } = element.position;
      const { x: scaleX, y: scaleY, z: scaleZ } = element.scale;

      return selected ? (
        <Suspense fallback={<Loader />} key={element.id}>
          <TransformControls
            mode={mode}
            ref={transform}
            position={[posX, posY, posZ]}
            scale={[scaleX, scaleY, scaleZ]}
            onClick={setSelected(element.id)}
          >
            <Sprite
              path={element.path}
              elementId={element.id}
              // onClick={setSelected(element.id)}
            />
          </TransformControls>
          <OrbitControls ref={orbit} />
        </Suspense>
      ) : (
        <Suspense fallback={<Loader />} key={element.id}>
          <Sprite
            path={element.path}
            elementId={element.id}
            onClick={setSelected(element.id)}
            position={[posX, posY, posZ]}
            scale={[scaleX, scaleY, scaleZ]}
          />
          <OrbitControls ref={orbit} />
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
        <spotLight intensity={0.1} position={[150, 300, 100]} />
        <Provider store={store}>
          <Room pathToTexture={pathToTexture} />
        </Provider>
        {renderElements(allElements)}
      </Canvas>
      <Controls
        onPathToTextureChanged={handleOnPathToTextureChanged}
        handleOnToolSelected={handleOnToolSelected}
      />
    </div>
  );
};
