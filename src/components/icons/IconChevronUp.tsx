interface Props {
  color?: string
}

const IconChevronUp = ({ color }: Props) => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color || '#929396'}
      opacity="1"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.71877 0.298014L9.70179 4.25522C10.0994 4.65257 10.0994 5.29445 9.70179 5.6918C9.30417 6.08915 8.66187 6.08915 8.26425 5.6918L4.9949 2.46817L1.73575 5.70199C1.33813 6.09934 0.69583 6.09934 0.298213 5.70199C-0.0994042 5.30463 -0.0994042 4.66276 0.298213 4.2654L4.28123 0.298014C4.67885 -0.0993381 5.32115 -0.0993381 5.71877 0.298014Z"
        fill={color || '#929396'}
        opacity="1"
      ></path>
    </svg>
  )
}

export default IconChevronUp
