import { styled } from "@galacean/design-system";

const StyledTicks = styled("text", {
  fontSize: "10px",
  fill: "$gray10",
  userSelect: "none",
  variants: {
    direction: {
      vertical: {
        textOrientation: "mixed",
        textAnchor: "end",
      },
      horizontal: {
        textAnchor: "middle",
      }
    },
  },
  defaultVariants: {
    direction: "horizontal",
  }
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
        textOrientation: "mixed",
        textAnchor: 'start',
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

interface GridProps {
  children?: React.ReactNode;
  size: {
    width: number;
    height: number;
  };
  zoom: number;
  axisLabel?: {
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

export function Grid(props: GridProps) {
  const {
    size: { width, height },
    offset,
    zoom,
    tick = { x: 10, y: 10 },
    axisLabel
  } = props;

  const xAxisLength = Math.ceil(tick.x * zoom) + 1;
  const xAxisGap = width / (tick.x * zoom);
  const yAxisLength = Math.ceil(tick.y * zoom) + 1;
  const yAxisGap = height / (tick.y * zoom);
  const labelGap = 10;

  function renderYAxis() {
    return <StyledAxis className="y-axis" x1={0} y1={offset.y} x2={0} y2={offset.y + height} strokeWidth="1" />;
  }

  function renderHorizontalGridLines() {
    return (
      <g className="grid-x-lines">
        {[...Array(yAxisLength).keys()].map((index) => {
          const gap = height / (tick.y * zoom);
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

  function renderYAxisTicks(tickXOffset = -16, tickYOffset = 0) {
    return (
      <g className="grid-y-ticks" style={{ clipPath: 'url(#clipYTicks)' }}>
        {[...Array(yAxisLength).keys()].map((index) => {
          const gap = yAxisGap;
          return (
            <StyledTicks
              className="y-axis-tick"
              key={`y-${index}`}
              x={tickXOffset}
              direction="vertical"
              y={index * gap + offset.y - (offset.y % gap) + tickYOffset}
            >
              {-(index + (offset.y > 0 ? Math.floor(offset.y / gap) : Math.ceil(offset.y / gap))) * 0.25}
            </StyledTicks>
          );
        })}
      </g>
    );
  }

  function renderYAxisLabel() {
    return (
      <StyledLabel className="y-axis" vertical x={offset.x + 10} y={-height / 2 + labelGap} textAnchor="middle" >
        {axisLabel ? axisLabel.y : "y"}
      </StyledLabel>
    );
  }


  function renderVerticalGridLines() {
    return (
      <g className="grid-y-lines">
        {[...Array(yAxisLength).keys()].map((index) => {
          const gap = width / (tick.x * zoom);
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

  function renderXAxisTicks(tickXOffset = -10, tickYOffset = 100) {
    return (
      <g className="grid-x-ticks" style={{ clipPath: 'url(#clipXTicks)' }}>
        {[...Array(xAxisLength).keys()].map((index) => {
          const gap = xAxisGap
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
      <StyledLabel className="x-axis-label" x={offset.x + width / 2} y={offset.y + height - labelGap}>
        {axisLabel ? axisLabel.x : "x"}
      </StyledLabel>
    );
  }

  return (
    <>
      <defs>
        <clipPath id="clipGrid">
          <rect x={offset.x} y={offset.y} width={width} height={height} />
        </clipPath>
        <clipPath id="clipXTicks">
          <rect x={offset.x - 5} y={offset.y + height} width={width + 20} height={16} />
        </clipPath>
        <clipPath id="clipYTicks">
          <rect x={offset.x - 40} y={offset.y} width={40} height={height} />
        </clipPath>
      </defs>
      <g className="bezier-curve-grid" height={height} width={width} style={{ clipPath: 'url(#clipGrid)', overflow: 'hidden' }}>
        {renderHorizontalGridLines()}
        {renderVerticalGridLines()}
        {renderXAxis()}
        {renderYAxis()}
        {renderXAxisLabel()}
        {renderYAxisLabel()}
        {props.children}
      </g>
      {renderYAxisTicks(offset.x - 12, 4)}
      {renderXAxisTicks(0, height + offset.y + 16)}
    </>
  );
}
