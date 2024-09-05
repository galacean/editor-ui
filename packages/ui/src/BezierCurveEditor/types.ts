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
  points?: IPoint[];
  defaultPoints?: IPoint[];
  onPointsChange?: (value: IPoint[]) => void;
  doubleControlPoint?: boolean;
  pan?: true;
  grid?: {
    tickX: number;
    tickY: number;
  };
  curveDisplay?: "curve" | "line";
  keyMap?: {
    x: string;
    y: string;
  };
  axisName?: {
    x: string;
    y: string;
  };
}
