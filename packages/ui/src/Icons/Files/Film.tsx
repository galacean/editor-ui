import { SVGProps, forwardRef } from "react"

const IconAnimatorClipFile = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, forwardedRef) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={120}
    viewBox="0 0 100 120"
    fill="none"
    {...props}
    ref={forwardedRef}
  >
    <path
      fill="#6E56CF"
      fillRule="evenodd"
      d="m60 0 40 40v66c0 7.732-6.268 14-14 14H14c-7.732 0-14-6.268-14-14V14C0 6.268 6.268 0 14 0h46Z"
      clipRule="evenodd"
    />
    <mask
      id="a"
      width={100}
      height={120}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="m60 0 40 40v66c0 7.732-6.268 14-14 14H14c-7.732 0-14-6.268-14-14V14C0 6.268 6.268 0 14 0h46Z"
        clipRule="evenodd"
      />
    </mask>
    <path
      fill="#6550B9"
      fillRule="evenodd"
      d="M100 40H74.707C66.975 40 60 33.025 60 25.293V0l40 40Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      d="M66.02 77.178 54.635 54.924c-1.483-2.897-5.62-2.906-7.115-.015L36.017 77.163C34.64 79.826 36.573 83 39.57 83h22.89c2.99 0 4.923-3.16 3.56-5.822Z"
    />
    <mask
      id="b"
      width={47}
      height={45}
      x={2}
      y={46}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#6550B9" d="m2 46 23.382 45L49 46H2Z" />
    </mask>
    <g fill="#6550B9" mask="url(#b)">
      <rect width={40} height={5} x={27} y={53} rx={2.5} />
      <rect width={40} height={5} x={26} y={61} rx={2.5} />
      <rect width={40} height={5} x={26} y={69} rx={2.5} />
    </g>
  </svg>
))

export default IconAnimatorClipFile
