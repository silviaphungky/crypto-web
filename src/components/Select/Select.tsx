import React, { ChangeEvent } from 'react'

interface Option {
  label: string
  value: string
}

interface SelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      className=" outline-0 rounded-md border-gray-200 border-1 p-1.5 "
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
