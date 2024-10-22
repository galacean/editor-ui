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
      "0_5": {
        fontSize: "10px",
      },
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

const StyledTitle = styled(null, {
  // color: "$hiContrast",
  color: "$gray12",
  fontWeight: "bold",
  variants: {
    order: {
      1: {
        fontSize: "32px",
        lineHeight: 1.2
      },
      2: {
        fontSize: "28px",
        lineHeight: 1.2
      },
      3: {
        fontSize: "24px",
        lineHeight: 1.2
      },
      4: {
        fontSize: "20px",
        lineHeight: 1.2
      },
      5: {
        fontSize: "18px",
        lineHeight: 1.2
      },
      6: {
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "24px"
      },
      7: {
        fontSize: "12px"
      }
    }
  },
  defaultVariants: {
    order: 1
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
  StyledTitle as Title
};
