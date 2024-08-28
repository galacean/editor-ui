import * as React from "react";

export const IconRightBottomCorner = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function IconRightBottomCorner(props, ref) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" {...props} ref={ref}>
        <path fill="currentColor" d="M16 16H0L16 0z" />
      </svg>
    );
  }
);
