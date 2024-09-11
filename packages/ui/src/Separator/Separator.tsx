import * as PrimitiveSeparator from '@radix-ui/react-separator';
import { CSS, styled, VariantProps } from '../../design-system';

const StyledCrosslineText = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  userSelect: "none",
  "&::before": {
    borderBottom: "1px solid $grayA7",
    content: "",
    flex: "1 0 0",
    transform: "translateY(-0.5px)"
  },
  "&::after": {
    borderBottom: "1px solid $grayA7",
    content: "",
    flex: "1 0 0",
    transform: "translateY(-0.5px)"
  },
  "& > div": {
    maxWidth: "calc(100% - 60px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "$gray11",
    fontSize: "$sm",
    flex: "0 1 auto",
    margin: "0 $4"
  }
});

const StyledSeparator = styled(PrimitiveSeparator.Root, {
  backgroundColor: '$grayA5',
  variants: {
    direction: {
      horizontal: {
        height: 1,
        width: '100%',
        margin: '$2 0',
      },
      vertical: {
        height: '100%',
        width: 1,
        margin: '0 $2',
      },
    },
    raw: {
      true: {
        // display: "block",
        display: "none",
        height: "1px",
        width: "100%",
        margin: 0,
        backgroundColor: "$appBg",
        "& + &": {
          display: "none"
        }
      }
    }
  },
  '&[data-orientation=horizontal]': {
    height: 1,
    width: '100%',
    margin: '$2 0',
  },
  '&[data-orientation=vertical]': {
    height: '100%',
    width: 1,
    margin: '0 $2',
  },
  defaultVariants: {
    direction: 'horizontal',
  }
});

export interface SeparatorProps {
  text?: string;
  css?: CSS;
  direction?: 'horizontal' | 'vertical';
  raw?: boolean;
};


function Separator(props: SeparatorProps) {
  const { text, ...rest } = props;

  if (text) {
    return (
      <StyledCrosslineText {...rest}>
        <div>{text}</div>
      </StyledCrosslineText>
    );
  }

  return <StyledSeparator {...rest} />;
}


export { Separator };