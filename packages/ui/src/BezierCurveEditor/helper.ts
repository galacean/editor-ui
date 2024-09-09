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



export function calculateBezierPoint(t: number, points: IPoint[]): IPoint {
  let x = 0, y = 0;
  const n = points.length - 1;

  for (let i = 0; i <= n; i++) {
    const binCoeff = binomialCoefficient(n, i);
    const term = binCoeff * Math.pow(1 - t, n - i) * Math.pow(t, i);
    x += term * points[i].x;
    y += term * points[i].y;
  }

  return { x, y };
}

export function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

export function binomialCoefficient(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

const lerp = (x, y, a) => x * (1 - a) + y * a;

export function calculateHorizontalBezierPoint(t: number, points: IPoint[], fixedY: number): IPoint {
  let x = 0;
  const n = points.length - 1;

  for (let i = 0; i <= n; i++) {
    const binCoeff = binomialCoefficient(n, i);
    const term = binCoeff * Math.pow(1 - t, n - i) * Math.pow(t, i);
    x += term * points[i].x;
  }

  return { x, y: fixedY };
}

export function getPointOnCurve(points: IPoint[], t: number): IPoint {
  if (points.length === 1) {
    return points[0];
  }

  // De Casteljau's algorithm
  let newPoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    let x = (1 - t) * points[i].x + t * points[i + 1].x;
    let y = (1 - t) * points[i].y + t * points[i + 1].y;
    newPoints.push({ x, y });
  }

  return getPointOnCurve(newPoints, t);
}