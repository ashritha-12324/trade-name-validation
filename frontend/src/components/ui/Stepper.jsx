export default function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {steps.map((step, i) => {
        const isDone = i < current
        const isActive = i === current
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div className={`step ${isDone ? 'done' : isActive ? 'active' : ''}`}>
              <div className="step-number">
                {isDone ? '✓' : i + 1}
              </div>
              <span className="step-label">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`step-connector ${isDone ? 'done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
