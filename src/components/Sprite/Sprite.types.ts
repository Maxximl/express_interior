import { SpriteProps } from "react-three-fiber";

export interface ISprite extends SpriteProps {
    elementId: string;
    path: string;
}