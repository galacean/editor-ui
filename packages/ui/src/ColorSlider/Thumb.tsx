import React, { useEffect, useCallback } from "react";
import { colord } from "colord";
import { extend } from "colord";
import minifyPlugin from "colord/plugins/minify";
import mixPlugin from "colord/plugins/mix";

import { styled } from "@galacean/design-system";
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import { isEqual, type IColor, type IGradientColor } from "../ColorPicker/helper";
import { Flex } from "../Flex";
import { clamp } from "../../utils/math";

extend([minifyPlugin, mixPlugin]);

const StyledThumb = styled("div", {
  position: "relative",
  top: 3,
  height: "14px",
  width: "14px",
  borderRadius: "$1",
  border: "1px solid CurrentColor",
  transform: "translateX(-50%)",
  meshBackground: 5,
  '&::after': {
    content: "''",
    display: 'block',
    position: "absolute",
    bottom: '$3',
    width: 0,
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderBottom: "4px solid currentColor",
    transform: "translateX(2px)"
  },
  "& > div": {
    content: "''",
    position: "absolute",
    inset: 0,
    borderRadius: '$1',
    backgroundSize: "100% 100%"
  },
  "& > div:first-child": {
    meshBackground: 5
  },
});

const StyledThumbRoot = styled(Flex, {
  position: "relative",
  width: "14px",
  color: "$gray12",
  cursor: "pointer",
  transition: "color 0.2s ease",
  variants: {
    active: {
      true: {
        color: "$green10"
      }
    }
  },
  "&:hover": {
    color: "$green10"
  }
});

interface ThumbProps {
  range: { min: number; max: number };
  color: IColor;
  index: number;
  active?: boolean;
  onSelect?: (index: number) => void;
  position: number;
  onPositionChange: (position: number, index: number) => void;
  onColorChange?: (color: string) => void;
  onRemove?: (index: number) => void;
}

function Thumb(props: ThumbProps) {
  const { range, position, onPositionChange, onRemove, active } = props;
  const [dragging, setDragging] = React.useState(false);
  // const [position, setPosition] = useControllableState<number>({
  //   prop: props.position,
  //   onChange: (p) => {
  //     props.onPositionChange(p, props.index);
  //   },
  //   defaultProp: 0,
  // })
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const translateX = position * range.max;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = useCallback(
    function handleMouseMove(e: MouseEvent) {
      if (!dragging || !ref.current) return;
      e.stopPropagation();
      e.preventDefault();
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const nextPosition = clamp((translateX + deltaX) / range.max, 0, 1);
      onPositionChange(nextPosition, props.index);
      // setPosition(nextPosition);
      if (deltaY > 50) {
        setDragging(false);
        onRemove && onRemove(props.index);
      }
    },
    [startX, range]
  );

  function handleMouseUp() {
    setDragging(false);
  }

  function handleSelectThumb(e: React.MouseEvent) {
    e.stopPropagation();
    if (props.onSelect) {
      props.onSelect(props.index);
    }
  }

  useEffect(() => {
    if (!dragging) {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <StyledThumbRoot
      active={active}
      direction="column"
      align="v"
      ref={ref}
      onClick={handleSelectThumb}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        transform: `translateX(${translateX}px)`
      }}
    >
      <StyledThumb>
        <div />
        <div style={{ backgroundColor: colord(props.color).toHex() }} />
      </StyledThumb>
    </StyledThumbRoot>
  );
}

const ThumbContainer = styled("div", {
  width: "100%",
  height: "$5",
  variants: {
    flipY: {
      true: {
        transform: "scaleY(-1)"
      }
    }
  }
});

interface ThumbGroupProps {
  selectedIndex: number;
  positions: number[];
  colors: IColor[];
  onChange: (colors: IGradientColor) => void;
  onSelect: (index: number) => void;
  flipY?: boolean;
  width: number;
}

function ThumbGroup(props: ThumbGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { colors, positions, onSelect, onChange, selectedIndex, flipY, width } = props;

  const handlePositionChange = (position: number, index: number) => {
    const nextPositions = [...positions];
    nextPositions[index] = position;

    // resort if needed
    const nextColors = colors.map(item => ({ ...item }));
    const nextPositionsCopy = [...nextPositions];
    nextPositionsCopy.sort((a, b) => a - b);
    nextPositionsCopy.forEach((p, i) => {
      const currentIndex = nextPositions.indexOf(p);
      nextColors[i] = colors[currentIndex];
    });
    
    // If currentSelectedIndex's color position changed, update the selectedIndex
    const nextIndex = nextColors.findIndex((c) => {
      return isEqual(c, colors[selectedIndex]);
    });

    if (nextIndex !== selectedIndex && nextIndex !== -1) {
      onSelect(nextIndex);
    }

    const result = nextPositionsCopy.map((p, i) => ({ value: nextColors[i], position: p }));
    onChange(result);
  };

  const handleAddThumb = (e) => {
    const { current } = ref;
    if (!current) return;
    const { clientX } = e;
    const { left } = current.getBoundingClientRect();
    const x = clientX - left;
    const position = x / width;

    let afterIndex = positions.findIndex((p) => p > position);
    let newColor: IColor;

    // if no position is greater than the new position, insert at the end
    if (afterIndex === -1) {
      afterIndex = positions.length;
      newColor = colors[afterIndex - 1];
      // if the new position is 0, insert at the beginning
    } else if (afterIndex === 0) {
      newColor = colors[afterIndex];
    } else {
      newColor = colord(colors[afterIndex - 1])
        .mix(colors[afterIndex], position)
        .toRgb();
    }

    const colorsCopy = colors.map(c => ({ ...c }))
    const positionsCopy = [...positions];

    colorsCopy.splice(afterIndex, 0, newColor);
    positionsCopy.splice(afterIndex, 0, position);

    onSelect(afterIndex);
    onChange(positionsCopy.map((p, i) => ({ value: colorsCopy[i], position: p })));
  };

  const handleRemoveThumb = (index: number) => {
    if (positions.length <= 2) return;
    const colorsCopy = colors.map(c => ({ ...c }));
    const positionsCopy = [...positions];
    colorsCopy.splice(index, 1);
    positionsCopy.splice(index, 1);
    const ret = positionsCopy.map((p, i) => ({ value: colorsCopy[i], position: p }));
    onSelect(Math.max(0, index - 1));
    onChange(ret);
  };

  const handleSelectThumb = (index: number) => {
    onSelect(index);
  };

  return (
    <ThumbContainer ref={ref} onDoubleClick={handleAddThumb} flipY={flipY}>
      {positions.map((position, i) => {
        return (
          <Thumb
            range={{ min: 0, max: width }}
            index={i}
            key={i}
            position={position}
            active={selectedIndex === i}
            onSelect={handleSelectThumb}
            color={colors[i]}
            onPositionChange={handlePositionChange}
            onRemove={handleRemoveThumb}
          />
        );
      })}
    </ThumbContainer>
  );
}

export {
  Thumb,
  ThumbGroup,
}