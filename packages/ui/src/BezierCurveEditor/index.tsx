import React, { useState, useRef, useLayoutEffect, forwardRef, ButtonHTMLAttributes } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { BezierCurveEditor as Editor } from "./BezierCurveEditor";
import {
  convertPointsToBezierPoints,
  denormalizePoint,
  generateCurve,
  generateLineByPoints,
  mergeRefs
} from "./helper";

import { styled } from "@galacean/design-system";
import { IPoint } from "./types";
import { BezierAnimation } from "./BezierAnimation";
import { Popover } from "..";
import { IconCirclePlus, IconCirclePlusFilled } from "@tabler/icons-react";

const CurvePresetItem = styled("button", {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "$8",
  borderRadius: "$2",
  color: "$grayA9",
  cursor: "pointer",
  backgroundColor: "$appBackground",
  border: "1px solid $grayA3",
  overflow: "hidden",
  transition: "color .2s ease-in-out",
  '&:hover': {
    color: '$orange10',
  }
});

const PreviewRoot = styled("div", {
  width: "100%",
  display: "grid",
  padding: "$1 0",
  marginTop: '$2',
  gridTemplateColumns: "repeat(5, 1fr)",
  alignItems: "center",
  gap: "$2"
});

const BezierCurveEditorTrigger = styled("div", {
  display: "flex",
  height: "$6",
  width: "100px",
  background: "$grayA3",
  borderRadius: "$2",
  overflow: "hidden",
  fontSize: "$1",
  cursor: "pointer",
  "& > svg": {
    stroke: "$orange9",
    fill: "none"
  }
});

const PresetPath = styled("path", {
  fill: "none",
  stroke: "$grayA8",
  strokeWidth: "1.5px",
  transition: "stroke .2s ease-in-out, stroke-width .2s ease-in-out"
});

const PresetSvg = styled("svg", {
  width: "100%",
  height: "100%",
  overflow: "visible",
  "&:hover": {
    [`& ${PresetPath}`]: {
      stroke: "$orange10",
      strokeWidth: "2px"
    }
  }
});

const bezierCurvePresets = [
  [
    { x: 0, y: 0 },
    { x: 0.2, y: 0.8 },
    { x: 0.8, y: 0.2 },
    { x: 1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0.3, y: 0.5 },
    { x: 0.7, y: 0.5 },
    { x: 1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0.1, y: 0.9 },
    { x: 0.9, y: 0.1 },
    { x: 1, y: 1 }
  ],
  [
    {
        "x": 0,
        "y": 0
    },
    {
        "x": 0.3225,
        "y": -0.5454545454545454
    },
    {
        "x": 1,
        "y": -0.7386363636363636
    },
    {
        "x": 1,
        "y": 1
    }
],
  [
    { x: 0, y: 0 },
    { x: 0.2, y: 0.8 },
    { x: 0.8, y: 0.2 },
    { x: 1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0.25, y: 0.75 },
    { x: 0.75, y: 0.75 },
    { x: 1, y: 0 }
  ],
  [
    {
        "x": 0,
        "y": 0
    },
    {
        "x": 0,
        "y": 1.54
    },
    {
        "x": 0.83,
        "y": 0.67
    },
    {
        "x": 1,
        "y": 1
    }
  ],
  [
    {
        "x": 0,
        "y": 0
    },
    {
        "x": 0.7,
        "y": 0
    },
    {
        "x": 1,
        "y": 0.5
    },
    {
        "x": 1,
        "y": 1
    }
  ],
  [
    {
        "x": 0,
        "y": 0
    },
    {
        "x": 0.42,
        "y": 0
    },
    {
        "x": 0.58,
        "y": 1
    },
    {
        "x": 1,
        "y": 1
    }
]
]

interface BezierCurveEditorProps {
  value?: IPoint[];
  defaultValue?: IPoint[];
  onChange?: (value: IPoint[]) => void;
  algo?: "linear" | "bezier";
}

interface PresetItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  points?: IPoint[];
  width?: number;
  height?: number;
}

function PresetItem(props: PresetItemProps) {
  const { points, width = 74, height = 34, ...rest } = props;
  const genPath = (points) => {
    if (points.length < 4) {
      return '';
    }

    let d = `M${points[0].x * width} ${points[0].y * height}`;

    for (let i = 1; i < points.length; i += 3) {
      d += ` C${points[i].x * width} ${-points[i].y * height}, ${points[i + 1].x * width} ${-points[i + 1].y * height}, ${points[i + 2].x * width} ${-points[i + 2].y * height}`;
    }

    return d;
  };
  return (
    <CurvePresetItem {...rest}>
      <PresetSvg width={width} height={height} viewBox={`0 -${height} ${width} ${height}`}>
        <PresetPath d={genPath(points)} />
      </PresetSvg>
    </CurvePresetItem>
  );
}

const defaultPoints = [
  { x: 0, y: 0 },
  { x: 0.25, y: 0.25 },
  { x: 0.75, y: 0.75 },
  { x: 1, y: 1 }
];

interface EditorTriggerProps {
  points: IPoint[];
  algo?: "linear" | "bezier";
  children?: React.ReactNode;
}

const EditorTrigger = forwardRef<HTMLDivElement, EditorTriggerProps>(function EditorTrigger(
  props: EditorTriggerProps,
  forwardedRef
) {
  const { points, algo, ...rest } = props;
  const rootRef = useRef<HTMLDivElement>();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    rootRef.current && setSize(rootRef.current.getBoundingClientRect());
  }, []);

  let path = "";
  if (size.width !== 0 && points.length) {
    const bezierPoint = convertPointsToBezierPoints(denormalizePoint(points, size.width, size.height), algo);
    if (algo === "bezier") {
      path = generateCurve(bezierPoint);
    }
    if (algo === "linear") {
      path = generateLineByPoints(bezierPoint);
    }
  }

  return (
    <BezierCurveEditorTrigger ref={mergeRefs([rootRef, forwardedRef])} {...rest}>
      {!!size.width && (
        <svg width={size.width} height={size.height} viewBox={`0 -${size.height} ${size.width} ${size.height}`}>
          <path d={path} />
        </svg>
      )}
    </BezierCurveEditorTrigger>
  );
});

const CurveWrapper = styled('div', {
  borderRadius: '$3',
  backgroundColor: '$gray1',
})

export const BezierCurveEditor = function BezierCurveEditor(props: BezierCurveEditorProps) {
  const { onChange, value, defaultValue, algo = "bezier" } = props;
  const [points, setPoints] = useControllableState<IPoint[]>({
    prop: value,
    defaultProp: defaultPoints || defaultValue,
    onChange: onChange,
  });

  function applyPreset(points: IPoint[]) {
    setPoints(points);
  }

  return (
    // <Popover compact trigger={<EditorTrigger points={points} algo={algo} />} sideOffset={2}>
      <CurveWrapper>
        <Editor
          algo={algo}
          curveDisplay="curve"
          width={400}
          height={220}
          points={points}
          keyMap={{ x: "timer", y: "value" }}
          onPointsChange={setPoints}
        />
        <PreviewRoot>
          {bezierCurvePresets.map((points, index) => (
            <PresetItem key={index} points={points} onClick={() => applyPreset(points)} />
          ))}
          <CurvePresetItem>
            <IconCirclePlusFilled size="16px" />
          </CurvePresetItem>
        </PreviewRoot>
        <BezierAnimation points={points} />
      </CurveWrapper>
    // </Popover>
  );
};
