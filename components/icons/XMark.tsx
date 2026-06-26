export function XMark({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Close"
    >
      <path d="M18 6l-12 12M6 6l12 12" />
    </svg>
  )
}
