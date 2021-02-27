import React, { useEffect, useRef, useState } from "react";
import styles from "./Canvas.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { Color, Mesh } from "three";
import { Button } from "@material-ui/core";
export const Canvas = () => {
  const container = useRef<HTMLDivElement>(null);
  const controls = useRef(null);

  useEffect(() => {
    let width = container.current.clientWidth;
    let height = container.current.clientHeight;
    const canvas = container.current;
    let model: THREE.Group;
    let selectedItem = "";
    const initialMtrl = new THREE.Texture();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("skyblue");

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(1.1, 0.5, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // const orbitControls = new OrbitControls(camera, renderer.domElement);

    const selectObject = (name: string) => {
      selectedItem = name;
      model.traverse((child) => {
        if (child instanceof Mesh) {
          const prevMaterial = child.material;
          if (selectedItem === child.name) {
            const mtrl = new THREE.MeshBasicMaterial({
              color: new Color("red"),
            });
            child.material = mtrl;
          } else {
            child.material = prevMaterial;
          }
          render();
        }
      });
    };

    const onMouseDown = (event: MouseEvent) => {
      mouse.x = (event.offsetX / canvas.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / canvas.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      let intersects = raycaster.intersectObjects(model.children);

      if (intersects[0]) {
        selectObject(intersects[0].object.name);
      }

      render();
    };

    const render = () => {
      // orbitControls.update();
      renderer.render(scene, camera);
      // requestAnimationFrame(render);
    };

    canvas.appendChild(renderer.domElement);

    const modelLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    const loadModel = (path: string) => {
      modelLoader.load(
        path,
        (gltf) => {
          model = gltf.scene;
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
            }
          });
          scene.add(model);
          render();
        },
        null,
        (error) => {
          console.error(error);
        }
      );
    };

    const loadTexture = (path: string): THREE.Texture => {
      return textureLoader.load(
        path,
        (loadedTexture) => {
          model.traverse((child) => {
            if (child instanceof Mesh && child.name === selectedItem) {
              setMaterial(loadedTexture, child);
            }
          });
        },
        null,
        (error) => {
          console.error(error);
        }
      );
    };

    const setMaterial = (texture: THREE.Texture, object: THREE.Mesh) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      object.material = material;
      render();
    };

    const clearMaterial = () => {
      model.traverse((child) => {
        if (child instanceof Mesh && child.name === selectedItem) {
          setMaterial(initialMtrl, child);
        }
      });
    };

    controls.current = {
      loadModel,
      loadTexture,
      onMouseMove: onMouseDown,
      clearMaterial,
    };
    // window.addEventListener("mousemove", onMouseMove, false);
    loadModel("assets/scene.glb");
    canvas.addEventListener("mousedown", onMouseDown, false);
    render();
  }, []);

  const handleOnClick = () => {
    const { loadModel } = controls.current;
    loadModel("assets/scene.glb");
  };

  const handleOnMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { onMouseMove } = controls.current;
    onMouseMove(event);
  };

  return (
    <div>
      <div
        className={styles.canvasContainer}
        ref={container}
        // onClick={handleOnClick}
        // onMouseMove={handleOnMouseMove}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => controls.current.loadTexture("assets/white_wall.jpg")}
      >
        Бетон
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => controls.current.loadTexture("assets/white_wood.jpg")}
      >
        Дерево
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => controls.current.loadTexture("assets/brown_wood.jpg")}
      >
        Коричневое дерево
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => controls.current.loadTexture("assets/grey.jpeg")}
      >
        Ткань
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => controls.current.loadTexture("assets/kirpich.jpg")}
      >
        Кирпич
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => controls.current.clearMaterial()}
      >
        Удалить материал
      </Button>
    </div>
  );
};
