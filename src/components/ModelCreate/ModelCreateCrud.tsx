import { useContext } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { LoadingContext } from "../../contexts/commons/LoadingContext";
import { useGQLMutation, GQLMutationAction } from "../../hooks/useGQLMutation";
import { BaseProps, FieldData } from "../../types";
import { getGQLAction, getGQLDocument } from "../../utils/gqlRequest";
import ModelFormCrud from "../ModelForm/ModelFormCrud";

interface ModelCreateCrudProps extends BaseProps {
  modelName: string;
  fields: string[];
  fieldsData?: Record<string, FieldData>;
}

const ModelCreateCrud = ({
  id,
  className,
  modelName,
  fields,
  fieldsData,
}: ModelCreateCrudProps) => {
  const { setLoading } = useContext(LoadingContext);
  const { navigate, primaryKey } = useContext(ConveyorContext);

  const createActionType = GQLMutationAction.MODEL_CREATE;
  const createAction = getGQLAction(createActionType, modelName);
  const createDocument = getGQLDocument(
    createActionType,
    modelName,
    primaryKey,
    fields,
    fieldsData
  );
  const createTrigger = useGQLMutation({
    modelName,
    action: createAction,
    document: createDocument,
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
    setLoading(true);
    createTrigger({ variables: input })
      .then(() => navigate({ modelName }))
      .catch(() => setLoading(false));
  };
  const onCancel = () => {
    navigate({ modelName });
  };
  return (
    <ModelFormCrud
      id={id}
      className={className}
      onSave={onSave}
      onCancel={onCancel}
      editable={true}
    />
  );
};

export default ModelCreateCrud;
