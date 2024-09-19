import React, { useState, useRef, useLayoutEffect, forwardRef, ButtonHTMLAttributes, useEffect } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { BezierCurveEditor as Editor } from "./BezierCurveEditor";
import {
  convertPointsToBezierPoints,
  denormalizePoint,
  generateCurve,
  generateLineByPoints,
} from "./helper";

import { mergeRefs } from '../../utils/merge-refs'
import { styled } from "../../design-system";
import { IPoint } from "./types";
import { Popover } from "..";
import { BezierCurvePresets } from "./Preset";

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
  },
});

interface BezierCurveEditorProps {
  value?: IPoint[];
  defaultValue?: IPoint[];
  onChange?: (value: IPoint[]) => void;
  algo?: "linear" | "bezier";
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
  padding: '$2',
});

const LocalStorageKey = '_bezier_curve_presets';

export const BezierCurveEditor = function BezierCurveEditor(props: BezierCurveEditorProps) {
  const { onChange, value, defaultValue, algo = "bezier" } = props;
  const [presets, setPresets] = useState<(IPoint[])[]>([]);
  const [points, setPoints] = useControllableState<IPoint[]>({
    prop: value,
    defaultProp: defaultPoints || defaultValue,
    onChange: onChange,
  });

  useEffect(() => {
    const getLocalPresets = localStorage.getItem(LocalStorageKey);
    if (getLocalPresets) {
      setPresets(JSON.parse(getLocalPresets));
    }
  }, []);

  function applyPreset(points: IPoint[]) {
    setPoints(points);
  }

  function addPreset() {
    const newPresets = [...presets, points];
    setPresets(newPresets);
    localStorage.setItem(LocalStorageKey, JSON.stringify(newPresets));
  }

  function onDeletePreset(index: number) {
    setPresets(state => {
      const newPresets = [...state];
      newPresets.splice(index, 1);
      localStorage.setItem(LocalStorageKey, JSON.stringify(newPresets));
      return newPresets;
    });
  }

  return (
    <Popover trigger={<EditorTrigger points={points} algo={algo} />} sideOffset={2}>
      <CurveWrapper>
        <Editor
          algo={algo}
          width={400}
          height={220}
          points={points}
          axisLabel={{ x: "timer", y: "value" }}
          onPointsChange={setPoints}
        />
        <BezierCurvePresets
          presets={presets}
          onApplyPreset={applyPreset}
          onAddPreset={addPreset}
          onDeletePreset={onDeletePreset}
        />
      </CurveWrapper>
    </Popover>
  );
};
