import { useContext, useMemo } from "react";

import { InputTypes } from "../components/commons/FlexibleInput";
import { LoadingContext } from "../contexts/commons/LoadingContext";
import useGQLQuery, { GQLQueryAction } from "./useGQLQuery";
import { FieldData } from "../types";

import { generateGQLAction, generateGQLDocument } from "../utils/gqlRequest";

export interface UseInputProps {
  fieldData?: FieldData;
}

const useInputProps = ({ fieldData }: UseInputProps) => {
  const { loading } = useContext(LoadingContext);
  const type = fieldData?.related ? InputTypes.SELECT : InputTypes.TEXT;
  const fieldModelName = fieldData?.related?.modelName ?? "";
  const relatedFields = fieldData?.related?.fields;
  const relatedFieldsData = fieldData?.related?.fieldsData;
  const action = generateGQLAction(GQLQueryAction.MODEL_LIST, fieldModelName);
  let document = generateGQLDocument(
    GQLQueryAction.MODEL_LIST,
    fieldModelName,
    relatedFields,
    relatedFieldsData
  );
  if (!fieldData?.related) {
    document = "{ __typename }";
  }
  const { data } = useGQLQuery({ action, document });
  return useMemo(() => {
    const inputProps = { type } as Record<string, any>;
    switch (type as InputTypes) {
      case InputTypes.CREATABLE_SELECT:
        inputProps.classNamePrefix = "select";
        break;
      case InputTypes.SELECT: {
        inputProps.isDisabled = loading;
        inputProps.className = "basic-single";
        inputProps.classNamePrefix = "select";
        inputProps.isMulti = fieldData?.related?.many;
        inputProps.getOptionLabel = (data: Record<string, any>) =>
          data?.name ?? data?.id;
        inputProps.getOptionValue = (data: Record<string, any>) => data?.id;
        inputProps.options = data?.[action]?.result?.map((option: any) => ({
          name: option?.name,
          id: option?.id,
        }));
        break;
      }
      default: {
        inputProps.className = "form-control";
        inputProps.disabled = loading;
      }
    }
    return inputProps;
  }, [JSON.stringify(fieldData), JSON.stringify(data), loading]);
};

export default useInputProps;
