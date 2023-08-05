import { useState, useCallback, useEffect, memo, FC } from "react";

import AlertsProvider from "../../contexts/AlertsContext";
import {
  ConveyorContext,
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from "../../contexts/ConveyorContext";
import TableViewsProvider from "../../contexts/TableViewsContext";
import Alerts from "../Alerts";
import { ErrorMessage } from "../../enums";
import { Alert } from "../../reducers/alertsReducer";
import { Model } from "../../types";
import { extractModelsFromIntrospection } from "../../utils/admin";
import { parseResponseError } from "../../utils/common";
import ModelCreate from "../ModelCreate/ModelCreate";
import ModelDetail from "../ModelDetail/ModelDetail";
import ModelIndex from "../ModelIndex/ModelIndex";

import ConveyorAdminHome from "./ConveyorAdminHome";
import ConveyorAdminNavbar from "./ConveyorAdminNavbar";

export enum Page {
  CREATE = "Create",
  DETAIL = "Detail",
  HOME = "Home",
  INDEX = "Index",
}

const IntrospectionDocument = `
{
  __type(name: "Query") {
      name     
      fields {
        name
        type {
          name
          kind
          fields {
            name
            type {
              name kind
              ofType { 
                name kind 
                ofType { 
                  kind name
                  ofType { name kind
                  	ofType {
                      kind name
                    }
                  }
                } 
              }
            }
          }
        }
      }
  }
}
`;

interface ConveyorAdminProps {
  gqlIntrospectionFetcher: (params: { document: string }) => Promise<any>;
  useGQLQueryResponse: UseGQLQueryResponse;
  useGQLMutationRequest: UseGQLMutationRequest;
  keyFallbacks?: string[]
}

interface NavigateParams {
  modelName?: string;
  id?: string;
}

const ConveyorAdmin = ({
  gqlIntrospectionFetcher,
  useGQLQueryResponse,
  useGQLMutationRequest,
  keyFallbacks = ['id']
}: ConveyorAdminProps) => {
  const [currentPage, setCurrentPage] = useState(Page.HOME);
  const [models, setModels] = useState<Record<string, Model> | null>({});
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [modelName, setModelName] = useState("");
  const [id, setId] = useState("");
  const fetcher = useCallback(gqlIntrospectionFetcher, []); // NOT A DYNAMIC FETCHER
  useEffect(() => {
    fetcher({ document: IntrospectionDocument })
      .then((response) => {
        const models = extractModelsFromIntrospection(response, keyFallbacks);
        setModels(models);
        console.log(models)
      })
      .catch((error: Error) => {
        const errorMessages = parseResponseError(error).map(
          (errorMessage: string) => ({
            type: "danger",
            message: errorMessage,
          })
        );
        setModels(null);
        setAlerts(errorMessages);
      });
  }, [fetcher]);

  const navigate = useCallback(
    (params: NavigateParams) => {
      setModelName(params?.modelName ?? "");
      setId(params.id ?? "");
      if (params.id === Page.CREATE) {
        setCurrentPage(Page.CREATE);
      } else if (!params.id && params.modelName) {
        setCurrentPage(Page.INDEX);
      } else if (params.modelName && params.id) {
        setCurrentPage(Page.DETAIL);
      } else {
        setCurrentPage(Page.HOME);
      }
    },
    [setCurrentPage]
  );

  let page;
  const fields = Object.keys(models?.[modelName] ?? {});
  const fieldsData = models?.[modelName] ?? {};
  switch (currentPage) {
    case Page.HOME: {
      page = <ConveyorAdminHome modelNames={models && Object.keys(models)} />;
      break;
    }
    case Page.INDEX: {
      page = (
        <ModelIndex
          modelName={modelName}
          fields={fields.filter((field) => !fieldsData?.[field]?.related)}
          fieldsData={fieldsData}
        />
      );
      break;
    }
    case Page.DETAIL: {
      page = (
        <ModelDetail
          modelId={id}
          modelName={modelName}
          fields={fields}
          fieldsData={fieldsData}
        />
      );
      break;
    }
    case Page.CREATE: {
      page = (
        <ModelCreate
          modelName={modelName}
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
    <ConveyorContext.Provider
      value={{ navigate, useGQLQueryResponse, useGQLMutationRequest }}
    >
      <TableViewsProvider>
        <AlertsProvider alerts={alerts}>
          <ConveyorAdminNavbar modelNames={models && Object.keys(models)} />
          <Alerts />
          {page}
        </AlertsProvider>
      </TableViewsProvider>
    </ConveyorContext.Provider>
  );
};

export default memo(ConveyorAdmin) as FC<ConveyorAdminProps>;
