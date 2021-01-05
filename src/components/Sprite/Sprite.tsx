import { MapControls, TransformControls, useTexture } from "drei";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLoader, useThree, Vector3 } from "react-three-fiber";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";
import { ImageLoader, RepeatWrapping, NearestFilter, Texture } from "three";
import { ISprite } from "./Sprite.types";

export const Sprite: React.FC<ISprite> = (props) => {
  const { path } = props;
  const texture = useTexture(path);

  const ref = useRef<ISprite>();
  useEffect(() => {
    if (ref.current) {
      ref.current;
    }
  });
  return (
    <sprite scale={[1, 1, 1]} {...props} ref={ref}>
      <spriteMaterial attach="material" map={texture as Texture} />
    </sprite>
  );
};

export function createTexture(image: any) {
  // Create the texture of the whole sprite sheet
  const texture = new Texture(image);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  texture.matrixAutoUpdate = false;
  texture.needsUpdate = true;

  return texture;
}
