import { CheckCircle2, Pencil, AlertCircle } from 'lucide-react'

/**
 * status: 'idle' | 'auto_filled' | 'needs_review' | 'not_found' | 'verified'
 */
export default function InputField({
  label,
  value,
  onChange,
  status = 'idle',
  placeholder = '',
  readOnly = false,
  type = 'text',
}) {
  const statusClass =
    status === 'auto_filled' || status === 'verified'
      ? 'status-auto'
      : status === 'needs_review'
      ? 'status-review'
      : ''

  const icon =
    status === 'verified' ? (
      <CheckCircle2 size={17} className="icon-check" />
    ) : status === 'auto_filled' ? (
      <Pencil size={15} className="icon-edit" />
    ) : status === 'needs_review' ? (
      <AlertCircle size={16} className="icon-review" />
    ) : null

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="input-wrapper">
        <input
          type={type}
          className={`input-field ${statusClass}`}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {icon && <div className="input-icon">{icon}</div>}
      </div>
    </div>
  )
}
