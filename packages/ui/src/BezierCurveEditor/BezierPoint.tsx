import type { IPoint, IBezierPoint } from "./types";
import { Point } from "./Point";

import { styled } from "../../design-system";

const StyledControlLine = styled("line", {
  stroke: "$gray5"
});

export interface BezierPointProps {
  index: number;
  zoom: number; 
  bezierPoint: IBezierPoint;
  doublePoint?: boolean;
  key: number;
  algo: "linear" | "bezier";
  onPointChange: (index, point: IBezierPoint) => void;
}

export function BezierPoint(props: BezierPointProps) {
  const { index, bezierPoint, onPointChange, algo, doublePoint = false } = props;
  let { point, controlPoint } = bezierPoint;
  point = {
    x: point.x,
    y: point.y
  }
  controlPoint = {
    x: controlPoint.x,
    y: controlPoint.y
  }

  const subControlPoint =
    algo === "bezier"
      ? {
          x: 2 * point.x - controlPoint.x,
          y: point.y + (point.y - controlPoint.y)
        }
      : null;

  const handlePointChange = (delta: IPoint) => {
    const newPoint = {
      x: point.x + delta.x,
      y: point.y + delta.y
    };
    onPointChange(index, {
      point: newPoint,
      controlPoint:
        algo === "bezier"
          ? {
              x: controlPoint.x + delta.x,
              y: controlPoint.y + delta.y
            }
          : null
    });
  };

  const handleControlPointChange = (delta: IPoint) => {
    const newControlPoint = {
      x: controlPoint.x + delta.x,
      y: controlPoint.y + delta.y
    };
    onPointChange(index, {
      point,
      controlPoint: newControlPoint
    });
  };

  const handleSubControlPointChange = (delta: IPoint) => {
    handleControlPointChange({
      x: -delta.x,
      y: -delta.y
    });
  }

  return (
    <>
      {algo === "bezier" && (
        <>
          <StyledControlLine strokeWidth={1} x1={point.x} y1={point.y} x2={controlPoint.x} y2={controlPoint.y} />
          {doublePoint &&
            <StyledControlLine strokeWidth={1} x1={point.x} y1={point.y} x2={subControlPoint.x} y2={subControlPoint.y} />
          }
        </>
      )}
      <Point type="pivot" main point={point} onPointChange={handlePointChange} />
      {algo === "bezier" && (
        <>
          <Point type="control" point={controlPoint} onPointChange={handleControlPointChange}  />
          {doublePoint && 
            <Point
              type="control"
              point={subControlPoint}
              onPointChange={handleSubControlPointChange}
            />
          }
        </>
      )}
    </>
  );
}
