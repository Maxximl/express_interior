import { Html, useProgress } from "drei";
import React from "react";

export const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};
