export interface IPoint extends Record<string, number> {
  x: number;
  y: number;
}

export interface IBezierPoint {
  point: IPoint;
  controlPoint: IPoint;
}

export interface BezierCurveEditorProps {
  algo?: "bezier" | "linear";
  width: number;
  height: number;
  yTickScale?: number;
  yRangeMode?: "symmetric" | "positive";
  onYTickScaleChange?: (value: number) => void;
  onYTickScaleCommit?: () => void;
  yTickScaleMin?: number;
  yTickScaleMax?: number;
  zoomable?: boolean;
  zoomSpeed?: number;
  zoomLimit?: [number, number];
  points?: IPoint[];
  defaultPoints?: IPoint[];
  onPointsChange?: (value: IPoint[]) => void;
  doubleControlPoint?: boolean;
  axisLabel?: string;
}
