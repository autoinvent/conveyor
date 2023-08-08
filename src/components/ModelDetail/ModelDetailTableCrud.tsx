import { useContext, FC, memo } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { AlertsDispatchContext } from "../../contexts/AlertsContext";
import { LoadingContext } from "../../contexts/commons/LoadingContext";
import { SuccessMessage } from "../../enums";
import { useGQLMutation, GQLMutationAction } from "../../hooks/useGQLMutation";
import {
  AlertsAction,
  DEFAULT_SUCCESS_EXPIRE,
} from "../../reducers/alertsReducer";
import { BaseProps, FieldData } from "../../types";
import { getGQLAction, getGQLDocument } from "../../utils/gqlRequest";
import ModelFormCrud from "../ModelForm/ModelFormCrud";

interface ModelDetailTableCrudProps extends BaseProps {
  parentId: string;
  parentModelName: string;
  parentField: string;
  parentFields: string[];
  parentFieldsData: Record<string, FieldData>;
  parentData: Record<string, any>;
  data: Record<string, any>;
  editable?: boolean;
  deletable?: boolean;
}

const ModelDetailTableCrud = ({
  id,
  className,
  parentId,
  parentModelName,
  parentField,
  parentFields,
  parentFieldsData,
  parentData,
  data,
  editable = true,
  deletable = true,
}: ModelDetailTableCrudProps) => {
  const related = parentFieldsData[parentField].related;
  if (!related) return null;

  const { modelName, fields = [], fieldsData } = related;
  const dataList: Record<string, any>[] = parentData[parentField];
  const { primaryKey } = useContext(ConveyorContext);
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useContext(AlertsDispatchContext);

  const updateActionType = GQLMutationAction.MODEL_UPDATE;
  const updateParentAction = getGQLAction(updateActionType, parentModelName);
  const updateParentDocument = getGQLDocument(
    updateActionType,
    parentModelName,
    primaryKey,
    [primaryKey, parentField],
    parentFieldsData
  );
  const updateParentTrigger = useGQLMutation({
    modelName,
    action: updateParentAction,
    document: updateParentDocument,
    onSuccess: () => {},
  });

  const updateAction = getGQLAction(updateActionType, modelName);
  const updateDocument = getGQLDocument(
    updateActionType,
    modelName,
    primaryKey,
    fields,
    fieldsData
  );
  const updateTrigger = useGQLMutation({
    modelName,
    action: updateAction,
    document: updateDocument,
  });

  const onSave = (formValues: Record<string, any>) => {
    const input = {} as Record<string, any>;
    Object.keys(formValues).forEach((fieldName) => {
      input[fieldName] = formValues[fieldName];
      const related = fieldsData?.[fieldName]?.related;
      if (related) {
        if (related?.many) {
          input[fieldName] = input[fieldName]
            ? input[fieldName].map(
                (model: Record<string, any>) => model[primaryKey]
              )
            : [];
        } else {
          input[fieldName] = input[fieldName]
            ? input[fieldName][primaryKey]
            : "";
        }
      }
    });
    const variables = { [primaryKey]: data[primaryKey], ...input };
    const parentVariables = { id: parentId };
    setLoading(true);
    updateTrigger({ variables })
      .then(() => updateParentTrigger({ variables: parentVariables }))
      .finally(() => setLoading(false));
  };

  const onDelete = () => {
    const newDataList = dataList
      .map((data) => data[primaryKey])
      .filter((primaryVal) => primaryVal !== data[primaryKey]);
    const input = { [parentField]: newDataList };
    const variables = { id: parentId, ...input };
    setLoading(true);
    updateParentTrigger({ variables })
      .then(() => {
        dispatch({
          type: AlertsAction.ADD_ALERT,
          payload: {
            type: "success",
            message: `${modelName} ${SuccessMessage.MODEL_DELETE}`,
            expires: Date.now() + DEFAULT_SUCCESS_EXPIRE,
          },
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <ModelFormCrud
      id={id}
      className={className}
      onSave={onSave}
      onDelete={onDelete}
      editable={editable}
      deletable={deletable}
      icons={true}
    />
  );
};

export default memo(ModelDetailTableCrud) as FC<ModelDetailTableCrudProps>;
