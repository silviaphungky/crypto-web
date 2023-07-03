interface Props {
  color?: string
}

const IconChevronDown = ({ color }: Props) => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.298213 0.298014C0.69583 -0.0993381 1.33813 -0.0993381 1.73575 0.298014L4.9949 3.53183L8.26425 0.308202C8.66187 -0.08915 9.30417 -0.08915 9.70179 0.308202C10.0994 0.705554 10.0994 1.34743 9.70179 1.74478L5.71877 5.70199C5.32115 6.09934 4.67885 6.09934 4.28123 5.70199L0.298213 1.73459C-0.0994042 1.33724 -0.0994042 0.695366 0.298213 0.298014Z"
        fill={color || '#929396'}
        opacity="1"
      ></path>
    </svg>
  )
}

export default IconChevronDown
