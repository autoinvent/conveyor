import { useContext, useEffect, useState } from "react";

import { AlertsDispatchContext } from "../contexts/AlertsContext";
import { ConveyorContext, GQLRequestParams } from "../contexts/ConveyorContext";
import { AlertsAction } from "../reducers/alertsReducer";
import { parseResponseError } from "../utils/common";

export enum GQLQueryAction {
  MODEL_ITEM = "item",
  MODEL_LIST = "list",
}

export interface UseGQLQueryProps extends GQLRequestParams {
  onSuccess?: (response?: any) => void;
  onError?: (error?: Error) => void;
}

const NO_RESPONSE = "{}";
const useGQLQuery = ({
  action,
  document,
  variables,
  onSuccess,
  onError,
}: UseGQLQueryProps) => {
  const dispatch = useContext(AlertsDispatchContext);
  const { useGQLQueryResponse } = useContext(ConveyorContext);
  const gqlResponse = useGQLQueryResponse({ action, document, variables });
  const [validResponseJson, setValidResponseJson] = useState(NO_RESPONSE);
  const [errorResponseJson, setErrorResponseJson] = useState(NO_RESPONSE);

  gqlResponse
    .then((response) => {
      const newValidResponse = JSON.stringify(response) ?? NO_RESPONSE;
      if (newValidResponse !== validResponseJson) {
        setValidResponseJson(newValidResponse);
        setErrorResponseJson(NO_RESPONSE);
      }
    })
    .catch((error) => {
      const newError = parseResponseError(error);
      const newErrorResponse = JSON.stringify(newError) ?? NO_RESPONSE;
      if (newErrorResponse !== errorResponseJson) {
        setErrorResponseJson(newErrorResponse);
        setValidResponseJson(NO_RESPONSE);
      }
    });

  useEffect(() => {
    // Handle Success Response
    if (validResponseJson !== NO_RESPONSE) {
      const validResponse = JSON.parse(validResponseJson);
      onSuccess?.(validResponse);
    }
    // Handle Error Response
    else if (errorResponseJson != NO_RESPONSE) {
      const errorResponse = JSON.parse(errorResponseJson);
      if (onError) {
        onError(errorResponse);
      } else {
        errorResponse?.forEach((errorMessage: string) => {
          dispatch({
            type: AlertsAction.ADD_ALERT,
            payload: {
              type: "danger",
              message: errorMessage,
            },
          });
        });
      }
    }
  }, [validResponseJson, errorResponseJson]);

  return {
    data: JSON.parse(validResponseJson),
    error: JSON.parse(errorResponseJson),
  };
};

export default useGQLQuery;
