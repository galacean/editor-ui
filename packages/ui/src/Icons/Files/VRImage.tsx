import { SVGProps } from "react"
const IconVrReferenceImageFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 120"
    width={100}
    height={120}
    fill="none"
    {...props}
  >
    <path
      fill="#00A2C7"
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
      fill="#107D98"
      fillRule="evenodd"
      d="M100 40H74.707C66.975 40 60 33.025 60 25.293V0l40 40Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      d="M67.4 51.177c-4 1.397-9.6 2.794-17.4 2.794-7.8 0-13.8-1.596-17.4-2.794-1.2-.599-2.6.4-2.6 1.797v27.941c0 1.398 1.4 2.395 2.6 1.996 4.2-1.397 9.6-2.993 17.4-2.993 7.8 0 13.4 1.596 17.4 2.993 1.4.4 2.6-.598 2.6-1.996V52.973c0-1.397-1.4-2.395-2.6-1.796ZM50 72.932c-4.6 0-9 .2-13 .798l7.4-8.781 4 4.79 5.6-6.786 9 10.777c-4-.598-8.4-.798-13-.798Z"
    />
  </svg>
)
export default IconVrReferenceImageFile
