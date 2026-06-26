export function Cube16Solid({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      role="img"
      aria-label="Integration Modules"
    >
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2l7 3.5v7L12 20l-7-3.5v-7L12 4z" />
    </svg>
  )
}
