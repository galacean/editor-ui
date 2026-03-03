import { IBezierPoint, IPoint } from "./types";

function scalePoints(points: IBezierPoint[], zoom: number): IBezierPoint[] {
  return points.map((point) => ({
    point: { x: point.point.x / zoom, y: point.point.y / zoom },
    controlPoint: point.controlPoint ? { x: point.controlPoint.x / zoom, y: point.controlPoint.y / zoom } : null
  }));
}

export function generateCurve(points: IBezierPoint[], zoom = 1, extendLeftX?: number, extendRightX?: number): string {
  const scaled = scalePoints(points, zoom);
  const first = scaled[0];
  const last = scaled[scaled.length - 1];

  let d = extendLeftX !== undefined
    ? `M ${extendLeftX} ${first.point.y} L ${first.point.x} ${first.point.y}`
    : `M ${first.point.x} ${first.point.y}`;

  d += ` C ${first.controlPoint.x} ${first.controlPoint.y}, ${scaled[1].controlPoint.x} ${scaled[1].controlPoint.y} ${scaled[1].point.x} ${scaled[1].point.y}`;
  d += scaled.slice(2).map((point) => ` S ${point.controlPoint.x} ${point.controlPoint.y}, ${point.point.x} ${point.point.y}`).join('');

  if (extendRightX !== undefined) {
    d += ` L ${extendRightX} ${last.point.y}`;
  }

  return d;
}

export function generateLineByPoints(points: IBezierPoint[], zoom = 1, extendLeftX?: number, extendRightX?: number): string {
  const scaled = scalePoints(points, zoom);
  const first = scaled[0];
  const last = scaled[scaled.length - 1];

  let d = extendLeftX !== undefined
    ? `M ${extendLeftX} ${first.point.y} L ${first.point.x} ${first.point.y}`
    : `M ${first.point.x} ${first.point.y}`;

  d += scaled.slice(1).map((point) => ` L ${point.point.x} ${point.point.y}`).join('');

  if (extendRightX !== undefined) {
    d += ` L ${extendRightX} ${last.point.y}`;
  }

  return d;
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
  const result: IPoint[] = [];
  for (const bezierPoint of bezierPoints) {
    if (result.length === 0) {
      result.push(bezierPoint.point, bezierPoint.controlPoint);
    } else {
      result.push(bezierPoint.controlPoint, bezierPoint.point);
    }
  }
  return result;
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

export function getDefaultOffset(height: number) {
  return {
    x: 0,
    y: -Math.round(height / 2)
  };
}

function factorial(num: number) {
  if (num === 0) return 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
      result *= i;
  }
  return result;
}

export function getPointOnLinear(points: IPoint[], t: number): IPoint {
  if (points.length < 2) {
    throw new Error('At least 2 points are required to calculate the point on a linear curve');
  }

  t = Math.max(0, Math.min(1, t));

  const segments = points.length - 1;
  
  const segment = Math.min(Math.floor(t * segments), segments - 1);
  
  const segmentT = (t * segments) - segment;
  
  const p0 = points[segment];
  const p1 = points[segment + 1];
  
  return {
    x: p0.x + (p1.x - p0.x) * segmentT,
    y: p0.y + (p1.y - p0.y) * segmentT
  };
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