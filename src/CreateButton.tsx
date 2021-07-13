import React from 'react'
import { Link } from 'react-router-dom'

/**
 * React Component for Create Button
 * @param onClick
 * @param to
 * @return Rendered React Component
 */
type CreateButtonProps = { onClick: any; to: string; replaceEntry: boolean }
const CreateButton = ({ onClick, to, replaceEntry }: CreateButtonProps) => (
  <Link
    to={`/Create/${to}`}
    onClick={onClick}
    className="conv-create-button"
    role="button"
    replace={replaceEntry}
  >
    Create
  </Link>
)

export default CreateButton
