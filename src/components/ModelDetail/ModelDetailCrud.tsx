import { useContext, FC, memo } from 'react';

import { ConveyorContext } from '../../contexts/ConveyorContext';
import { LoadingContext } from '../../contexts/commons/LoadingContext';
import { useGQLMutation, GQLMutationAction } from '../../hooks/useGQLMutation';
import { BaseProps, FieldData } from '../../types';
import { getGQLAction, getGQLDocument } from '../../utils/gqlRequest';
import ModelFormCrud from '../ModelForm/ModelFormCrud';

interface ModelDetailCrudProps extends BaseProps {
  modelName: string;
  data: Record<string, any>;
  fields: string[];
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
}

const ModelDetailCrud = ({
  id,
  className,
  modelName,
  data,
  fields,
  fieldsData,
  editable = true,
  deletable = true,
}: ModelDetailCrudProps) => {
  const { setLoading } = useContext(LoadingContext);
  const { navigate, primaryKey } = useContext(ConveyorContext);

  const updateActionType = GQLMutationAction.MODEL_UPDATE;
  const updateAction = getGQLAction(updateActionType, modelName);
  const updateDocument = getGQLDocument(
    updateActionType,
    modelName,
    primaryKey,
    fields,
    fieldsData,
  );
  const updateTrigger = useGQLMutation({
    modelName,
    action: updateAction,
    document: updateDocument,
  });

  const deleteActionType = GQLMutationAction.MODEL_DELETE;
  const deleteAction = getGQLAction(deleteActionType, modelName);
  const deleteDocument = getGQLDocument(
    deleteActionType,
    modelName,
    primaryKey,
    [primaryKey],
    fieldsData,
  );
  const deleteTrigger = useGQLMutation({
    modelName,
    action: deleteAction,
    document: deleteDocument,
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
                (model: Record<string, any>) => model[primaryKey],
              )
            : [];
        } else {
          input[fieldName] = input[fieldName]
            ? input[fieldName][primaryKey]
            : '';
        }
      }
    });
    const variables = { [primaryKey]: data[primaryKey], ...input };
    setLoading(true);
    updateTrigger({ variables }).finally(() => setLoading(false));
  };
  const onDelete = () => {
    const variables = { [primaryKey]: data[primaryKey] };
    setLoading(true);
    deleteTrigger({ variables })
      .then(() => navigate({ modelName }))
      .catch(() => setLoading(false));
  };
  return (
    <ModelFormCrud
      id={id}
      className={className}
      onSave={onSave}
      onDelete={onDelete}
      editable={editable}
      deletable={deletable}
    />
  );
};

export default memo(ModelDetailCrud) as FC<ModelDetailCrudProps>;
