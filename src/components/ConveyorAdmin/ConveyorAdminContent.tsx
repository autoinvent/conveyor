import { useState, useCallback, useEffect, memo, FC, useContext } from "react";

import AlertsProvider from "../../contexts/AlertsContext";
import ConveyorProvider, {
  ConveyorContext,
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from "../../contexts/ConveyorContext";
import useGQLQuery, { GQLQueryAction } from "../../hooks/useGQLQuery";
import TableViewsProvider from "../../contexts/TableViewsContext";
import Alerts from "../Alerts";
import { ErrorMessage, Page } from "../../enums";
import { Alert } from "../../reducers/alertsReducer";
import { Model } from "../../types";
import { extractModelsFromIntrospection } from "../../utils/admin";
import { parseResponseError } from "../../utils/common";
import ModelCreate from "../ModelCreate/ModelCreate";
import ModelDetail from "../ModelDetail/ModelDetail";
import ModelIndex from "../ModelIndex/ModelIndex";

import ConveyorAdminHome from "./ConveyorAdminHome";
import ConveyorAdminNavbar from "./ConveyorAdminNavbar";
import { LoadingContext } from "../../contexts/commons/LoadingContext";
import Loading from "../commons/Loading";

const IntrospectionDocument = `
{
  query:__type(name:"Query") {
    fields {
      name
      type {
        name
        fields { 
          name 
          type { name kind ofType { name kind ofType { name kind ofType { name kind ofType { name kind } } } } } 
        }
      }
    }
  }
  
    mutation:__type(name:"Mutation") {
    fields {
      name
      type { ofType { name } }
      args { 
        name
        type { name kind ofType { name kind ofType { name kind ofType { name kind ofType { name kind } } } } }
      }
    }
  }
}
`;

interface ConveyorAdminContentProps {
  currentPage: Page;
  currentModelName: string;
  currentId: string;
}

const ConveyorAdminContent = ({
  currentPage,
  currentModelName,
  currentId,
}: ConveyorAdminContentProps) => {
  const [models, setModels] = useState<Record<string, Model> | null>(null);
  const [loading, setLoading] = useState(false);
  const { data, error } = useGQLQuery({ document: IntrospectionDocument });
  useEffect(() => {
    if (Object.values({ ...data, ...error }).length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
      if (Object.keys(data).length > 0) {
        const models = extractModelsFromIntrospection(data);
        setModels(models);
      } else {
        setModels(null);
      }
    }
  }, [JSON.stringify(data), JSON.stringify(error)]);

  console.log(models);
  let page = null;
  const modelNames = models ? Object.keys(models) : [];
  const fieldsData = models?.[currentModelName]?.fields ?? {};
  switch (currentPage) {
    case Page.HOME: {
      page = <ConveyorAdminHome modelNames={modelNames} />;
      break;
    }
    case Page.INDEX: {
      const fields = Object.keys(models?.[currentModelName]?.updateArgs ?? {});
      const filteredFields = fields.filter(
        (field) => !models?.[currentModelName]?.fields?.[field]?.related
      );
      const updateFieldsData = { ...fieldsData };
      filteredFields.forEach((field) => {
        updateFieldsData[field].type =
          models?.[currentModelName]?.updateArgs?.[field];
        if (updateFieldsData[field].type?.endsWith("!")) {
          updateFieldsData[field].required = true;
        }
      });
      console.log("index");
      console.log(filteredFields, updateFieldsData);
      page = (
        <ModelIndex
          modelName={currentModelName}
          fields={filteredFields}
          fieldsData={updateFieldsData}
        />
      );
      break;
    }
    // case Page.DETAIL: {
    //   page = (
    //     <ModelDetail
    //       modelId={id}
    //       modelName={modelName}
    //       fields={fields}
    //       fieldsData={fieldsData}
    //     />
    //   );
    //   break;
    // }
    case Page.CREATE: {
      const fields = Object.keys(models?.[currentModelName]?.createArgs ?? {});
      const createFieldsData = { ...fieldsData };
      fields.forEach((field) => {
        createFieldsData[field].type =
          models?.[currentModelName]?.createArgs?.[field];
        if (createFieldsData[field].type?.endsWith("!")) {
          createFieldsData[field].required = true;
        }
      });
      page = (
        <ModelCreate
          modelName={currentModelName}
          fields={fields}
          fieldsData={fieldsData}
        />
      );
      break;
    }
    default: {
      throw new Error(ErrorMessage.INV_ADMIN_PAGE);
    }
  }

  return (
    <>
      <ConveyorAdminNavbar modelNames={modelNames} />
      <Alerts />
      {loading ? <Loading /> : page}
    </>
  );
};

export default ConveyorAdminContent;
