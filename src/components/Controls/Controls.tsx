import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { IControlsProps } from "./Controls.type";

export const Controls: React.FC<IControlsProps> = (props) => {
  const { onPathToTextureChanged } = props;
  const [pathToTexture, setPathToTexture] = useState<string>("");

  useEffect(() => {
    onPathToTextureChanged(pathToTexture);
  }, [pathToTexture]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPathToTexture("assets/white_wall.jpg")}
      >
        Бетон
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPathToTexture("assets/white_wood.jpg")}
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
    </div>
  );
};
