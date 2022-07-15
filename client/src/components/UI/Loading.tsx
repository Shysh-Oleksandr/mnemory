import React from "react";
import { MutatingDots } from "react-loader-spinner";

interface ILoadingProps {
  width?: number;
  height?: number;
}

const Loading = ({ width, height }: ILoadingProps) => {
  return (
    <MutatingDots
      wrapperClass="justify-center items-center"
      ariaLabel="loading-indicator"
      color="#fb923c"
      secondaryColor="#2dd4bf"
      width={width || 150}
      height={height || 110}
    />
  );
};

export default Loading;
