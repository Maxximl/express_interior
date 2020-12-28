import React, { useEffect, useState } from "react";
import { Wall } from "../Wall";
import { IRoomProps } from "./Room.types";

export const Room: React.FC<IRoomProps> = (props) => {
  const { pathToTexture } = props;
  const [selectedName, setSelectedName] = useState<string>("");

  const handleOnClick = (e: any) => {
    setSelectedName(e.object.name);
  };

  return (
    <group>
      <Wall
        width={2}
        height={1}
        outerColor={"gainsboro"}
        name={"BackWall"}
        selectedName={selectedName}
        onClick={handleOnClick}
        pathToMaterial={pathToTexture}
      />
      <Wall
        rotation={[0, 4.71239, 0]}
        position={[1, 0, 1]}
        width={2}
        height={1}
        outerColor={"gainsboro"}
        name={"RightWall"}
        onClick={handleOnClick}
        selectedName={selectedName}
        pathToMaterial={pathToTexture}
      />
      <Wall
        rotation={[0, 1.5708, 0]}
        position={[-1, 0, 1]}
        width={2}
        height={1}
        outerColor={"gainsboro"}
        name={"LeftWall"}
        onClick={handleOnClick}
        selectedName={selectedName}
        pathToMaterial={pathToTexture}
      />
      <Wall
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0.5]}
        width={2}
        height={3}
        outerColor={"gainsboro"}
        name={"Floor"}
        onClick={handleOnClick}
        selectedName={selectedName}
        pathToMaterial={pathToTexture}
      />
    </group>
  );
};
