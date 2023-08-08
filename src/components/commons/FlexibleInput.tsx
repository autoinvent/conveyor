import Select from "react-select";

import { BaseProps } from "../../types";

import ErrorList from "./ErrorList";

export enum InputTypes {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "checkbox",
  SELECT = "select",
  DATETIME = "date_time",
}
export interface FlexibleInputProps extends BaseProps {
  type: InputTypes;
  disabled?: boolean;
  inputProps?: Record<string, any>;
  errors?: string | string[];
}

const FlexibleInput = ({
  id,
  className,
  type,
  disabled,
  inputProps = {},
  errors,
}: FlexibleInputProps) => {
  let inputTag;
  switch (type) {
    case InputTypes.SELECT:
      inputTag = (
        <Select
          id={id}
          className={className ?? "basic-single"}
          classNamePrefix="select"
          isDisabled={disabled}
          {...inputProps}
        />
      );
      break;
    default:
      inputTag = (
        <input
          id={id}
          className={className ?? "form-control"}
          type={type}
          {...inputProps}
          disabled={disabled}
        />
      );
  }

  return (
    <>
      {inputTag}
      <ErrorList errors={errors} />
    </>
  );
};

export default FlexibleInput;
