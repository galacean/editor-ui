import { Toaster as HotToast, ToasterProps } from "react-hot-toast";

import { css } from "../../design-system";

const className = css({
  color: "$grayA11",

  "& > div:first-child": {
    marginRight: "$2"
    // minWidth: '$4',
    // minHeight: '$4'
  },
  "div[role=status]": {
    margin: 0
  }
})();

const containerClassName = css({
  [`& .${className}`]: {
    minHeight: "$7",
    padding: "$1_5 $2",
    borderRadius: "$3",
    border: "1px solid $gray6",
    backgroundColor: "$toasterBg",
    color: "$grayA11",
    fontSize: "$1",
    boxShadow: "0 5px 10px rgba(0,0,0,0.08)"
  }
})();

export function Toaster(props: ToasterProps) {
  const { toastOptions, containerStyle, ...rest } = props;

  return (
    <HotToast
      containerStyle={{
        inset: 38,
        ...containerStyle
      }}
      toastOptions={{
        ...toastOptions,
        className,
        success: {
          iconTheme: {
            primary: "var(--colors-green10)",
            secondary: "var(--colors-white)"
          }
        },
        error: {
          iconTheme: {
            primary: "var(--colors-red9)",
            secondary: "var(--colors-white)"
          }
        }
      }}
      containerClassName={containerClassName}
      {...rest}
    />
  );
}

export { toast } from "react-hot-toast";
