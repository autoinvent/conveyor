import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";

import { PACKAGE_ABBR } from "../../package";
import { BaseProps } from "../../types";

interface CheckboxProps extends BaseProps {
  value?: boolean;
  disabled?: boolean;
  onChange?: (event: any) => void;
}

const Checkbox = ({
  id,
  className = "",
  value,
  disabled,
  onChange = () => {},
}: CheckboxProps) => {
  return (
    <button
      id={id}
      className={`${PACKAGE_ABBR}-checkbox ${className}`}
      onClick={() => onChange(!value)}
      disabled={disabled}
    >
      {value ? <FaRegCheckSquare /> : <FaRegSquare />}
    </button>
  );
};

export default Checkbox;
