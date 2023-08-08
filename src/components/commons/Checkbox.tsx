import { Ref } from "react";
import { Button } from "react-bootstrap";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";

import { BaseProps } from "../../types";

interface CheckboxProps extends BaseProps {
  value?: boolean;
  disabled?: boolean;
  onChange?: (event: any) => void;
}

const Checkbox = ({
  id,
  className,
  value,
  disabled,
  onChange = () => {},
}: CheckboxProps) => {
  return (
    <Button
      id={id}
      className={className}
      onClick={() => onChange(!value)}
      disabled={disabled}
    >
      {value ? <FaRegCheckSquare /> : <FaRegSquare />}
    </Button>
  );
};

export default Checkbox;
