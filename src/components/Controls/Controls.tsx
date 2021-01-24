import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { IControlsProps } from "./Controls.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  addElement,
  setSelectedId,
} from "../../reducers/elements/elements.thunk";
import { Vector3 } from "three";
import { setMaterial } from "../../reducers/room";
import { RootState } from "../../rootReducer";
import { CameraPosition } from "../World/World.types";

export const Controls: React.FC<IControlsProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    onPathToTextureChanged,
    handleOnToolSelected,
    onCameraPositionChanged,
  } = props;
  const [pathToTexture, setPathToTexture] = useState<string>("");
  const { selectedId } = useSelector((state: RootState) => {
    return {
      selectedId: state.elements.selectedId,
    };
  });
  useEffect(() => {
    onPathToTextureChanged(pathToTexture);
  }, [pathToTexture]);

  const handleOnClick = (path: string) => {
    dispatch(setMaterial(selectedId, path));
  };

  // useEffect(() => {
  //   const loadImage = async () => {
  //     const headers: HeadersInit = {};
  //     let body1 = {
  //       url:
  //         "https://hoff.ru/upload/iblock/ef3/ef3527588fb3ac57ca4a48bd70cb2bef.jpg",
  //     };
  //     const body2 = JSON.stringify(body1);
  //     headers["Content-Type"] = "application/json";
  //     const response = await fetch("/download", {
  //       method: "GET",
  //       body: body2,
  //       headers,
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //   loadImage();
  // }, []);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/white_wall.jpg")}
      >
        Бетон
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/wood.jpg")}
      >
        Дерево
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/old_wood.jpg")}
      >
        Старое дерево
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/brown_wood.jpg")}
      >
        Коричневое дерево
      </Button>{" "}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/linoleum.jpg")}
      >
        Линолеум
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/keramo.jpg")}
      >
        Плитка
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/keramo2.jpg")}
      >
        Плитка-2
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/grey.jpeg")}
      >
        Ткань
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/paper.jpg")}
      >
        Обои
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/kirpich.jpg")}
      >
        Кирпич
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/grass.jpg")}
      >
        Трава
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick("assets/floor.jpg")}
      >
        Ламинат
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setPathToTexture("")}
      >
        Удалить материал
      </Button>
      {/*///////*/}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnToolSelected("scale")}
      >
        Размер
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnToolSelected("translate")}
      >
        Положение
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnToolSelected("rotate")}
      >
        Вращение
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(
            addElement(
              "Bed",
              "assets/bed.png",
              null,
              { x: 0, y: 0, z: 0 },
              { x: 1, y: 1, z: 1 }
            )
          );
          dispatch(setSelectedId(""));
        }}
      >
        Добавить кровать
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(
            addElement(
              "Any",
              null,
              "https://hoff.ru/upload/iblock/ef3/ef3527588fb3ac57ca4a48bd70cb2bef.jpg",
              { x: 0, y: 0, z: 0 },
              { x: 1, y: 1, z: 1 }
            )
          );
          dispatch(setSelectedId(""));
        }}
      >
        Добавить свой предмет
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(
            addElement(
              "Comod",
              "assets/comod.png",
              null,
              { x: 0, y: 0, z: 0 },
              { x: 1, y: 1, z: 1 }
            )
          );
          dispatch(setSelectedId(""));
        }}
      >
        Добавить комод
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onCameraPositionChanged(CameraPosition.RIGHT)}
      >
        Вид справа
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onCameraPositionChanged(CameraPosition.LEFT)}
      >
        Вид слева
      </Button>
    </div>
  );
};