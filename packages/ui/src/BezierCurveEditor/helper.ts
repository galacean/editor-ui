import { IBezierPoint, IPoint, BezierCurveEditorProps } from "./types";

export { mergeRefs } from "../../utils/merge-refs";

export function generateCurve(points: IBezierPoint[], zoom = 1): string {
  points = points.map((point) => ({
    point: { x: point.point.x / zoom, y: point.point.y / zoom },
    controlPoint: point.controlPoint ? { x: point.controlPoint.x / zoom, y: point.controlPoint.y / zoom } : null
  }));
  return `
    M ${points[0].point.x} ${points[0].point.y}
    C ${points[0].controlPoint.x} ${points[0].controlPoint.y},
    ${points[1].controlPoint.x} ${points[1].controlPoint.y}
    ${points[1].point.x} ${points[1].point.y}
    ${points
      .slice(2)
      .map((point) => ` S ${point.controlPoint.x} ${point.controlPoint.y}, ${point.point.x} ${point.point.y}`)}`;
}

export function generateLineByPoints(points: IBezierPoint[], zoom = 1): string {
  points = points.map((point) => ({
    point: { x: point.point.x / zoom, y: point.point.y / zoom },
    controlPoint: point.controlPoint ? { x: point.controlPoint.x / zoom, y: point.controlPoint.y / zoom } : null
  }));
  return `
    M ${points[0].point.x} ${points[0].point.y}
    ${points.slice(1).map((point) => ` L ${point.point.x} ${point.point.y}`)}`;
}

export function convertPointsToBezierPoints(points: IPoint[], algo: "bezier" | "linear" = "bezier"): IBezierPoint[] {
  if (points.length <= 3) {
    algo = "linear";
  }

  if (algo === "linear") {
    return points.map((point) => ({ point, controlPoint: null }));
  }

  const [point, controlPoint, ...restPoints] = points;
  const bezierPoints: IBezierPoint[] = [{ point, controlPoint }];
  const restLength = restPoints.length;

  for (let index = 0; index < restLength; index += 2) {
    const [controlPoint, point] = restPoints.slice(index, index + 2);
    bezierPoints.push({ point, controlPoint });
  }

  return bezierPoints;
}

export function convertBezierPointToPoint(
  bezierPoints: IBezierPoint[],
  algo: "bezier" | "linear" = "bezier",
): IPoint[] {
  if (algo === "linear") {
    return bezierPoints.map((bezierPoint) => bezierPoint.point);
  }
  return bezierPoints.reduce((acc, bezierPoint, currentIndex) => {
    if (currentIndex === 0) return [bezierPoint.point, bezierPoint.controlPoint];
    return [...acc, bezierPoint.controlPoint, bezierPoint.point];
  }, []);
}

export function convertPointsToLinearPoints(points: IPoint[]): IPoint[] {
  return points;
}

export function denormalizePoint(
  points: IPoint[],
  scaleX: number,
  scaleY: number,
  zoom = 1,
): IPoint[] {
  return points.map((point) => {
    return {
      x: point.x * scaleX * zoom,
      y: (-point.y * scaleY) * zoom
    };
  });
}

export function normalizePoint(
  points: IPoint[],
  scaleX: number,
  scaleY: number,
  zoom = 1,
): IPoint[] {
  return points.map((point) => {
    return {
      x: point.x / scaleX * zoom,
      y: -point.y / scaleY * zoom
    };
  });
}

export function getDefaultOffset(width: number, height: number) {
  return {
    x: 0,
    y: -Math.round(height / 2)
  };
}

function factorial(num) {
  if (num === 0) return 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
      result *= i;
  }
  return result;
}

export function getPointOnCurve(points: IPoint[], t: number): IPoint {
  const n = points.length - 1; // Degree of the curve
  let x = 0;
  let y = 0;

  // Compute the point on the Bezier curve using the Bernstein polynomial
  for (let i = 0; i <= n; i++) {
      const binomialCoefficient = factorial(n) / (factorial(i) * factorial(n - i));
      const term = binomialCoefficient * Math.pow(t, i) * Math.pow(1 - t, n - i);
      x += term * points[i].x;
      y += term * points[i].y;
  }

  return { x, y };
}