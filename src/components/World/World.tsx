import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas, CanvasContext, useFrame } from "react-three-fiber";
import { Model } from "../Model/Model";
import styles from "./World.css";
import { CameraPosition } from "./World.types";
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
  const [cameraPosition, setCameraPosition] = useState<Vector3>(
    () => new Vector3(0, 0, 1.5)
  );
  console.log(cameraPosition);

  const { elements, selectedId } = useSelector((state: RootState) => {
    return {
      elements: Object.values(state.elements.elements),
      selectedId: state.elements.selectedId,
    };
  });

  // useEffect(() => {
  //   async function getImg() {
  //     let blob = await fetch(
  //       "https://hoff.ru/upload/iblock/76d/76ded78dee98e125a75a640ea6060a3d.jpg"
  //     ).then((r) => r.blob());
  //     let dataUrl = await new Promise((resolve) => {
  //       let reader = new FileReader();
  //       reader.onload = () => resolve(reader.result);
  //       reader.readAsDataURL(blob);
  //     });
  //     // now do something with `dataUrl`
  //   }
  //   getImg();
  // }, []);

  useEffect(() => {
    const onDelKeyPress = (event: any) => {
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
    if (id !== selectedId) {
      dispatch(setSelectedId(id));
    }
  };

  const handleOnCameraPostionChanged = (position: CameraPosition) => {
    debugger;
    if (position === CameraPosition.LEFT) {
      setCameraPosition(new Vector3(-0.9, 0, 1.5));
    } else if (position === CameraPosition.RIGHT) {
      setCameraPosition(new Vector3(0.7, 0, 1.5));
    }
  };
  const Cam = (): any => {
    useFrame(({ camera }) => {
      const { x, y, z } = cameraPosition;
      camera.position.set(x, y, z);
    });
    return null;
  };

  const renderElements = (elems: IElement[]) => {
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
          {/* <OrbitControls ref={orbit} /> */}
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
          {/* <OrbitControls ref={orbit} /> */}
        </Suspense>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Canvas
        camera={{ position: cameraPosition }}
        onCreated={({ gl, scene }: CanvasContext) => {
          scene.background = new THREE.Color("black");
        }}
      >
        <Stars />
        {/* <Cam /> */}
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.1} position={[150, 300, 100]} />
        <Provider store={store}>
          <Room pathToTexture={pathToTexture} />
        </Provider>
        {renderElements(allElements)}
      </Canvas>
      <Controls
        onPathToTextureChanged={handleOnPathToTextureChanged}
        handleOnToolSelected={handleOnToolSelected}
        onCameraPositionChanged={handleOnCameraPostionChanged}
      />
    </div>
  );
};
