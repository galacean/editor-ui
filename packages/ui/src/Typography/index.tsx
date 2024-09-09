import { styled } from "../../design-system";

const StyledText = styled("p", {
  lineHeight: 1.5,
  fontFamily: "$untitled",
  cursor: "default",
  variants: {
    code: {
      true: {
        fontFamily: "$mona"
      }
    },
    selectable: {
      true: {
        userSelect: "auto"
      },
      false: {
        userSelect: "none"
      }
    },
    size: {
      1: {
        fontSize: "$1",
        lineHeight: "$1",
        letterSpacing: "$1"
      },
      2: {
        fontSize: "$2",
        lineHeight: "$2",
        letterSpacing: "$2"
      },
      3: {
        fontSize: "$3",
        lineHeight: "$3",
        letterSpacing: "$3"
      },
      4: {
        fontSize: "$4",
        lineHeight: "$4",
        letterSpacing: "$4"
      },
      sm: {
        fontSize: "$1",
        lineHeight: "$1",
        letterSpacing: "$1"
      }
    },
    align: {
      center: {
        textAlign: "center"
      }
    },
    secondary: {
      true: {
        color: "$gray11"
      }
    },
    deleted: {
      true: {
        textDecoration: "line-through"
      }
    },
    ellipsis: {
      true: {
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    },
    primary: {
      true: {
        color: "$grayA12"
      }
    },
    error: {
      true: {
        color: "$red9"
      }
    }
  },
  defaultVariants: {
    size: "md",
    selectable: false
  }
});

const StyledBold = styled("strong", {
  fontWeight: "bold",
  color: "$gray12",
  variants: {
    variant: {
      subtle: {
        color: "$grayA11"
      }
    }
  }
});

const StyledLink = styled("a", {
  color: "$gray12",
  textDecoration: "underline",
  textDecorationColor: "$grayA4",
  textUnderlineOffset: "4px",
  cursor: "pointer"
});

export {
  StyledText as Text,
  StyledBold as Bold,
  StyledLink as Link,
};
