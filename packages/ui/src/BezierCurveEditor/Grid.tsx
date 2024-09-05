import { styled } from "@galacean/design-system";

interface GridProps {
  size: {
    width: number;
    height: number;
  };
  keyMap?: {
    x: string;
    y: string;
  };
  offset: {
    x: number;
    y: number;
  };
  tick?: {
    x: number;
    y: number;
  };
}

const StyledTicks = styled("text", {
  fontSize: "10px",
  textAnchor: "middle",
  fill: "$gray10",
  userSelect: "none",
  // textOrientation: 'mixed',
  // writingMode: 'vertical-rl',
});

const StyledLabel = styled("text", {
  fontSize: "10px",
  textAnchor: "middle",
  fill: "$grayA10",
  userSelect: "none",
  variants: {
    vertical: {
      true: {
        writingMode: "vertical-rl",
        textOrientation: "mixed"
      }
    }
  }
});

const StyledGridLine = styled("rect", {
  fill: "$grayA3"
});

const StyledAxis = styled("line", {
  stroke: "$grayA6"
  // stroke: "transparent"
});

export function Grid(props: GridProps) {
  const {
    size: { width, height },
    offset,
    tick = { x: 10, y: 10 },
    keyMap
  } = props;

  function renderHorizontalGridLines() {
    return (
      <g className="grid-x-lines">
        {[...Array(tick.x + 1).keys()].map((index) => {
          const gap = height / tick.x;
          return (
            <StyledGridLine
              data-index={index}
              key={index}
              x={offset.x}
              y={index * gap + offset.y - (offset.y % gap)}
              width={width}
              height={1}
            />
          );
        })}
      </g>
    );
  }

  function renderVerticalGridLines() {
    return (
      <g className="grid-y-lines">
        {[...Array(tick.y + 1).keys()].map((index) => {
          const gap = width / tick.y;
          return (
            <StyledGridLine
              key={index}
              x={index * gap + offset.x - (offset.x % gap)}
              y={offset.y}
              width={1}
              height={height}
            />
          );
        })}
      </g>
    );
  }

  function renderXAxis() {
    return (
      <StyledAxis
        className="x-axis"
        x1={offset.x}
        y1={0}
        x2={offset.x + width}
        y2={0}
        strokeWidth="1"
      />
    );
  }

  function renderXAxisLabel() {
    return (
      <StyledLabel className="x-axis-label" x={offset.x + width / 2} y={offset.y + height - 20}>
        {keyMap ? keyMap.x : "x"}
      </StyledLabel>
    );
  }

  function renderXAxisTicks(tickXOffset = -10, tickYOffset = 12) {
    return (
      <g className="grid-x-ticks">
        {[...Array(tick.x + 1).keys()].map((index) => {
          const gap = width / tick.x;
          if(index === 0) {
            return null;
          }
          return (
            <StyledTicks
              className="x-axis-tick"
              key={`x-${index}`}
              y={tickYOffset}
              x={index * gap + offset.x - (offset.x % gap) + tickXOffset}
            >
              {(index + (offset.x > 0 ? Math.floor(offset.x / gap) : Math.ceil(offset.x / gap))) / 10}
            </StyledTicks>
          );
        })}
      </g>
    );
  }

  function renderYAxis() {
    return <StyledAxis className="y-axis" x1={0} y1={offset.y} x2={0} y2={offset.y + height} strokeWidth="1" />;
  }

  function renderYAxisLabel() {
    return (
      <StyledLabel className="y-axis" vertical x={offset.x + 10} y={offset.y + height / 2} textAnchor="middle">
        {keyMap ? keyMap.y : "y"}
      </StyledLabel>
    );
  }

  
  function renderYAxisTicks() {
    const xOffset = 12;
    return (
      <g className="grid-y-ticks">
        {[...Array(tick.y).keys()].map((index) => {
          const gap = height / tick.y;
          if(index % 2 === 0) {
            return null;
          }
          return (
            <StyledTicks
              className="y-axis-tick"
              key={`y-${index}`}
              x={xOffset}
              y={index * gap + offset.y - (offset.y % gap)}
            >
              {-(index + (offset.y > 0 ? Math.floor(offset.y / gap) : Math.ceil(offset.y / gap))) * 0.25}
            </StyledTicks>
          );
        })}
      </g>
    );
  }

  return (
    <g className="bezier-curve-grid">
      {renderHorizontalGridLines()}
      {renderVerticalGridLines()}
      {renderXAxisTicks()}
      {renderYAxisTicks()}
      {renderXAxis()}
      {/* {renderYAxis()} */}
      {renderXAxisLabel()}
      {renderYAxisLabel()}
    </g>
  );
}
