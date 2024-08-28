import { styled } from "@galacean/design-system";

const StyledTriangle = styled("div", {
  position: "relative",
  width: 0,
  height: 0,
  borderLeft: "6px solid transparent",
  borderRight: "6px solid transparent",
  borderRadius: "2px",
  borderTop: "6px solid CurrentColor",
  transformOrigin: "center",
  variants: {
    size: {
      s: {
        borderLeftWidth: "4px",
        borderRightWidth: "4px",
        borderTopWidth: "4px"
      }
    },
    direction: {
      rightbottom: {
        transform: "rotate(-45deg)"
      },
      leftbottom: {
        transform: "rotate(45deg)"
      },
      righttop: {
        transform: "rotate(135deg)"
      },
      lefttop: {
        transform: "rotate(-135deg)"
      },
      right: {
        transform: "rotate(90deg)"
      },
      left: {
        transform: "rotate(-90deg)"
      },
      top: {
        transform: "rotate(180deg)"
      },
      bottom: {
        transform: "rotate(0deg)"
      }
    }
  }
});

export { StyledTriangle as Triangle };
