import { ButtonHTMLAttributes } from "react";
import { styled } from "@galacean/design-system";
import { IPoint } from "./types";
import { IconCirclePlus, IconCirclePlusFilled } from "@tabler/icons-react";
import { Flex } from "../Flex";
import { Button } from "../Button";

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

const PresetList = styled("div", {
  width: "100%",
  display: "grid",
  padding: "$1 0",
  gridTemplateColumns: "repeat(5, 1fr)",
  alignItems: "center",
  gap: "$2"
});

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

interface BezierCurveEditorProps {
  persets?: IPoint[];
  onApplyPreset: (points: IPoint[]) => void;
  onAddPreset: () => void;
}

export function BezierCurvePresets(props: BezierCurveEditorProps) {
  const { persets = [], onApplyPreset, onAddPreset } = props;
  return (
    <>
      <Flex align="v" justifyContent="between" css={{ fontSize: '$1', marginTop: '$7', color: '$gray11', userSelect: 'none' }}>
        Pesets
        <Button variant="subsecondary">Edit</Button>
      </Flex>
      <PresetList>
        {bezierCurvePresets.concat(persets).map((points, index) => (
          <PresetItem key={index} points={points} onClick={() => onApplyPreset && onApplyPreset(points)} />
        ))}
        <CurvePresetItem onClick={onAddPreset}>
          <IconCirclePlusFilled size="16px" />
        </CurvePresetItem>
      </PresetList> 
    </>
  )
}