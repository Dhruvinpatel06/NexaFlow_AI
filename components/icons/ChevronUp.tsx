export function ChevronUp({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
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
      aria-label="Scroll to top"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}
