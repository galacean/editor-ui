import { SVGProps } from "react"
const IconSceneFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 120"
    width={100}
    height={120}
    fill="none"
    {...props}
  >
    <path
      fill="#82827C"
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
      fill="#63635E"
      fillRule="evenodd"
      d="M100 40H74.707C66.975 40 60 33.025 60 25.293V0l40 40Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M56.918 52h-3.759l-3.614 7.273h-6.014L47.145 52h-3.759l-3.613 7.273h-6.014L37.373 52H34a4 4 0 0 0-4 4v22a4 4 0 0 0 4 4h31.09a4 4 0 0 0 4-4V56a4 4 0 0 0-4-4h-2.158l-3.614 7.273h-6.014L56.918 52Z"
      clipRule="evenodd"
    />
  </svg>
)
export default IconSceneFile
