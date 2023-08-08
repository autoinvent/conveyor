import { useContext } from "react";

import { AlertsDispatchContext } from "../contexts/AlertsContext";
import { ConveyorContext, GQLRequestParams } from "../contexts/ConveyorContext";
import { SuccessMessage } from "../enums";
import {
  AlertsAction,
  DEFAULT_SUCCESS_EXPIRE,
} from "../reducers/alertsReducer";
import { parseResponseError } from "../utils/common";

export enum GQLMutationAction {
  MODEL_UPDATE = "update",
  MODEL_CREATE = "create",
  MODEL_DELETE = "delete",
}

interface UseGQLMutationProps extends GQLRequestParams {
  modelName?: string;
  onSuccess?: (response?: any) => void;
  onError?: (error?: Error) => void;
}

export const useGQLMutation = ({
  action,
  document,
  variables,
  skip,
  modelName = "Model",
  onSuccess,
  onError,
}: UseGQLMutationProps) => {
  const dispatch = useContext(AlertsDispatchContext);
  const { useGQLMutationRequest } = useContext(ConveyorContext);
  const gqlRequest = useGQLMutationRequest({
    action,
    document,
    variables,
    skip,
  });

  return (options: { variables: Record<string, any> }) =>
    gqlRequest({ variables: options.variables ?? variables })
      .then((response) => {
        if (onSuccess) {
          onSuccess();
        } else {
          if (action?.endsWith(GQLMutationAction.MODEL_UPDATE)) {
            dispatch({
              type: AlertsAction.ADD_ALERT,
              payload: {
                type: "success",
                message: `${modelName} ${SuccessMessage.MODEL_UPDATE}`,
                expires: Date.now() + DEFAULT_SUCCESS_EXPIRE,
              },
            });
          } else if (action?.endsWith(GQLMutationAction.MODEL_CREATE)) {
            dispatch({
              type: AlertsAction.ADD_ALERT,
              payload: {
                type: "success",
                message: `${modelName} ${SuccessMessage.MODEL_CREATE}`,
                expires: Date.now() + DEFAULT_SUCCESS_EXPIRE,
              },
            });
          } else if (action?.endsWith(GQLMutationAction.MODEL_DELETE)) {
            dispatch({
              type: AlertsAction.ADD_ALERT,
              payload: {
                type: "success",
                message: `${modelName} ${SuccessMessage.MODEL_DELETE}`,
                expires: Date.now() + DEFAULT_SUCCESS_EXPIRE,
              },
            });
          }
        }

        return response;
      })
      .catch((error) => {
        if (onError) {
          onError();
        } else {
          const errorMessages = parseResponseError(error);
          errorMessages?.forEach((errorMessage: string) => {
            dispatch({
              type: AlertsAction.ADD_ALERT,
              payload: {
                type: "danger",
                message: errorMessage,
              },
            });
          });
        }

        throw error;
      });
};
