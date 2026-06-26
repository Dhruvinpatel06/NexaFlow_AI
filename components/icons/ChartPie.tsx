export function ChartPie({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
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
      aria-label="Data Insights"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <line x1="22" y1="12" x2="12" y2="12" />
    </svg>
  )
}
