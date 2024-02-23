import { PACKAGE_ABBR } from '../../package';
import { BaseProps } from '../../types';

interface ErrorListProps extends BaseProps {
  errors?: string | string[];
}
const ErrorList = ({ id, className = '', errors }: ErrorListProps) => {
  const errorList = Array.isArray(errors) ? errors : [errors];

  return errors ? (
    <ul id={id} className={`text-danger ${className}`}>
      {errorList?.map((error, index) => (
        <li key={`${PACKAGE_ABBR}-errorlist-${index}`}>{error}</li>
      ))}
    </ul>
  ) : null;
};

export default ErrorList;
