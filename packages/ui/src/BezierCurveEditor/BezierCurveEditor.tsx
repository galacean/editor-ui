import React, { useMemo, useState, useEffect } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import {
  mergeRefs,
  getDefaultOffset,
  convertBezierPointToPoint,
  convertPointsToBezierPoints,
  normalizePoint,
  denormalizePoint
} from "./helper";
import { IBezierPoint, IPoint, BezierCurveEditorProps } from "./types";
import { BezierPoint } from "./BezierPoint";
import { BezierCurve } from "./BezierCurve";
import { Grid } from "./Grid";

import { styled } from "@galacean/design-system";

const StyledSvgRoot = styled("svg", {
  overflow: 'unset',
  fontSize: 0,
  '& g': {
    fontSize: 0
  }
});

const defaultPoints = [
  { x: 0, y: 0 },
  { x: 0.25, y: 0.25 },
  { x: 0.75, y: 0.75 },
  { x: 1, y: 1 }
];

function _BezierCurveEditor(props: BezierCurveEditorProps, forwardedRef: React.Ref<SVGSVGElement>) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const axisXScale = 1;
  const axisYScale = 0.4; // the graduated scale of Y axis is 0.4, case 1 cell indicate 25% of the height
  const {
    width = 300,
    height = 300,
    points: propPoints,
    defaultPoints: propDefaultPoints,
    curveDisplay = "line",
    algo = "linear",
    draggable = false,
  } = props;
  const pointerRef = React.useRef<DOMPoint>(null);
  const [offset, setOffset] = useState<IPoint>(getDefaultOffset(width, height));
  const [startPoint, setStartPoint] = useState<IPoint>(null);
  const [isMoving, setIsMoving] = useState(false);

  const [points, setPoints] = useControllableState<IBezierPoint[]>({
    prop: propPoints ? convertPointsToBezierPoints(denormalizePoint(propPoints, width * axisXScale, height * axisYScale), algo) : undefined,
    defaultProp: convertPointsToBezierPoints(denormalizePoint(propDefaultPoints || defaultPoints, width * axisXScale, height * axisYScale), algo),
    onChange: (bezierPoints: IBezierPoint[]) => {
      const ret = normalizePoint(convertBezierPointToPoint(bezierPoints, algo), width * axisXScale, height * axisYScale);
      if (props.onPointsChange) {
        props.onPointsChange(ret);
      }
    }
  });

  const handlePointChange = (index: number, bezierPoint: IBezierPoint) => {
    const newPoints = [...points!];
    newPoints[index] = bezierPoint;
    setPoints(newPoints);
  };

  const handleMouseDown = (e: React.MouseEvent<SVGElement>) => {

    setStartPoint({
      x: e.clientX,
      y: e.clientY
    });
    setIsMoving(true);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (!startPoint) return;

    const movedX = e.clientX - startPoint.x;
    const movedY = e.clientY - startPoint.y;

    setOffset({ x: offset.x - movedX, y: offset.y - movedY });
  };

  const handleAddPoint = (point: IBezierPoint, index) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints!];
      newPoints.splice(index, 0, point);
      return newPoints;
    });
  };

  useEffect(() => {
    pointerRef.current = svgRef.current.createSVGPoint();
  }, []);

  useEffect(() => {
    const onViewMouseUp = () => {
      setIsMoving(false);
    };

    const onViewMouseMove = (event) => {
      if (isMoving && handleMouseMove) {
        handleMouseMove(event);
      }
    };
    if(draggable) {
      if (isMoving) {
        window.addEventListener("mousemove", onViewMouseMove);
        window.addEventListener("mouseup", onViewMouseUp);
      } else {
        window.removeEventListener("mousemove", onViewMouseMove);
        window.removeEventListener("mouseup", onViewMouseUp);
      }
    }
    return () => {
      if(draggable) {
        window.removeEventListener("mousemove", onViewMouseMove);
        window.removeEventListener("mouseup", onViewMouseUp);
      }
    };
  }, [isMoving, draggable]);

  return (
    <StyledSvgRoot
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${offset.x} ${offset.y} ${width} ${height}`}
      width={width}
      height={height}
      ref={svgRef}
      onMouseDown={draggable ? handleMouseDown : undefined}
    >
      <Grid size={{ width, height }} offset={offset} keyMap={props.keyMap} />
      <BezierCurve
        algo={algo}
        display={curveDisplay}
        points={points!}
        getRoot={() => svgRef.current}
        onAddPoint={handleAddPoint}
      />
      <g className="bezier-curve-points">
        {points.map((bezierPoint, index) => (
          <BezierPoint
            index={index}
            key={index}
            bezierPoint={bezierPoint}
            onPointChange={handlePointChange}
            algo={algo}
          />
        ))}
      </g>
    </StyledSvgRoot>
  );
}

export const BezierCurveEditor = React.forwardRef(_BezierCurveEditor);
