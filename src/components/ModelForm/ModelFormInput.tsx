import { memo, FC, useMemo, useContext } from "react";
import { Controller } from "react-hook-form";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { LoadingContext } from "../../contexts/commons/LoadingContext";
import { ErrorMessage } from "../../enums";
import { useGQLQuery, GQLQueryAction } from "../../hooks/useGQLQuery";
import { PACKAGE_ABBR } from "../../package";
import { BaseProps, FieldData } from "../../types";
import { humanizeText } from "../../utils/common";
import {
  gqlTypeToFlexType,
  getGQLAction,
  getGQLDocument,
  getAvailableKeys,
} from "../../utils/gqlRequest";
import FlexibleInput, { InputTypes } from "../commons/FlexibleInput";

interface ModelFormProps extends BaseProps {
  field: string;
  fieldData?: FieldData;
}

const ModelFormInput = ({
  id,
  className,
  field,
  fieldData,
}: ModelFormProps) => {
  const { primaryKey, secondaryKeys } = useContext(ConveyorContext);
  const { loading } = useContext(LoadingContext);
  let type = gqlTypeToFlexType(fieldData?.type ?? "String");
  const related = fieldData?.related;
  let inputProps: Record<string, any> = {};
  // Related property expected to be static for react-hooks to work
  // properly, create custom ModelFormInput if dynamic related prop is
  // expected
  if (related) {
    type = InputTypes.SELECT;
    const relatedFields = related.fields ?? [];
    const actionType = GQLQueryAction.MODEL_LIST;
    const action = getGQLAction(actionType, related.modelName);
    const document = getGQLDocument(
      actionType,
      related.modelName,
      primaryKey,
      relatedFields,
      related.fieldsData
    );
    const { data } = useGQLQuery({ action, document });
    const options = useMemo(
      () => data?.[action]?.items,
      [JSON.stringify(data)]
    );
    const keyFallbacks = [primaryKey].concat(secondaryKeys ?? []);
    const availableKeys = getAvailableKeys(relatedFields, keyFallbacks);
    const getOptionLabel = (option: Record<string, any>) =>
      option[availableKeys.at(1) ?? primaryKey];
    const getOptionValue = (option: Record<string, any>) => option[primaryKey];
    inputProps = {
      options,
      isMulti: related.many,
      getOptionLabel,
      getOptionValue,
      ...inputProps,
    };
  }

  return (
    <Controller
      name={field}
      rules={{
        required: fieldData?.required
          ? `${humanizeText(field)} ${ErrorMessage.REQUIRED_FIELD}`
          : false,
      }}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        const props = {
          ...inputProps,
          ...field,
        };

        return (
          <FlexibleInput
            key={`${PACKAGE_ABBR}-form-input-${field}`}
            id={id}
            className={className}
            type={type}
            disabled={loading}
            inputProps={props}
            errors={error}
          />
        );
      }}
    />
  );
};

export default memo(ModelFormInput) as FC<ModelFormProps>;
