// Renders each line inside an overflow mask so GSAP can slide it up into view.
export default function Lines({ lines, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={className} data-lines>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
