export function LinkSolid({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      role="img"
      aria-label="Platform Connections"
    >
      <path d="M10 6a6 6 0 0 0-7.999 5.5A6 6 0 0 0 10 17h4a6 6 0 1 0 0-12h-4zm7.75 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  )
}
