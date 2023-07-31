import { PACKAGE_ABBR } from '../../package'

interface ErrorListProps {
  errors?: string | string[]
}
const ErrorList = ({ errors }: ErrorListProps) => {
  const errorList = Array.isArray(errors) ? errors : [errors]

  return errors ? (
    <ul className="text-danger">
      {errorList?.map((error, index) => (
        <li key={`${PACKAGE_ABBR}-errorlist-${index}`}>{error}</li>
      ))}
    </ul>
  ) : null
}

export default ErrorList
