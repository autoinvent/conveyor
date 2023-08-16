import { FC, memo, useMemo, useContext, Fragment } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { Defaults } from "../../enums";
import { useGQLQuery, GQLQueryAction } from "../../hooks/useGQLQuery";
import { PACKAGE_ABBR } from "../../package";
import { BaseProps, FieldData } from "../../types";
import {
  getGQLAction,
  getGQLDocument,
  getAvailableKeys,
} from "../../utils/gqlRequest";
import { humanizeText } from "../../utils/common";
import ModelForm from "../ModelForm/ModelForm";
import ModelFormField from "../ModelForm/ModelFormField";
import ModelNav from "../ModelNav";

import ModelDetailCrud from "./ModelDetailCrud";
import ModelDetailTable from "./ModelDetailTable";

interface ModelDetailProps extends BaseProps {
  modelName: string;
  modelId: string;
  fields: string[];
  title?: JSX.Element | string;
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
}

const ModelDetail = ({
  id,
  className,
  modelName,
  modelId,
  fields,
  title,
  fieldsData,
  editable = true,
  deletable = true,
}: ModelDetailProps) => {
  const { primaryKey, secondaryKeys } = useContext(ConveyorContext);
  const keyFallbacks = [primaryKey].concat(secondaryKeys ?? []);
  const availableKeys = getAvailableKeys(fields, keyFallbacks);
  const actionType = GQLQueryAction.MODEL_ITEM;
  const action = getGQLAction(actionType, modelName);
  const document = getGQLDocument(
    actionType,
    modelName,
    primaryKey,
    fields,
    fieldsData
  );
  const { data, error } = useGQLQuery({
    action,
    document,
    variables: { id: modelId },
  });

  const modelData = useMemo(
    () => data?.[action],
    [JSON.stringify(data?.[action])]
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
  const loading = Object.values({ ...data, ...error }).length === 0;
  return (
    <Container id={id} className={className}>
      {loading ? (
        "Loading..."
      ) : modelData ? (
        <>
          <ModelForm formMethods={formMethods}>
            <div className={`${PACKAGE_ABBR}-model-title`}>
              <h2>
                {title ?? (
                  <>
                    <ModelNav modelName={modelName}>
                      <a href="#">{humanizeText(modelName)}</a>
                    </ModelNav>
                    :{modelData[availableKeys.at(1) ?? primaryKey]}
                  </>
                )}
              </h2>
              <ModelDetailCrud
                modelName={modelName}
                data={modelData}
                fields={fields}
                fieldsData={fieldsData}
                editable={editable}
                deletable={deletable}
              />
            </div>
            <dl>
              {fields.map((field) => {
                const displayLabelFn =
                  fieldsData?.[field]?.displayLabelFn || humanizeText;
                return !fieldsData?.[field]?.related?.many ? (
                  <Fragment key={`${PACKAGE_ABBR}-detail-field-${field}`}>
                    <dt>{displayLabelFn(field)}</dt>
                    <dd>
                      <ModelFormField
                        modelName={modelName}
                        fields={fields}
                        field={field}
                        data={modelData}
                        fieldData={fieldsData?.[field]}
                      />
                    </dd>
                  </Fragment>
                ) : null;
              })}
            </dl>
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
                {dataList?.length > 0 && fieldsData ? (
                  <ModelDetailTable
                    parentId={modelData[primaryKey]}
                    parentModelName={modelName}
                    parentField={field}
                    parentFieldsData={fieldsData}
                    parentData={modelData}
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
    </Container>
  );
};

export default memo(ModelDetail) as FC<ModelDetailProps>;
