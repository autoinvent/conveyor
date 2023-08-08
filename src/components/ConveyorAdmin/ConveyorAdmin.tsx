import { useState, useCallback, memo, FC } from "react";

import ConveyorProvider, {
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from "../../contexts/ConveyorContext";
import { Page } from "../../enums";

import ConveyorAdminContent from "./ConveyorAdminContent";

interface ConveyorAdminProps {
  useGQLQueryResponse: UseGQLQueryResponse;
  useGQLMutationRequest: UseGQLMutationRequest;
  primaryKey: string;
  secondaryKeys?: string[];
}

interface NavigateParams {
  modelName?: string;
  id?: string;
}

const ConveyorAdmin = ({
  useGQLQueryResponse,
  useGQLMutationRequest,
  primaryKey,
  secondaryKeys,
}: ConveyorAdminProps) => {
  const [currentPage, setCurrentPage] = useState(Page.HOME);
  const [currentModelName, setCurrentModelName] = useState("");
  const [currentId, setCurrentId] = useState("");

  const navigate = useCallback(
    (params: NavigateParams) => {
      setCurrentModelName(params?.modelName ?? "");
      setCurrentId(params.id ?? "");
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
    [setCurrentPage, setCurrentModelName, setCurrentId]
  );

  return (
    <ConveyorProvider
      useGQLQueryResponse={useGQLQueryResponse}
      useGQLMutationRequest={useGQLMutationRequest}
      navigate={navigate}
      primaryKey={primaryKey}
      secondaryKeys={secondaryKeys}
    >
      <ConveyorAdminContent
        currentPage={currentPage}
        currentModelName={currentModelName}
        currentId={currentId}
      />
    </ConveyorProvider>
  );
};

export default memo(ConveyorAdmin) as FC<ConveyorAdminProps>;
