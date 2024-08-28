import { styled } from '@galacean/design-system'
import { keyframes } from '@galacean/design-system/keyframes'

const Spin = styled("div", {
  $$borderSize: "2px",
  position: "relative",
  height: "$3",
  width: "$3",
  border: "$$borderSize solid $grayA6",
  borderRadius: "$round",
  animation: `${keyframes.infinateRotateAnmi} 0.8s linear infinite`,
  transformOrigin: "center",
  boxSizing: "border-box",
  "&::after": {
    content: " ",
    display: "block",
    position: "absolute",
    inset: "-$$borderSize",
    borderRadius: "$round",
    border: "$$borderSize solid $gray12",
    borderColor: "transparent transparent transparent white",
    boxSizing: "border-box"
  },
  variants: {
    size: {
      xs: {
        height: "$3",
        width: "$3"
      },
      sm: {
        height: "$4",
        width: "$4"
      },
      md: {
        height: "$5",
        width: "$5"
      },
    },
    color: {
      primary: {
        "&::after": {
          borderColor: "transparent transparent transparent $blueA11"
        }
      },
      default: {
        "&::after": {
          borderColor: "transparent transparent transparent $white"
        }
      }
    }
  },
  defaultVariants: {
    size: "md",
    color: "primary"
  }
});

export { Spin };
