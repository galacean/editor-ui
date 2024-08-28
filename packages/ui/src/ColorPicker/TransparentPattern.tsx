import { forwardRef } from "react";

export const TransparentPattern = forwardRef<SVGSVGElement,React.SVGProps<SVGSVGElement>>(
  function TransparentPattern(props, forwardedRef) {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
        <defs>
          <pattern id="transparentPattern" patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill="#ccc" />
            <rect width="5" height="5" fill="#fff" />
            <rect x="5" y="5" width="5" height="5" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#transparentPattern)" />
      </svg>
    );
  }
)