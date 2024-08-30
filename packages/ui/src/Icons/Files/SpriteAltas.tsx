import { SVGProps } from "react"

const SpriteAtlas = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 120"
    width={100}
    height={120}
    fill="none"
    {...props}
  >
    <path
      fill="#30A46C"
      fillRule="evenodd"
      d="m60 0 40 40v66c0 7.732-6.268 14-14 14H14c-7.732 0-14-6.268-14-14V14C0 6.268 6.268 0 14 0h46Z"
      clipRule="evenodd"
    />
    <rect width={35.25} height={32.25} x={36} y={52} fill="#8ECEAA" rx={3} />
    <path
      fill="#218358"
      fillRule="evenodd"
      d="M100 40H74.707C66.975 40 60 33.025 60 25.293V0l40 40Z"
      clipRule="evenodd"
    />
    <g filter="url(#a)">
      <path
        fill="#fff"
        d="M66.25 75.667V50.583c0-1.97-1.763-3.583-3.917-3.583H34.917C32.763 47 31 48.612 31 50.583v25.084c0 1.97 1.763 3.583 3.917 3.583h27.416c2.154 0 3.917-1.612 3.917-3.583Zm-23.696-8.995 4.113 4.533 6.07-7.148c.392-.466 1.175-.466 1.567.018l6.874 8.385a.831.831 0 0 1 .093.938.93.93 0 0 1-.362.361 1.048 1.048 0 0 1-.514.134h-23.48c-.823 0-1.274-.86-.765-1.451l4.877-5.734c.372-.465 1.116-.483 1.527-.035Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={43.25}
        height={40.25}
        x={29}
        y={46}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={2} dy={3} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_18_316" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_18_316"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default SpriteAtlas
