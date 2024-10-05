// components/P5jsContainer.tsx
import React, { useEffect, useRef, useState } from "react";
import p5Types from "p5";

// can go in "./types/global.d.ts"
type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;
type P5jsContainer = ({ sketch }: { sketch: P5jsSketch }) => React.JSX.Element;

export const P5jsContainer: P5jsContainer = ({ sketch }) => {
  const parentRef:any = useRef<P5jsContainerRef>();

  // More stuff comes here
  // ....
  // ...

  // parent div of the p5 canvas
  return <div ref={parentRef}></div>;
};