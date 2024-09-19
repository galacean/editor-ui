import React, { forwardRef, useEffect, useState } from "react";

import type { IBezierPoint, IPoint } from "./types";
import { generateCurve, generateLineByPoints } from "./helper";
import { mergeRefs } from '../../utils/merge-refs'

import { styled } from "../../design-system";

const StyledPath = styled("path", {
  strokeWidth: 1,
  stroke: "$orange10",
  fill: "none",
  variants: {
    hitline: {
      true: {
        strokeWidth: 5,
        stroke: "transparent"
      }
    }
  }
});

const StyledTempPoint = styled("circle", {
  fill: "$orange11",
  r: 3,
  transition: "transform .1s ease",
  strokeWidth: 1,
  stroke: "$orange12"
});

interface BezierCurveProps {
  algo: "linear" | "bezier";
  points: IBezierPoint[];
  zoom: number;
  getRoot: () => SVGSVGElement;
  // onAddPoint only works when algo is "linear" because svg could not render higher order bezier curve accurately
  onAddPoint?: (point: IBezierPoint, index: number) => void;
}

export const BezierCurve = forwardRef<SVGPathElement, BezierCurveProps>(function BezierCurve(
  props: BezierCurveProps,
  forwardedRef
) {
  const { points, getRoot, zoom = 1, algo = "bezier" } = props;
  let actualAlgorithm = algo;
  if (points.length > 2) {
    actualAlgorithm = "linear";
  }
  const [hovered, setHovered] = useState(false);
  const pointerRef = React.useRef<DOMPoint>();
  const tempPointRef = React.useRef<SVGCircleElement>();
  const pathRef = React.useRef<SVGPathElement>();
  const [startPoint, setStartPoint] = useState<IPoint>();
  const [matrixedPoint, setMatrixedPoint] = useState<IPoint>();

  useEffect(() => {
    if(pathRef && pathRef.current) {
      pathRef.current.getTotalLength
      pathRef.current.addEventListener("mousedown", (event) => {
      });
    }
  }, []);

  function getCurosrPoint(event: React.MouseEvent<SVGPathElement>): { x: number; y: number } {
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;
    return pointerRef.current.matrixTransform(getRoot().getScreenCTM()?.inverse());
  }

  const handleMouseEnter = (e: React.MouseEvent<SVGPathElement>) => {
    if (!pointerRef.current) {
      pointerRef.current = getRoot().createSVGPoint();
    }
    if (!hovered) {
      setHovered(true);
      const matrixedPoint = getCurosrPoint(e);
      setStartPoint({
        x: matrixedPoint.x,
        y: matrixedPoint.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    const matrixedPoint = getCurosrPoint(e);
    setMatrixedPoint(matrixedPoint);
  };

  const handleAddPoint = () => {
    const bezierPoint = {
      point: {
        x: matrixedPoint.x * zoom,
        y: matrixedPoint.y * zoom
      },
      controlPoint: {
        x: (matrixedPoint.x + 20) * zoom,
        y: (matrixedPoint.y + 20) * zoom
      }
    };

    if (algo === "linear") {
      bezierPoint.controlPoint = null;
    }

    let nearestIndex = 0;
    for (let i = 1; i < points.length; i++) {
      const currentDistance = Math.sqrt(
        Math.pow(points[i].point.x - bezierPoint.point.x, 2) + Math.pow(points[i].point.y - bezierPoint.point.y, 2)
      );
      const nearestDistance = Math.sqrt(
        Math.pow(points[nearestIndex].point.x - bezierPoint.point.x, 2) +
          Math.pow(points[nearestIndex].point.y - bezierPoint.point.y, 2)
      );
      if (currentDistance < nearestDistance) {
        nearestIndex = i;
      }
    }

    if (props.onAddPoint) {
      props.onAddPoint(bezierPoint, nearestIndex);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<SVGPathElement>) => {
    e.stopPropagation();
    if (startPoint) {
      setHovered(false);
      setStartPoint(null);
    }
  };

  return (
    <g className="bezier-path" onMouseLeave={handleMouseLeave}>
      {actualAlgorithm === "linear" && (
        <>
          <StyledPath
            className="bezier-line"
            ref={mergeRefs([pathRef, forwardedRef])}
            d={generateLineByPoints(points)}
          />
          <StyledPath
            hitline
            className="bezier-line-hitarea"
            d={generateLineByPoints(points)}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
          />
        </>
      )}
      {actualAlgorithm === "bezier" && (
        <>
          <StyledPath
            className="bezier-curve"
            ref={mergeRefs([pathRef, forwardedRef])}
            d={generateCurve(points)}
          />
          <StyledPath
            hitline
            className="bezier-curve-hitarea"
            d={generateCurve(points)}
          />
        </>
      )}
      {actualAlgorithm === 'linear' && hovered && startPoint && matrixedPoint && (
        <g>
          <StyledTempPoint ref={tempPointRef} cx={matrixedPoint.x} cy={matrixedPoint.y} onClick={handleAddPoint} />
        </g>
      )}
    </g>
  );
});
