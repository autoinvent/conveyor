import { useContext, ReactNode } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";

interface LinkProps {
  modelName?: string;
  modelId?: string;
  children: ReactNode;
}

const Link = ({ modelName, modelId, children }: LinkProps) => {
  const { navigate } = useContext(ConveyorContext);
  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        navigate({ modelName, id: modelId });
      }}
    >
      {children}
    </a>
  );
};

export default Link;
