import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedId } from "../../reducers/elements/elements.thunk";
import { Loader } from "../Loader/Loader";
import { Wall } from "../Wall";
import { IRoomProps } from "./Room.types";
import { createRoom, IWall } from "../../reducers/room";
import { RootState } from "../../rootReducer";
import { Euler, Vector3 } from "three";

export const Box: React.FC = () => {
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};
export const Room: React.FC<IRoomProps> = (props) => {
  const dispatch = useDispatch();
  const handleOnClick = (event: any) => {
    dispatch(setSelectedId(event.object.elementId));
  };

  useEffect(() => {
    dispatch(createRoom());
  }, []);

  const { walls } = useSelector((state: RootState) => {
    return {
      walls: Object.values(state.room.walls),
    };
  });

  const renderWalls = (walls: IWall[]) => {
    return walls.map((wall) => {
      const { x: posX, y: posY, z: posZ } = wall.position;
      const { x: rotX, y: rotY, z: rotZ } = wall.rotation;
      return (
        <Suspense fallback={<Loader />} key={wall.elementId}>
          <Wall
            elementId={wall.elementId}
            width={wall.width}
            height={wall.height}
            position={new Vector3(posX, posY, posZ)}
            rotation={new Euler(rotX, rotY, rotZ)}
            outerColor={"gainsboro"}
            onClick={handleOnClick}
            pathToMaterial={wall.pathToMaterial}
          />
        </Suspense>
      );
    });
  };
  return <group>{renderWalls(walls)}</group>;
};
