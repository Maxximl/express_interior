import { MeshProps } from "react-three-fiber";

export interface IWallProps extends MeshProps {
    elementId: string;
    width: number;
    height: number;
    outerColor: string;
    selectedName?: string;
    pathToMaterial?: string;
}