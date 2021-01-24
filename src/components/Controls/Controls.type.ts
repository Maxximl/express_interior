import { CameraPosition } from "../World/World.types";

export interface IControlsProps {
    onPathToTextureChanged: (path: string) => void;
    handleOnToolSelected: (mode: string) => void;
    onCameraPositionChanged: (position: CameraPosition) => void;
}