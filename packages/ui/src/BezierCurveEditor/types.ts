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
  draggable?: boolean;
  zoomable?: boolean;
  zoomSpeed?: number;
  zoomLimit?: number[];
  points?: IPoint[];
  defaultPoints?: IPoint[];
  onPointsChange?: (value: IPoint[]) => void;
  doubleControlPoint?: boolean;
  pan?: true;
  grid?: {
    tickX: number;
    tickY: number;
  };
  axisLabel?: {
    x: string;
    y: string;
  };
  axisName?: {
    x: string;
    y: string;
  };
}
