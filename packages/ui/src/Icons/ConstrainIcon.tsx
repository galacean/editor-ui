import React, { SVGProps, forwardRef, useState } from "react";

interface ConstrainIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

export const ConstrainIcon = forwardRef<SVGSVGElement, ConstrainIconProps>(function ConstrainIcon(props, forwardedRef) {
  const { active = false, ...rest } = props;
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={forwardedRef}
      {...rest}
    >
      <g>
        <path
          d="M8 5L8 3.1C7.987 1.915 7.0745 1 6 1C4.9255 1 4.0125 1.915 4 3.1L4 5L3 5L3 3.093C3.0165 1.4045 4.331 -2.04088e-07 6 -1.31134e-07C7.669 -5.81799e-08 8.9835 1.405 9 3.093L9 5L8 5ZM9 7L9 8.875C9 10.5775 7.6795 12 6 12C4.32 12 3 10.5775 3 8.875L3 7L4 7L4 8.875C4 10.072 4.918 11 6 11C7.082 11 8 10.072 8 8.875L8 7L9 7Z"
          fill="currentColor"
        />
        {active && <path d="M6.5 8.5L6.5 3.5L5.5 3.5L5.5 8.5L6.5 8.5Z" fill="currentColor" />}
      </g>
    </svg>
  );
});
