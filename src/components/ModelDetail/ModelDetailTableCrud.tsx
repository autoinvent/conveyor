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
  modelName: string;
  data: Record<string, any>;
  dataList: Record<string, any>[];
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
}

const ModelDetailTableCrud = ({
  id,
  className,
  parentId,
  parentModelName,
  parentField,
  modelName,
  data,
  dataList,
  fieldsData,
  editable = true,
  deletable = true,
}: ModelDetailTableCrudProps) => {
  const { primaryKey } = useContext(ConveyorContext);
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useContext(AlertsDispatchContext);

  const updateParentAction = getGQLAction(
    GQLMutationAction.MODEL_UPDATE,
    parentModelName
  );
  const updateParentDocument = getGQLDocument(
    GQLMutationAction.MODEL_UPDATE,
    parentModelName,
    primaryKey,
    ["id"]
  );
  const updateParentTrigger = useGQLMutation({
    modelName: parentModelName,
    action: updateParentAction,
    document: updateParentDocument,
    onSuccess: () => {},
  });

  const updateAction = getGQLAction(GQLMutationAction.MODEL_UPDATE, modelName);
  const updateDocument = getGQLDocument(
    GQLMutationAction.MODEL_UPDATE,
    modelName,
    primaryKey,
    ["id"]
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
            ? input[fieldName].map((model: Record<string, any>) => model.id)
            : [];
        } else {
          input[fieldName] = input[fieldName] ? input[fieldName].id : "";
        }
      }
    });
    const variables = { id: data.id, input };
    const parentVariables = { id: parentId, input: {} };
    setLoading(true);
    updateTrigger({ variables })
      .then(() => updateParentTrigger({ variables: parentVariables }))
      .finally(() => setLoading(false));
  };

  const onDelete = () => {
    const newDataList = dataList
      .map((data) => data.id)
      .filter((dataId) => dataId !== data.id);
    const input = { [parentField]: newDataList };
    const variables = { id: parentId, input };
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
