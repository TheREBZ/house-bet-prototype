import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import "../styles/SelectPill.css"

type Option<T extends string> = {
  value: T
  label: string
}

type SelectPillProps<T extends string> = {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  label: string // used for screen readers
  icon?: ReactNode
  className?: string
}

// A styled native <select>: custom look, but still accessible and mobile-friendly
const SelectPill = <T extends string>({
  value,
  options,
  onChange,
  label,
  icon,
  className = "",
}: SelectPillProps<T>) => (
  <div className={`select-pill ${icon ? "has-icon" : ""} ${className}`}>
    {icon && <span className="select-pill-icon">{icon}</span>}

    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      aria-label={label}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <ChevronDown size={16} className="select-pill-chevron" />
  </div>
)

export default SelectPill