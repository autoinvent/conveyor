import { useContext, ReactNode } from "react";

import { ConveyorContext } from "../contexts/ConveyorContext";

interface ModelNavProps {
  modelName?: string;
  modelId?: string;
  children: ReactNode;
}

const ModelNav = ({ modelName, modelId, children }: ModelNavProps) => {
  const { navigate } = useContext(ConveyorContext);
  return (
    <span onClick={() => navigate({ modelName, id: modelId })}>{children}</span>
  );
};

export default ModelNav;
