import { FC, memo, useMemo, ReactNode } from "react";
import { useForm } from "react-hook-form";

import { Defaults, ErrorMessage } from "../../enums";
import useGQLQuery, { GQLQueryAction } from "../../hooks/useGQLQuery";
import { PACKAGE_ABBR } from "../../package";
import { BaseProps, FieldData } from "../../types";
import { generateGQLAction, generateGQLDocument } from "../../utils/gqlRequest";
import { humanizeText } from "../../utils/common";
import ModelForm from "../ModelForm/ModelForm";

import ModelDetailTitle from "./ModelDetailTitle";
import ModelDetailFields from "./ModelDetailFields";
import ModelDetailCrud from "./ModelDetailCrud";
import ModelDetailTable from "./ModelDetailTable";

interface ModelDetailProps extends BaseProps {
  modelName: string;
  modelId: string;
  fields: string[];
  title?: string;
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
  children?: ReactNode;
}

const ModelDetail = ({
  id,
  className,
  modelName,
  modelId,
  fields,
  title = humanizeText(modelName),
  fieldsData,
  editable = true,
  deletable = true,
  children,
}: ModelDetailProps) => {
  const action = generateGQLAction(GQLQueryAction.MODEL_ITEM, modelName);
  const document = generateGQLDocument(
    GQLQueryAction.MODEL_ITEM,
    modelName,
    fields,
    fieldsData
  );
  const { data, error } = useGQLQuery({
    action,
    document,
    variables: { id: modelId },
  });

  const modelData = useMemo(
    () => data?.[action]?.result,
    [JSON.stringify(data?.[action]?.result)]
  );

  const values = useMemo(
    () =>
      fields.reduce((currValues, fieldName) => {
        if (!fieldsData?.[fieldName]?.related?.many) {
          currValues[fieldName] = modelData?.[fieldName] ?? "";
        }
        return currValues;
      }, {} as Record<string, any>),
    [fields, JSON.stringify(modelData)]
  );

  const formMethods = useForm({ values, mode: Defaults.RHK_MODE });

  const modelIdentifier =
    modelData?.name ?? modelData?.id ?? ErrorMessage.INV_MODEL_ID;

  const loading = Object.values(Object.assign(data, error)).length === 0;
  return (
    <div id={id} className={className}>
      {loading ? (
        "Loading..."
      ) : children ?? modelData ? (
        <>
          <ModelForm formMethods={formMethods}>
            <div className="mb-3">
              <ModelDetailTitle
                modelName={modelName}
                title={title}
                modelIdentifier={modelIdentifier}
              />
              <ModelDetailCrud
                modelName={modelName}
                data={modelData}
                fieldsData={fieldsData}
                editable={editable}
                deletable={deletable}
              />
            </div>
            <ModelDetailFields
              modelName={modelName}
              fields={fields}
              data={modelData}
              fieldsData={fieldsData}
            />
          </ModelForm>
          {fields.map((field) => {
            const fieldData = fieldsData?.[field];
            const related = fieldsData?.[field]?.related;
            const displayLabelFn = fieldData?.displayLabelFn || humanizeText;
            const dataList = modelData?.[field];
            return related?.many ? (
              <details key={`${PACKAGE_ABBR}-detail-details-${field}`} open>
                <summary>
                  <h4>{displayLabelFn(field)}</h4>
                </summary>
                {dataList?.length > 0 ? (
                  <ModelDetailTable
                    parentId={modelData.id}
                    parentModelName={modelName}
                    parentField={field}
                    modelName={related.modelName}
                    fields={related.fields}
                    dataList={dataList}
                    fieldsData={related.fieldsData}
                    editable={editable}
                    deletable={deletable}
                  />
                ) : (
                  "N/A"
                )}
              </details>
            ) : null;
          })}
        </>
      ) : (
        <h4>{modelName} does not exist.</h4>
      )}
    </div>
  );
};

export default memo(ModelDetail) as FC<ModelDetailProps>;
