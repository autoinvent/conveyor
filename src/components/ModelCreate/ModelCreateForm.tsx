import { useState, ReactNode } from "react";
import { useForm } from "react-hook-form";

import { DisplayMode } from "../../contexts/commons/DisplayModeContext";
import { Defaults } from "../../enums";
import { BaseProps } from "../../types";
import ModelForm from "../ModelForm/ModelForm";

interface ModelCreateFormProps extends BaseProps {
  fields: string[];
  children?: ReactNode;
}

const ModelCreateForm = ({
  id,
  className,
  fields,
  children,
}: ModelCreateFormProps) => {
  const [loading] = useState(false);
  const values = fields.reduce((currValues, fieldName) => {
    currValues[fieldName] = "";
    return currValues;
  }, {} as Record<string, any>);

  const formMethods = useForm({ values, mode: Defaults.RHK_MODE });
  return (
    <ModelForm
      formMethods={formMethods}
      mode={DisplayMode.EDIT}
      loading={loading}
    >
      <form id={id} className={className}>
        {children}
      </form>
    </ModelForm>
  );
};

export default ModelCreateForm;
