import Lines from './Lines.jsx'

// Consistent section header: eyebrow + big title on the left, supporting text on the right.
export default function SectionHead({ index, label, lines, aside }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">
          <b>{index}</b> {label}
        </span>
        <Lines className="section-title" lines={lines} />
      </div>
      {aside && (
        <p className="aside" data-reveal>
          {aside}
        </p>
      )}
    </div>
  )
}
