import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { IControlsProps } from "./Controls.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addElement } from "../../reducers/elements.thunk";
import { Vector3 } from "three";

export const Controls: React.FC<IControlsProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { onPathToTextureChanged, handleOnToolSelected } = props;
  const [pathToTexture, setPathToTexture] = useState<string>("");

  useEffect(() => {
    onPathToTextureChanged(pathToTexture);
  }, [pathToTexture]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setPathToTexture("assets/white_wall.jpg");
          dispatch(
            addElement("Max", "assets/white_wall.jpg", { x: 0, y: 0, z: 0 })
          );
        }}
      >
        Бетон
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setPathToTexture("assets/white_wood.jpg");
          dispatch(
            addElement("Max2", "assets/white_wood.jpg", { x: 0, y: 0, z: 0 })
          );
        }}
      >
        Дерево
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPathToTexture("assets/brown_wood.jpg")}
      >
        Коричневое дерево
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPathToTexture("assets/grey.jpeg")}
      >
        Ткань
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPathToTexture("assets/kirpich.jpg")}
      >
        Кирпич
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
    </div>
  );
};
