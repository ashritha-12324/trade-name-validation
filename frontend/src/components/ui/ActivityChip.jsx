import { X } from 'lucide-react'

export default function ActivityChip({ label, onRemove }) {
  return (
    <div className="activity-chip">
      <span>{label}</span>
      {onRemove && (
        <span className="chip-remove" onClick={onRemove}>
          <X size={12} />
        </span>
      )}
    </div>
  )
}
