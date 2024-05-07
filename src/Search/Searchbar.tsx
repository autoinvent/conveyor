import { ComponentProps, useState } from "react"
import { FaSearch } from "react-icons/fa"

export interface SearchBarProps extends ComponentProps<'form'> {
  onSearch: (value: string) => void
}

export const SearchBar = ({ onSearch, ...props }: SearchBarProps) => {
  const [value, setValue] = useState("")
  return (
    <form onSubmit={(e) => {
      e.stopPropagation();
      e.preventDefault();
      onSearch(value)
    }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit"><FaSearch /></button>
    </form>
  )
}