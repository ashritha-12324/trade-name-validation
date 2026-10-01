import { useRef } from 'react'
import { Upload, CheckCircle2 } from 'lucide-react'

export default function UploadField({ label, file, onFileChange, accept = '*' }) {
  const inputRef = useRef()

  const handleClick = () => inputRef.current?.click()

  const handleChange = (e) => {
    const f = e.target.files?.[0]
    if (f) onFileChange(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) onFileChange(f)
  }

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div
        className={`upload-field ${file ? 'has-file' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        title={file ? file.name : 'Click or drag to upload'}
      >
        <span className="upload-field-label">
          {file ? file.name : 'Upload from device or Drag'}
        </span>
        <span className="upload-field-icon">
          {file ? <CheckCircle2 size={18} /> : <Upload size={18} />}
        </span>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="upload-hidden"
        accept={accept}
        onChange={handleChange}
      />
    </div>
  )
}
